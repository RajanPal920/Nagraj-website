# textron_scraper/spiders/test_single.py

import scrapy
import json
from textron_scraper.spiders.textron_products import TextronProductsSpider

class TestSingleSpider(scrapy.Spider):
    name = "test_single"
    
    start_urls = [
        "https://www.textronsteelalloys.com/ss-304-304l-erw-pipe-tube-stockist-supplier-exporter-stainless-steel-sch-10-40-80-a312-a778/",
    ]
    
    def parse(self, response):
        spider = TextronProductsSpider()
        product = spider.parse_product(response)
        
        print("\n" + "="*60)
        print("PRODUCT DATA")
        print("="*60)
        print(f"Title: {product.get('title')}")
        print(f"URL: {product.get('url')}")
        
        # Check grade_table
        grade_table = product.get('grade_table')
        if grade_table:
            print("\n✅ GRADE TABLE FOUND!")
            print(f"Title: {grade_table.get('title')}")
            print(f"Type: {grade_table.get('type')}")
            print(f"Headers: {grade_table.get('headers')}")
            print(f"Number of rows: {len(grade_table.get('rows', []))}")
            if grade_table.get('rows'):
                print("First 3 rows:")
                for row in grade_table.get('rows', [])[:3]:
                    print(f"  {row}")
        else:
            print("\n❌ No grade table found")
            
            # Check if there are tables on the page
            tables = response.css(".entry-content table")
            print(f"\nFound {len(tables)} tables on the page")
            
            for i, table in enumerate(tables[:3]):
                text = " ".join(table.css("::text").getall())
                print(f"\nTable {i+1} preview: {text[:150]}...")
        
        yield product