import requests
from scrapy.selector import Selector

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://www.textronsteelalloys.com/astm-a182-a240/', headers=headers)

sel = Selector(text=r.text)

# Find tables in entry-content
tables = sel.css(".entry-content table.table-bordered")
print(f"Total tables found: {len(tables)}")

for i, table in enumerate(tables):
    print(f"\n=== Table {i} ===")
    # Check preceding headings
    prev_headings = table.xpath("preceding-sibling::*[self::h3 or self::h4 or self::strong][1]::text").getall()
    print(f"Prev headings: {prev_headings}")
    
    # Check table's own headers
    thead = table.css("thead")
    if thead:
        header_texts = [th.css("::text").get("").strip() for th in thead.css("th")]
        print(f"thead headers: {header_texts}")
    else:
        first_row = table.css("tbody tr:first-child")
        header_texts = [th.css("::text").get("").strip() for th in first_row.css("th")]
        print(f"first row th headers: {header_texts}")
    
    # Check if it's chem or mech
    header_text = " ".join(header_texts).lower()
    prev_text = " ".join(prev_headings).lower()
    print(f"header_text: {header_text}")
    print(f"prev_text: {prev_text}")
    
    is_chem = ("chemical" in prev_text and "composition" in prev_text) or ("chemical" in header_text or "composition" in header_text)
    is_mech = ("mechanical" in prev_text and "propert" in prev_text) or ("mechanical" in header_text and "propert" in header_text)
    print(f"is_chem: {is_chem}, is_mech: {is_mech}")