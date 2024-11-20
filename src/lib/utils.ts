export enum Layer {
    Home,
    Extract,
    Produce,
    Transport,
    Connect,
    Compute,
    Train
}

// citekey: {Author|Title}{YYYY}{1+}
const groupUrl = "https://api.zotero.org/groups/5766383/";
export const fetchBib = () => {
    const citekeyToZid: Map<string, string> = new Map()
    
    fetch(groupUrl + 'items')
        .then(response => {
            return response.json();
        })
        .then(items => {
            for (const item in items) {
                const meta = items[item]['meta'];
                const data = items[item]['data'];

                const citekeyFirst  = Object.hasOwn(meta, 'creatorSummary') ? meta['creatorSummary'] : data['title'].split(' ').slice(0, 2).join('');
                const citekeySecond = meta['parsedDate'].slice(0, 4)
                let citekeyNo = 0
                let citekey   = citekeyFirst + citekeySecond + (citekeyNo ? citekeyNo : "")
                while(citekeyToZid.has(citekey)) {
                    citekey   = citekeyFirst + citekeySecond + (citekeyNo++ ? citekeyNo : "")
                }
                citekeyToZid.set(citekeyFirst + citekeySecond + (citekeyNo ? citekeyNo : ""), data.key)
            }
        });
}
