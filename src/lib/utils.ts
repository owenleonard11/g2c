export enum Layer {
    Home,
    Extract,
    Produce,
    Transport,
    Connect,
    Compute,
    Train
}

export interface exhibit {
    id: string;
    title: string;
    loc: string;
    alt: string;
    desc: string;
}
