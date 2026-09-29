import requests
from scrapy.selector import Selector
import sys

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://www.textronsteelalloys.com/astm-a182-a240/', headers=headers)

sel = Selector(text=r.text)

# Find all tables in entry-content
tables = sel.css(".entry-content table")
print(f"Total tables: {len(tables)}")

with open('table_debug.txt', 'w', encoding='utf-8') as f:
    for i, table in enumerate(tables):
        f.write(f"\n=== Table {i} ===\n")
        # Get all rows
        rows = table.css("tr")
        for j, row in enumerate(rows[:8]):
            cells = row.css("td *::text, th *::text").getall()
            cells = [c.strip() for c in cells if c.strip()]
            f.write(f"  Row {j}: {cells[:15]}\n")
        
        # Check table class
        table_class = table.css("::attr(class)").get()
        f.write(f"  Class: {table_class}\n")
    
    # Search for chemical/mechanical
    all_text = table.css("*::text").getall()
    full_text = " ".join(all_text).lower()
    if "chemical" in full_text and "composition" in full_text:
        f.write(f"\n*** CHEMICAL COMPOSITION TABLE {i} ***\n")
        rows = table.css("tr")
        for j, row in enumerate(rows):
            cells = row.css("td *::text, th *::text").getall()
            cells = [c.strip() for c in cells if c.strip()]
            f.write(f"  Row {j}: {cells}\n")
    if "mechanical" in full_text and "propert" in full_text:
        f.write(f"\n*** MECHANICAL PROPERTIES TABLE {i} ***\n")
        rows = table.css("tr")
        for j, row in enumerate(rows):
            cells = row.css("td *::text, th *::text").getall()
            cells = [c.strip() for c in cells if c.strip()]
            f.write(f"  Row {j}: {cells}\n")

print("Done - check table_debug.txt")