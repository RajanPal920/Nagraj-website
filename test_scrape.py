import requests
import sys

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://www.textronsteelalloys.com/astm-a182-a240/', headers=headers)

# Get full content from entry-content
idx = r.text.find('entry-content')
if idx != -1:
    with open('page_content.html', 'w', encoding='utf-8') as f:
        f.write(r.text[idx:])