from requests import get
from json import dump

API_URL = 'https://api.zotero.org/groups/5766383/items'
CITATION_OPTIONS = {
    'format': 'json',
    'include': 'citation',
    'style': 'chicago-fullnote-bibliography'
}

# build list
citemap: dict[str, str] = {}

items_remain = True
while(items_remain):
    offset = 0
    json = get(API_URL, params={'limit': '100', 'start': str(offset)}).json()
    for item in json:
        meta, data = item['meta'], item['data']
        citekey_first = meta.get('creatorSummary', 0) or ' '.join(data['title'].split(' ')[0:2])
        citekey_second = meta.get('parsedDate', '')[0:4]
        citekey_no, citekey = 0, f'{citekey_first} {citekey_second}'
        while citekey in citemap:
            citekey_no += 1
            citekey = f'{citekey_first} {citekey_second} ({citekey_no})'
        citemap[citekey] = data['key']
    
    items_remain = len(citemap) == offset + 100
    offset += 100

# get full citations
bib: dict[str, str] = {}
for citekey, key in citemap.items():
    bib[citekey] = get(f'{API_URL}/{key}', CITATION_OPTIONS).json()['citation']

# write to bib.json
with open('src/lib/bib.json', 'w', encoding='utf-8') as fp:
    dump(bib, fp, ensure_ascii=False, indent=4)
