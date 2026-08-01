import scrapy
from scrapy.spiders import SitemapSpider
from scrapy.selector import Selector
from urllib.parse import urlparse
import re
from datetime import datetime
from textron_scraper.items import (
    Product,
    ChemicalCompositionEntry,
    MechanicalPropertyEntry,
    ProductImage,
    ProductAttachment,
)
import json


class TextronProductsSpider(SitemapSpider):
    name = "textron_products"
    allowed_domains = ["textronsteelalloys.com", "www.textronsteelalloys.com"]

    sitemap_urls = [
        "https://www.textronsteelalloys.com/product-sitemap.xml",
    ]

    # Catch-all: process every URL from the product sitemap
    sitemap_rules = [(r"", "parse_product")]

    custom_settings = {
        "DOWNLOAD_DELAY": 2,
        "RANDOMIZE_DOWNLOAD_DELAY": 0.5,
        "CONCURRENT_REQUESTS_PER_DOMAIN": 1,
        "AUTOTHROTTLE_ENABLED": True,
        "AUTOTHROTTLE_START_DELAY": 2,
        "AUTOTHROTTLE_MAX_DELAY": 30,
        "AUTOTHROTTLE_TARGET_CONCURRENCY": 1.0,
        "HTTPCACHE_ENABLED": True,
        "HTTPCACHE_EXPIRATION_SECS": 86400,
    }
    def start_requests(self):
        """Initialize WP API category mapping before crawling"""
        self.wp_cat_map = {}
        self.wp_products = {}
        
        try:
            import requests, html
            headers = {'User-Agent': 'Mozilla/5.0'}
            base = 'https://www.textronsteelalloys.com/wp-json/wp/v2'
            
            # 1. Fetch categories
            page = 1
            while True:
                r = requests.get(f'{base}/product_cat?per_page=100&page={page}', headers=headers, timeout=10)
                if not r.ok or not r.json(): break
                for c in r.json():
                    self.wp_cat_map[c['id']] = html.unescape(c['name'])
                page += 1
                
            # 2. Fetch products
            page = 1
            while True:
                r = requests.get(f'{base}/product?per_page=100&page={page}', headers=headers, timeout=10)
                if not r.ok or not r.json(): break
                for p in r.json():
                    self.wp_products[p['link'].rstrip('/')] = p.get('product_cat', [])
                page += 1
                
            self.logger.info(f"Loaded {len(self.wp_cat_map)} categories and {len(self.wp_products)} products from WP API")
        except Exception as e:
            self.logger.error(f"Failed to initialize WP API category mapping: {e}")

        # Continue with standard sitemap requests
        for request in super().start_requests():
            yield request

    def parse_product(self, response):
        """Parse individual product page"""
        # Check if this is a product page (has entry-content with product data)
        if not response.css(".entry-content"):
            self.logger.debug(f"Skipping non-product page: {response.url}")
            return

        product = Product()
        product["url"] = response.url
        product["title"] = self._extract_title(response)
        product["slug"] = self._extract_slug(response.url)
        product["description_text"] = self._extract_description(response)
        product["product_type"] = self._determine_product_type(product["title"], product["slug"])
        product["category"] = self._extract_category(response)
        product["breadcrumbs"] = self._extract_breadcrumbs(response)
        product["meta_title"] = self._extract_meta_title(response)
        product["meta_description"] = self._extract_meta_description(response)
        product["publish_date"] = self._extract_publish_date(response)
        product["modified_date"] = self._extract_modified_date(response)
        product["material_grades"] = self._extract_material_grades(response)
        product["equivalent_grades"] = self._extract_equivalent_grades(response)
        product["specifications"] = self._extract_specifications(response)
        product["applications"] = self._extract_applications(response)
        product["features"] = self._extract_features(response)
        product["tests"] = self._extract_tests(response)
        product["packing"] = self._extract_packing(response)
        product["chemical_composition"] = self._extract_chemical_composition(response)
        product["mechanical_properties"] = self._extract_mechanical_properties(response)
        product["images"] = self._extract_images(response)
        product["attachments"] = self._extract_attachments(response)
        product["scraped_at"] = datetime.utcnow().isoformat()
        product["status"] = "scraped"

        return product

    def _extract_breadcrumbs(self, response):
        """Extract breadcrumb trail as 'Home > Category > Product'"""
        crumbs = response.css(
            ".woocommerce-breadcrumb a::text, .breadcrumb a::text, nav.breadcrumb a::text"
        ).getall()
        # Also grab non-link text (current page)
        all_crumb_text = response.css(
            ".woocommerce-breadcrumb::text, .woocommerce-breadcrumb a::text"
        ).getall()
        cleaned = [c.strip() for c in all_crumb_text if c.strip() and c.strip() not in ["/", ">", "»"]]
        if cleaned:
            return " > ".join(cleaned)
        if crumbs:
            return " > ".join([c.strip() for c in crumbs if c.strip()])
        return ""

    def _extract_meta_title(self, response):
        """Extract <title> tag content"""
        return (response.xpath("//title/text()").get() or "").strip()

    def _extract_meta_description(self, response):
        """Extract meta description content"""
        return (
            response.xpath('//meta[@name="description"]/@content').get()
            or response.xpath('//meta[@property="og:description"]/@content').get()
            or ""
        ).strip()

    def _extract_publish_date(self, response):
        """Extract publish date from meta or article tags"""
        return (
            response.xpath('//meta[@property="article:published_time"]/@content').get()
            or response.xpath('//meta[@name="pubdate"]/@content').get()
            or response.css("time.entry-date::attr(datetime)").get()
            or ""
        )

    def _extract_modified_date(self, response):
        """Extract last modified date from meta tags"""
        return (
            response.xpath('//meta[@property="article:modified_time"]/@content').get()
            or response.xpath('//meta[@name="lastmod"]/@content').get()
            or ""
        )

    def _extract_title(self, response):
        """Extract product title"""
        title = (
            response.css("h1.product_title::text").get()
            or response.css("h1.entry-title::text").get()
            or response.css("h1::text").get()
            or response.css("title::text").get()
        )
        if title:
            return title.strip().replace(" - Textron", "").replace(" | Textron Steel", "").strip()
        return ""

    def _extract_slug(self, url):
        """Extract slug from URL"""
        parsed = urlparse(url)
        path = parsed.path.strip("/")
        return path.split("/")[-1] if path else ""

    def _extract_description(self, response):
        """Extract product description"""
        desc_parts = []

        def clean_text(t):
            # Remove control characters that break JSON, keep \n, \r, \t
            if not t: return t
            return re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', t)

        # Get description tab content
        desc_tab = response.css("#tab-description, .woocommerce-Tabs-panel--description, .entry-content .description")
        if desc_tab:
            elements = desc_tab.css("p, li, h2, h3, h4")
            for el in elements:
                text = el.xpath("string(.)").get()
                if text and text.strip():
                    desc_parts.append(clean_text(text).strip())

        # Fallback to first few paragraphs of entry-content
        if not desc_parts:
            entry = response.css(".entry-content")
            elements = entry.css("p")[:5]
            for el in elements:
                text = el.xpath("string(.)").get()
                if text and text.strip():
                    desc_parts.append(clean_text(text).strip())

        return "\n\n".join(desc_parts)

    def _extract_category(self, response):
        """Extract product category using WP API mapping or fallback."""
        url = response.url.rstrip('/')
        
        if hasattr(self, 'wp_products') and url in self.wp_products:
            cat_ids = self.wp_products[url]
            raw_cats = [self.wp_cat_map.get(cid, '') for cid in cat_ids if cid in self.wp_cat_map]
            if raw_cats:
                cats_lower = [c.lower() for c in raw_cats]
                # Priority ordered matching
                if any('stainless steel' in c for c in cats_lower): return 'Stainless Steel'
                if any('duplex' in c or 'super duplex' in c for c in cats_lower): return 'Duplex & Super Duplex'
                if any(c in ('inconel', 'monel', 'hastelloy', 'incoloy', 'nickel alloy', 'nickel alloy round bars', 'alloy 20') for c in cats_lower): return 'Nickel Alloy'
                if any('titanium' in c for c in cats_lower): return 'Titanium'
                if any('aluminium' in c or 'aluminum' in c for c in cats_lower): return 'Aluminium'
                if any('alloy steel' in c for c in cats_lower): return 'Alloy Steel'
                if any('carbon steel' in c for c in cats_lower): return 'Carbon Steel'
                if any('copper nickel' in c or 'cupro nickel' in c for c in cats_lower): return 'Cupro Nickel'
                if any('corten' in c for c in cats_lower): return 'Corten Steel'
                if any('abrasion resistant' in c or 'wear resistant' in c for c in cats_lower): return 'Abrasion Resistant'
                if any('high tensile' in c or 'quenched' in c or 'tempered' in c for c in cats_lower): return 'High Tensile Steel'
                if any('tool steel' in c or 'cold work' in c or 'hot work' in c or 'high speed steel' in c for c in cats_lower): return 'Tool Steel'
                if any('cobalt' in c for c in cats_lower): return 'Cobalt Alloy'
                if any('copper' in c or 'brass' in c or 'bronze' in c for c in cats_lower): return 'Copper & Brass'
                if any('tantalum' in c for c in cats_lower): return 'Tantalum'
                if any('boron' in c or 'manganese steel' in c for c in cats_lower): return 'Special Steel'
                if any('galvanized' in c for c in cats_lower): return 'Galvanized'
                if any('boiler' in c or 'chrome moly' in c or '16mo3' in c or 'a285' in c or 'a283' in c for c in cats_lower): return 'Pressure Vessel Steel'
                return raw_cats[0]
                
        return "Other"

    def _extract_material_grades(self, response):
        """Extract material grades from tables"""
        grades = []
        tables = response.css(".entry-content table")
        for table in tables:
            headers = [th.css("::text").get("").strip().lower() for th in table.css("th")]
            if not headers:
                first_row = table.css("tbody tr:first-child, tr:first-child")
                headers = [th.css("::text").get("").strip().lower() for th in first_row.css("th, td")]
            
            if any("grade" in h or "steel" in h or "material" in h for h in headers):
                rows = table.css("tbody tr") if table.css("tbody tr") else table.css("tr")
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if cells:
                        grades.extend([c for c in cells if c and len(c) < 50])
        return list(set(grades))[:20]

    def _extract_equivalent_grades(self, response):
        """Extract equivalent grades table"""
        equivalents = []
        tables = response.css(".entry-content table")
        for table in tables:
            prev_heading_texts = table.xpath("preceding-sibling::*[position() <= 3]//text()").getall()
            prev_text = " ".join(prev_heading_texts).lower()
            header_text = table.css("th::text, caption::text").get("").lower()
            
            if "equivalent" in header_text or "equivalent" in prev_text:
                rows = table.css("tbody tr") if table.css("tbody tr") else table.css("tr")
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if cells:
                        equivalents.append(" | ".join([c for c in cells if c]))
        return equivalents

    def _extract_specifications(self, response):
        """Extract specifications table"""
        specs = []
        tables = response.css(".entry-content table")
        for table in tables:
            prev_heading_texts = table.xpath("preceding-sibling::*[position() <= 3]//text()").getall()
            prev_text = " ".join(prev_heading_texts).lower()
            header_text = table.css("th::text, caption::text").get("").lower()
            
            table_text = " ".join(table.css("::text").getall()).lower()
            
            if "specification" in header_text or "standard" in header_text or "specification" in prev_text or "standard" in prev_text or ("property" in table_text and "details" in table_text):
                rows = table.css("tbody tr") if table.css("tbody tr") else table.css("tr")
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if cells:
                        specs.append(" | ".join([c for c in cells if c]))
        return specs

    def _extract_applications(self, response):
        """Extract applications/usage list"""
        apps = []
        for heading in response.css(".entry-content h3, .entry-content h4"):
            heading_text = heading.css("::text").get("").lower()
            if any(kw in heading_text for kw in ["usage", "application", "use"]):
                # Find the next ul after this heading using CSS
                next_ul = heading.xpath("following-sibling::ul[1]")
                if next_ul:
                    list_items = next_ul.css("li::text").getall()
                    apps.extend([li.strip() for li in list_items if li.strip()])
                break
        return apps

    def _extract_features(self, response):
        """Extract product features (checkmark lists)"""
        features = []
        # Checkmark lists
        check_items = response.css(".entry-content ul li i.fa-check").getall()
        if check_items:
            for li in response.css(".entry-content ul li:has(i.fa-check)"):
                text = li.css("::text").get("")
                if text.strip():
                    features.append(text.strip())

        # Also look for "Product Features" heading
        for heading in response.css(".entry-content h3, .entry-content h4"):
            heading_text = heading.css("::text").get("").lower()
            if "feature" in heading_text:
                next_ul = heading.xpath("following-sibling::ul[1]")
                if next_ul:
                    list_items = next_ul.css("li::text").getall()
                    features.extend([li.strip() for li in list_items if li.strip()])
                break

        return features

    def _extract_tests(self, response):
        """Extract tests carried out"""
        tests = []
        for heading in response.css(".entry-content h3, .entry-content h4"):
            heading_text = heading.css("::text").get("").lower()
            if "test" in heading_text:
                next_ul = heading.xpath("following-sibling::ul[1]")
                if next_ul:
                    list_items = next_ul.css("li::text").getall()
                    tests.extend([li.strip() for li in list_items if li.strip()])
                break
        return tests

    def _extract_packing(self, response):
        """Extract packing information"""
        packing = ""
        for heading in response.css(".entry-content h3, .entry-content h4"):
            heading_text = heading.css("::text").get("").lower()
            if "pack" in heading_text:
                next_p = heading.xpath("following-sibling::p[1]")
                if next_p:
                    packing = next_p.css("::text").get("").strip()
                break
        return packing

    def _extract_chemical_composition(self, response):
        """Extract chemical composition table"""
        compositions = []
        tables = response.css(".entry-content table")

        for table in tables:
            # Check table's own headers
            header_texts = []
            thead = table.css("thead")
            if thead:
                header_texts = [th.css("::text").get("").strip() for th in thead.css("th")]
            else:
                first_row = table.css("tbody tr:first-child")
                header_texts = [th.css("::text").get("").strip() for th in first_row.css("th, td")]
            
            header_text = " ".join(header_texts).lower()
            
            table_text = " ".join(table.css("::text").getall()).lower()
            words = set(table_text.split())
            
            # Check if any preceding text contains "chemical composition"
            prev_heading_texts = table.xpath("preceding-sibling::*[position() <= 3]//text()").getall()
            prev_text = " ".join(prev_heading_texts).lower()
            
            is_chem = False
            if "chemical" in prev_text and "composition" in prev_text:
                is_chem = True
            elif "chemical" in table_text and "composition" in table_text:
                is_chem = True
            
            # Additional heuristic: checking for elements in table words
            if {'c', 'si', 'mn', 'p', 's'}.intersection(words):
                # if it has at least 3 common elements, it's highly likely chemical comp
                matches = {'c', 'si', 'mn', 'p', 's', 'cr', 'mo', 'ni'}.intersection(words)
                if len(matches) >= 3:
                    is_chem = True
                
            if not is_chem:
                continue

            # Get column headers
            col_headers = []
            if thead:
                col_headers = [th.css("::text").get("").strip() for th in thead.css("th, td")]
            else:
                first_row = table.css("tbody tr:first-child")
                col_headers = [th.css("::text").get("").strip() for th in first_row.css("th, td")]

            # Parse data rows
            rows = table.css("tbody tr")
            if not thead and len(rows) > 0:
                rows = rows[1:]

            # If the table doesn't have a header row defining elements across columns, 
            # and is formatted as property: value per row
            if len(col_headers) == 2 and not any(el in col_headers for el in ["C", "Si", "Mn"]):
                # Treat first col as property, second as value
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if len(cells) >= 2:
                        composition = ChemicalCompositionEntry()
                        composition["element"] = cells[0]
                        composition["min_value"] = cells[1]
                        composition["max_value"] = ""
                        composition["unit"] = "%"
                        compositions.append(dict(composition))
            else:
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if not cells or not any(cells):
                        continue

                    entry = {}
                    for i, cell in enumerate(cells):
                        if i < len(col_headers):
                            entry[col_headers[i]] = cell
                        else:
                            entry[f"col_{i}"] = cell

                    composition = ChemicalCompositionEntry()
                    composition["element"] = entry.get("Grade", entry.get("Element", entry.get("col_0", "")))
                    
                    min_val = entry.get("Min.", entry.get("Min", entry.get("col_1", "")))
                    max_val = entry.get("Max.", entry.get("Max", entry.get("col_2", "")))
                    
                    if max_val and max_val != "-" and max_val != "–":
                        composition["min_value"] = f"{min_val} - {max_val}" if min_val and min_val not in ["-", "–"] else max_val
                    else:
                        composition["min_value"] = min_val

                    composition["max_value"] = ""
                    composition["unit"] = "%"
                    compositions.append(dict(composition))

        return compositions

    def _extract_mechanical_properties(self, response):
        """Extract mechanical properties table"""
        properties = []
        tables = response.css(".entry-content table")

        for table in tables:
            header_texts = []
            thead = table.css("thead")
            if thead:
                header_texts = [th.css("::text").get("").strip() for th in thead.css("th")]
            else:
                first_row = table.css("tbody tr:first-child")
                header_texts = [th.css("::text").get("").strip() for th in first_row.css("th, td")]

            header_text = " ".join(header_texts).lower()
            
            table_text = " ".join(table.css("::text").getall()).lower()
            
            # Check preceding heading
            prev_heading_texts = table.xpath("preceding-sibling::*[position() <= 3]//text()").getall()
            prev_text = " ".join(prev_heading_texts).lower()
            
            is_mech = False
            if "mechanical" in prev_text and "propert" in prev_text:
                is_mech = True
            elif "mechanical" in table_text and "propert" in table_text:
                is_mech = True
            
            # Additional heuristic: checking for properties in table
            mech_props = {"tensile", "yield", "elongation", "hardness", "impact"}
            if any(prop in table_text for prop in mech_props):
                is_mech = True
            
            if not is_mech:
                continue

            col_headers = []
            if thead:
                col_headers = [th.css("::text").get("").strip() for th in thead.css("th, td")]
            else:
                first_row = table.css("tbody tr:first-child")
                col_headers = [th.css("::text").get("").strip() for th in first_row.css("th, td")]

            rows = table.css("tbody tr")
            if not thead and len(rows) > 0:
                rows = rows[1:]

            if len(col_headers) == 2 and not any(p in " ".join(col_headers).lower() for p in mech_props):
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if len(cells) >= 2:
                        prop = MechanicalPropertyEntry()
                        prop["property_name"] = cells[0]
                        prop["value"] = cells[1]
                        prop["unit"] = ""
                        prop["condition"] = ""
                        properties.append(dict(prop))
            else:
                for row in rows:
                    cells = [td.css("::text").get("").strip() for td in row.css("td")]
                    if not cells or not any(cells):
                        continue

                    entry = {}
                    for i, cell in enumerate(cells):
                        if i < len(col_headers):
                            entry[col_headers[i]] = cell
                        else:
                            entry[f"col_{i}"] = cell

                    prop = MechanicalPropertyEntry()
                    prop["property_name"] = entry.get("Grade", entry.get("Property", entry.get("col_0", "")))
                    
                    min_val = entry.get("Min.", entry.get("Min", entry.get("col_1", "")))
                    max_val = entry.get("Max.", entry.get("Max", entry.get("col_2", "")))
                    
                    if max_val and max_val != "-" and max_val != "–":
                        prop["value"] = f"{min_val} - {max_val}" if min_val and min_val not in ["-", "–"] else max_val
                    else:
                        prop["value"] = min_val

                    prop["unit"] = ""
                    prop["condition"] = ""
                    properties.append(dict(prop))

        return properties

    def _strip_image_size_suffix(self, url):
        """Remove WordPress size suffix like -400x400 from image URLs to get full-size original."""
        return re.sub(r'-\d+x\d+(?=\.[a-zA-Z]{2,5}$)', '', url)

    def _extract_images(self, response):
        """Extract product images, preferring full-size originals."""
        images = []

        # Main product image (WooCommerce gallery)
        main_imgs = response.css(
            ".woocommerce-product-gallery__image a::attr(href), "
            ".wp-post-image::attr(src)"
        ).getall()
        for img_url in main_imgs:
            if img_url and "placeholder" not in img_url.lower():
                img = ProductImage()
                img["url"] = self._strip_image_size_suffix(response.urljoin(img_url))
                img["alt"] = self._extract_title(response)
                images.append(dict(img))

        # Gallery images
        gallery_imgs = response.css(
            ".woocommerce-product-gallery__image a::attr(href), "
            ".product-gallery img::attr(src)"
        ).getall()
        for img_url in gallery_imgs:
            if img_url and "placeholder" not in img_url.lower():
                img = ProductImage()
                img["url"] = self._strip_image_size_suffix(response.urljoin(img_url))
                img["alt"] = f"{self._extract_title(response)} - gallery"
                images.append(dict(img))

        # Images in description / entry-content
        desc_imgs = response.css(".entry-content img::attr(src)").getall()
        for img_url in desc_imgs:
            if img_url and "placeholder" not in img_url.lower() and "logo" not in img_url.lower():
                img = ProductImage()
                img["url"] = self._strip_image_size_suffix(response.urljoin(img_url))
                img["alt"] = "Product detail image"
                images.append(dict(img))

        # Deduplicate by URL (after size suffix removal)
        seen = set()
        unique_images = []
        for img in images:
            if img["url"] not in seen:
                seen.add(img["url"])
                unique_images.append(img)

        return unique_images[:20]

    def _extract_attachments(self, response):
        """Extract PDF attachments and other documents"""
        attachments = []

        # Links in entry content
        links = response.css(".entry-content a::attr(href)").getall()
        for href in links:
            if any(href.lower().endswith(ext) for ext in [".pdf", ".doc", ".docx", ".xls", ".xlsx"]):
                att = ProductAttachment()
                att["url"] = response.urljoin(href)
                att["title"] = "Document"
                att["file_type"] = href.split(".")[-1].lower()
                attachments.append(dict(att))

        # Specific download sections
        for link in response.css("a[href$='.pdf'], a[href$='.doc'], a[href$='.docx']"):
            href = link.css("::attr(href)").get()
            text = link.css("::text").get()
            if href:
                att = ProductAttachment()
                att["url"] = response.urljoin(href)
                att["title"] = text.strip() if text else "Document"
                att["file_type"] = href.split(".")[-1].lower()
                attachments.append(dict(att))

        return attachments

    def _determine_product_type(self, title, slug):
        """Determine product type from title/slug"""
        text = f"{title} {slug}".lower()

        types = {
            "Pipe & Tube": ["pipe", "tube", "seamless", "welded", "erw", "efw", "sa312", "a312", "a335", "a106"],
            "Flange": ["flange", "weld neck", "slip on", "socket weld", "blind", "lap joint", "threaded", "spectacle blind", "orifice", "long weld neck"],
            "Fitting": ["fitting", "elbow", "tee", "reducer", "cap", "stub end", "cross", "coupling", "union", "olet", "weldolet", "sockolet", "threadolet"],
            "Plate & Sheet": ["plate", "sheet", "coil", "a240", "sa240", "nm400", "nm500"],
            "Bar & Rod": ["bar", "rod", "round", "hex", "square", "flat", "bright", "black", "440c", "titanium grade 5", "aluminium alloy 6061", "2024 t351", "ams 5629", "ams 5659"],
            "Welding Wire": ["wire", "filler", "tig", "mig", "er410", "er321", "er2594", "er630", "ercu"],
            "Structural Profile": ["angle", "channel", "beam"],
            "Hollow Section": ["hollow", "structura", "shs", "rhs", "chs", "yst"],
            "Fastener": ["fastener", "bolt", "nut", "stud", "washer", "screw"],
            "Valve": ["valve", "gate", "globe", "check", "ball", "butterfly"],
            "Forging": ["forged", "forging", "a182", "a105", "f304", "f316"],
        }

        for ptype, keywords in types.items():
            if any(kw in text for kw in keywords):
                return ptype

        return "Other"