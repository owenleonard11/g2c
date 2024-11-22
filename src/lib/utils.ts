export enum Layer {
    Home,
    Extract,
    Produce,
    Transport,
    Connect,
    Compute,
    Train
}

export class ZoteroBib {
    readonly url: string;
    citeFormat: string;
    citeMap: Map<string, string>;

    constructor(url: string, citeFormat: string, citeMap: Map<string, string>) {
        this.url = url;
        this.citeFormat = citeFormat;
        this.citeMap = citeMap;
    }

    getCitationById(id: string): Promise<string> {
        let requestUrl = `${this.url}/${id}/?format=json&include=citation&style=${this.citeFormat}`
        return fetch(requestUrl)
            .then(response => { return response.json() })
            .then(item => { return item['citation'] || '' })
    }

    getCitationByCitekey(citekey: string): Promise<string> {
        return this.getCitationById(this.citeMap.get(citekey) || '');
    }
}

export function buildZoteroBib(url: string, citeFormat: string): Promise<ZoteroBib> {
    const apiUrl = 'https://api.zotero.org/' + url + '/items'
    console.log(apiUrl)
    return fetch(apiUrl).then(
        response => { return response.json() }
    ).then(
        items => {
            let citeMap: Map<string, string> = new Map();

            for (const item in items) {
                const meta = items[item]['meta'];
                const data = items[item]['data'];

                const citekeyFirst  = Object.hasOwn(meta, 'creatorSummary') ? meta['creatorSummary'] : data['title'].split(' ').slice(0, 2).join('');
                const citekeySecond = meta['parsedDate'].slice(0, 4)
                let citekeyNo = 0
                let citekey   = citekeyFirst + citekeySecond + (citekeyNo ? citekeyNo : "")
                while(citeMap.has(citekey)) {
                    citekey = citekeyFirst + citekeySecond + (citekeyNo++ ? citekeyNo : "")
                }
                citeMap.set(citekey, data.key)
        }

        return new ZoteroBib(apiUrl, citeFormat, citeMap);
    })
}
