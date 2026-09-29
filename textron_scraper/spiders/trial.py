import scrapy
from textron_scraper.spiders.textron_products import TextronProductsSpider

class TrialSpider(scrapy.Spider):
    name = 'trial_spider'
    start_urls = ['https://www.textronsteelalloys.com/x39crmo17-1-flat-bars-1-4122/']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.base_spider = TextronProductsSpider()
        
    def parse(self, response):
        return self.base_spider.parse_product(response)
