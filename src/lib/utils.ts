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
    citeMap: Promise<Map<string, string>> | null;

    constructor(url: string, citeFormat: string, buildCiteMap=true) {
        this.url = url;
        this.citeFormat = citeFormat;
        
        if (buildCiteMap) {
            this.citeMap = fetch(this.url + 'items').then(
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
    
                return citeMap;
            })
        } else {
            this.citeMap = null;
        }
        
    }

    getCitationById(id: string): Promise<string> {
        let requestUrl = `${this.url}/items/${id}/?format=json&include=bib&style=apa`
        return fetch(requestUrl)
            .then(response => { return response.json() })
            .then(item => { return item['bib'] || '' })
    }

    getCitationByCitekey(citekey: string): Promise<string> {
        if (!this.citeMap) {
            throw new Error('No citeMap built')
        }

        let id: Promise<string> = this.citeMap.then(citeMap => { return citeMap.get(citekey) ||  '' })
        return id.then(id => { return this.getCitationById(id) })
    }
}
