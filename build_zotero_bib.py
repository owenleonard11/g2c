from requests import get
from requests import exceptions
from json import dump
from time import sleep

API_URL = 'https://api.zotero.org/groups/5766383/items/'
LIB_URL = 'https://www.zotero.org/groups/576693/g2c/items/'
CITATION_OPTIONS = {
    'format': 'json',
    'include': 'citation',
    'style': 'chicago-fullnote-bibliography'
}

# build list
citemap: dict[str, str] = {}

items_remain = True
offset = 0
while(items_remain):

    json = get(API_URL, params={'sort': 'creator', 'limit': '100', 'start': str(offset)}).json()
    for item in json:
        meta, data = item['meta'], item['data']
        if 'title' not in data:
            print(data)
            continue
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
bib: dict[str, tuple[str, str]] = {}
for citekey, key in citemap.items():
    try:
        response =  get(f'{API_URL}/{key}', CITATION_OPTIONS)
        response.raise_for_status()
        bib[citekey] = (response.json()['citation'], f'{LIB_URL}{key}/library')
    except exceptions.RequestException as e:
        print(f'Request failed: {e}')
        if response:
            print(f'Response content: {response.text}')
    sleep(1)

# write to bib.json
with open('src/lib/bib.json', 'w', encoding='utf-8') as fp:
    dump(bib, fp, ensure_ascii=False, indent=4)
