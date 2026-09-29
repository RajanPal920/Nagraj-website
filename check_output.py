with open('output/products.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if it's JSON lines
lines = content.strip().split('\n')
print(f'Lines: {len(lines)}')
print(f'First line: {lines[0][:50]}')
print(f'Line 2: {lines[1][:50]}')
print(f'Line 364: {lines[363][:50]}')
print(f'Last line: {lines[-1][:50]}')

# Check if lines start with {
import json
products = []
for i, line in enumerate(lines):
    line = line.strip()
    if line and (line.startswith('{') or line.startswith('[')):
        try:
            products.append(json.loads(line))
        except Exception as e:
            print(f'Error on line {i}: {e}')

print(f'Parsed {len(products)} products')
for p in products[:3]:
    if isinstance(p, dict):
        print(f'- {p.get("title")} ({p.get("product_type")})')