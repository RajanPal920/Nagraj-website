import scrapy


class ChemicalCompositionEntry(scrapy.Item):
    element = scrapy.Field()
    min_value = scrapy.Field()
    max_value = scrapy.Field()
    unit = scrapy.Field()


class MechanicalPropertyEntry(scrapy.Item):
    property_name = scrapy.Field()
    value = scrapy.Field()
    unit = scrapy.Field()
    condition = scrapy.Field()


class ProductImage(scrapy.Item):
    url = scrapy.Field()
    alt = scrapy.Field()
    local_path = scrapy.Field()
    checksum = scrapy.Field()


class ProductAttachment(scrapy.Item):
    url = scrapy.Field()
    title = scrapy.Field()
    local_path = scrapy.Field()
    file_type = scrapy.Field()


class Product(scrapy.Item):
    # Basic fields
    url = scrapy.Field()
    title = scrapy.Field()
    slug = scrapy.Field()
    description_text = scrapy.Field()
    product_type = scrapy.Field()
    category = scrapy.Field()
    scraped_at = scrapy.Field()
    status = scrapy.Field()

    # Navigation / SEO
    breadcrumbs = scrapy.Field()
    meta_title = scrapy.Field()
    meta_description = scrapy.Field()
    publish_date = scrapy.Field()
    modified_date = scrapy.Field()

    # Grades and specifications
    material_grades = scrapy.Field()
    equivalent_grades = scrapy.Field()
    specifications = scrapy.Field()

    # Content sections
    applications = scrapy.Field()
    features = scrapy.Field()
    tests = scrapy.Field()
    packing = scrapy.Field()

    # Technical data
    chemical_composition = scrapy.Field()
    mechanical_properties = scrapy.Field()

    # Media
    images = scrapy.Field()
    attachments = scrapy.Field()