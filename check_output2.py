import json

with open('output/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total products: {len(data)}')
for p in data:
    title = p.get('title', '')[:60]
    print(f'- {title}... | {p.get("product_type")} | Images: {len(p.get("images", []))} | Chem: {bool(p.get("chemical_composition"))} | Mech: {bool(p.get("mechanical_properties"))}')