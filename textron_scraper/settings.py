# Scrapy settings for textron_scraper project

BOT_NAME = "textron_scraper"

SPIDER_MODULES = ["textron_scraper.spiders"]
NEWSPIDER_MODULE = "textron_scraper.spiders"

# Crawl responsibly
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 TextronScraper/1.0 (+https://textronsteelalloys.com/robots.txt)"

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# Concurrency and throttling
CONCURRENT_REQUESTS = 1
CONCURRENT_REQUESTS_PER_DOMAIN = 1
DOWNLOAD_DELAY = 2
RANDOMIZE_DOWNLOAD_DELAY = 0.5

# Disable cookies
COOKIES_ENABLED = False

# Override default request headers
DEFAULT_REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

# Enable AutoThrottle
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 2
AUTOTHROTTLE_MAX_DELAY = 30
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
AUTOTHROTTLE_DEBUG = False

# Enable HTTP caching
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 86400
HTTPCACHE_DIR = "httpcache"
HTTPCACHE_IGNORE_HTTP_CODES = [500, 502, 503, 504, 400, 401, 403, 404, 429]

# Item pipelines
ITEM_PIPELINES = {
    "textron_scraper.pipelines.BrandReplacementPipeline": 50,
    "textron_scraper.pipelines.ImageDownloadPipeline": 100,
    "textron_scraper.pipelines.PdfDownloadPipeline": 200,
    "textron_scraper.pipelines.JsonExportPipeline": 300,
    "textron_scraper.pipelines.CsvExportPipeline": 400,
    "textron_scraper.pipelines.SQLitePipeline": 500,
}

# Images pipeline settings
IMAGES_STORE = "output/images"
IMAGES_THUMBS = {
    "small": (50, 50),
    "medium": (300, 300),
}
IMAGES_MIN_HEIGHT = 50
IMAGES_MIN_WIDTH = 50

# Files pipeline settings
FILES_STORE = "output/pdfs"

# Feed exports
FEEDS = {
    "../public/data/products.json": {
        "format": "json",
        "encoding": "utf8",
        "store_empty": False,
        "indent": 2,
    },
}

FEED_EXPORT_ENCODING = "utf-8"