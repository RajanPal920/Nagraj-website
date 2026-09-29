import requests

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://www.textronsteelalloys.com/astm-a182-a240/', headers=headers)

# Find entry-content which contains product data
idx = r.text.find('entry-content')
if idx != -1:
    # Print from entry-content
    content = r.text[idx:idx+10000]
    # Search for chemical composition in this section
    chem_idx = content.find('Chemical Composition')
    if chem_idx != -1:
        print(f'Found at position {chem_idx}')
        print(content[chem_idx:chem_idx+3000])
    else:
        print("Chemical Composition not found in entry-content")
        # Print first 3000 chars of entry-content
        print(content[:3000])