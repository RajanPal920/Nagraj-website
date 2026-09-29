import os
import csv
import json
import sqlite3
import hashlib
import logging
from urllib.parse import urlparse
from collections import Counter
from scrapy.pipelines.images import ImagesPipeline
from scrapy.pipelines.files import FilesPipeline
from scrapy import Request
from itemadapter import ItemAdapter
from datetime import datetime

logger = logging.getLogger(__name__)


class ImageDownloadPipeline(ImagesPipeline):
    """Download product images to output/images/"""

    def get_media_requests(self, item, info):
        if isinstance(item, dict) and "images" in item:
            for img in item["images"]:
                if img.get("url"):
                    yield Request(img["url"], meta={"item": item, "img": img})

    def file_path(self, request, response=None, info=None, *, item=None):
        url = request.url
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)

        if not filename or "." not in filename:
            filename = "image.jpg"

        product_slug = "unknown"
        item_data = request.meta.get("item", {})
        if "slug" in item_data:
            product_slug = item_data["slug"]
        elif "url" in item_data:
            product_slug = os.path.basename(urlparse(item_data["url"]).path.strip("/"))

        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        name, ext = os.path.splitext(filename)
        if not ext:
            ext = ".jpg"

        return f"images/{product_slug}/{name}_{url_hash}{ext}"

    def item_completed(self, results, item, info):
        if isinstance(item, dict) and "images" in item:
            image_paths = [x["path"] for ok, x in results if ok]
            for i, img in enumerate(item["images"]):
                if i < len(image_paths):
                    img["local_path"] = image_paths[i]
                    img["checksum"] = results[i][1].get("checksum", "")
        return item


class PdfDownloadPipeline(FilesPipeline):
    """Download PDF attachments to output/pdfs/"""

    def get_media_requests(self, item, info):
        if isinstance(item, dict) and "attachments" in item:
            for att in item["attachments"]:
                if att.get("url"):
                    yield Request(att["url"], meta={"item": item, "att": att})

    def file_path(self, request, response=None, info=None, *, item=None):
        url = request.url
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)

        if not filename or "." not in filename:
            filename = "document.pdf"

        product_slug = "unknown"
        item_data = request.meta.get("item", {})
        if "slug" in item_data:
            product_slug = item_data["slug"]
        elif "url" in item_data:
            product_slug = os.path.basename(urlparse(item_data["url"]).path.strip("/"))

        return f"pdfs/{product_slug}/{filename}"

    def item_completed(self, results, item, info):
        if isinstance(item, dict) and "attachments" in item:
            file_paths = [x["path"] for ok, x in results if ok]
            for i, att in enumerate(item["attachments"]):
                if i < len(file_paths):
                    att["local_path"] = file_paths[i]
        return item


class JsonExportPipeline:
    """Export all scraped items to products.json + summary.json"""

    def __init__(self):
        self.items = []

    def process_item(self, item):
        adapter = ItemAdapter(item)
        self.items.append(adapter.asdict())
        return item

    def close_spider(self, spider=None):
        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)

        # --- products.json ---
        output_file = os.path.join(output_dir, "products.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(self.items, f, indent=2, ensure_ascii=False)
        logger.info(f"Exported {len(self.items)} products to {output_file}")

        # --- summary.json ---
        summary = {
            "total_products": len(self.items),
            "scraped_at": datetime.utcnow().isoformat(),
            "products": [
                {
                    "url": item.get("url"),
                    "title": item.get("title"),
                    "slug": item.get("slug"),
                    "product_type": item.get("product_type"),
                    "category": item.get("category"),
                    "images_count": len(item.get("images", [])),
                    "attachments_count": len(item.get("attachments", [])),
                    "has_chemical_composition": bool(item.get("chemical_composition")),
                    "has_mechanical_properties": bool(item.get("mechanical_properties")),
                }
                for item in self.items
            ],
        }
        summary_file = os.path.join(output_dir, "summary.json")
        with open(summary_file, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        logger.info(f"Exported summary to {summary_file}")

        # --- Category count log (as specified in Executive Summary) ---
        category_counts = Counter(item.get("category", "Unknown") for item in self.items)
        type_counts = Counter(item.get("product_type", "Unknown") for item in self.items)
        total_images = sum(len(item.get("images", [])) for item in self.items)
        total_attachments = sum(len(item.get("attachments", [])) for item in self.items)

        logger.info("=" * 60)
        logger.info(f"Spider closed: {len(self.items)} products scraped.")
        logger.info(f"Images found: {total_images}. Attachments found: {total_attachments}.")
        logger.info("Counts by category:")
        for cat, count in sorted(category_counts.items(), key=lambda x: -x[1]):
            logger.info(f"  {cat}: {count}")
        logger.info("Counts by product type:")
        for ptype, count in sorted(type_counts.items(), key=lambda x: -x[1]):
            logger.info(f"  {ptype}: {count}")
        logger.info("=" * 60)


class CsvExportPipeline:
    """Export all scraped items to a flat CSV file (products.csv)"""

    # Column order as per Executive Summary schema
    FIELDS = [
        "url", "slug", "title", "product_type", "category",
        "breadcrumbs", "meta_title", "meta_description",
        "publish_date", "modified_date",
        "description_text", "packing",
        "material_grades", "equivalent_grades", "specifications",
        "applications", "features", "tests",
        "chemical_composition", "mechanical_properties",
        "images", "attachments",
        "scraped_at", "status",
    ]

    def __init__(self):
        self.items = []

    def process_item(self, item):
        adapter = ItemAdapter(item)
        self.items.append(adapter.asdict())
        return item

    def close_spider(self, spider=None):
        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, "products.csv")

        with open(output_file, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=self.FIELDS, extrasaction="ignore")
            writer.writeheader()
            for item in self.items:
                row = {}
                for field in self.FIELDS:
                    val = item.get(field, "")
                    # Serialize lists/dicts as JSON strings for CSV compatibility
                    if isinstance(val, (list, dict)):
                        val = json.dumps(val, ensure_ascii=False)
                    row[field] = val
                writer.writerow(row)

        logger.info(f"Exported {len(self.items)} products to {output_file}")


class SQLitePipeline:
    """Export all scraped items to a SQLite database (products.db)"""

    def __init__(self):
        self.items = []

    def process_item(self, item):
        adapter = ItemAdapter(item)
        self.items.append(adapter.asdict())
        return item

    def close_spider(self, spider=None):
        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)
        db_path = os.path.join(output_dir, "products.db")

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT UNIQUE,
                slug TEXT,
                title TEXT,
                product_type TEXT,
                category TEXT,
                breadcrumbs TEXT,
                meta_title TEXT,
                meta_description TEXT,
                publish_date TEXT,
                modified_date TEXT,
                description_text TEXT,
                packing TEXT,
                material_grades TEXT,
                equivalent_grades TEXT,
                specifications TEXT,
                applications TEXT,
                features TEXT,
                tests TEXT,
                chemical_composition TEXT,
                mechanical_properties TEXT,
                images TEXT,
                attachments TEXT,
                scraped_at TEXT,
                status TEXT
            )
        """)

        inserted = 0
        updated = 0
        for item in self.items:
            row = (
                item.get("url", ""),
                item.get("slug", ""),
                item.get("title", ""),
                item.get("product_type", ""),
                item.get("category", ""),
                item.get("breadcrumbs", ""),
                item.get("meta_title", ""),
                item.get("meta_description", ""),
                item.get("publish_date", ""),
                item.get("modified_date", ""),
                item.get("description_text", ""),
                item.get("packing", ""),
                json.dumps(item.get("material_grades", []), ensure_ascii=False),
                json.dumps(item.get("equivalent_grades", []), ensure_ascii=False),
                json.dumps(item.get("specifications", []), ensure_ascii=False),
                json.dumps(item.get("applications", []), ensure_ascii=False),
                json.dumps(item.get("features", []), ensure_ascii=False),
                json.dumps(item.get("tests", []), ensure_ascii=False),
                json.dumps(item.get("chemical_composition", []), ensure_ascii=False),
                json.dumps(item.get("mechanical_properties", []), ensure_ascii=False),
                json.dumps(item.get("images", []), ensure_ascii=False),
                json.dumps(item.get("attachments", []), ensure_ascii=False),
                item.get("scraped_at", ""),
                item.get("status", ""),
            )
            try:
                cursor.execute("""
                    INSERT INTO products (
                        url, slug, title, product_type, category,
                        breadcrumbs, meta_title, meta_description,
                        publish_date, modified_date,
                        description_text, packing,
                        material_grades, equivalent_grades, specifications,
                        applications, features, tests,
                        chemical_composition, mechanical_properties,
                        images, attachments,
                        scraped_at, status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, row)
                inserted += 1
            except sqlite3.IntegrityError:
                # URL already exists — update instead
                cursor.execute("""
                    UPDATE products SET
                        slug=?, title=?, product_type=?, category=?,
                        breadcrumbs=?, meta_title=?, meta_description=?,
                        publish_date=?, modified_date=?,
                        description_text=?, packing=?,
                        material_grades=?, equivalent_grades=?, specifications=?,
                        applications=?, features=?, tests=?,
                        chemical_composition=?, mechanical_properties=?,
                        images=?, attachments=?,
                        scraped_at=?, status=?
                    WHERE url=?
                """, row[1:] + (row[0],))
                updated += 1

        conn.commit()
        conn.close()

        logger.info(
            f"SQLite: {inserted} inserted, {updated} updated -> {db_path}"
        )


class BrandReplacementPipeline:
    """Replaces mentions of Textron with Bhumi."""

    def process_item(self, item, spider):
        replacements = [
            ("Textron Steel and Alloys", "Bhumi Steel"),
            ("Textron Steel", "Bhumi Steel"),
            ("Textron", "Bhumi"),
            ("textronsteelalloys.com", "bhumisteel.com")
        ]

        def replace_text(text):
            if not isinstance(text, str):
                return text
            for old, new in replacements:
                text = text.replace(old, new)
                # handle lowercase/uppercase appropriately
                text = text.replace(old.lower(), new.lower())
                text = text.replace(old.upper(), new.upper())
            return text

        if "title" in item:
            item["title"] = replace_text(item["title"])
        if "description_text" in item:
            item["description_text"] = replace_text(item["description_text"])
        if "meta_title" in item:
            item["meta_title"] = replace_text(item["meta_title"])
        if "meta_description" in item:
            item["meta_description"] = replace_text(item["meta_description"])
        
        if "images" in item:
            for img in item["images"]:
                if "alt" in img:
                    img["alt"] = replace_text(img["alt"])
                    
        return item