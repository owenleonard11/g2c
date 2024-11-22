<script lang="ts">
    import type { ZoteroBib } from "$lib/utils";
    import { onMount } from "svelte";
    enum xDirection { Auto, Left, Right }
    enum yDirection { Auto, Up, Down }

    export let bib:     Promise<ZoteroBib>;
    export let citekey: string    = "";
    // export let dir:     Direction = Direction.Auto;

    let showCitation = false;
    let citation = '';
    let url = '';
    let citationId = '';
    onMount( () =>
        bib.then(bib => { 
            citationId = bib.citeMap.get(citekey) || ''
            url = bib.url;
            bib.getCitationByCitekey(citekey).then(citekey => { citation = citekey; }) 
        })
    )

    let x: number = 0;
    let y: number = 0;
    let mouseInTooltip = false;
</script>

<a  href="https://www.zotero.org/groups/5"
    class="{showCitation ? "" : "hidden"} bg-[#9cbeaf] absolute top-0 p-2 text-sm max-w-[20dvw] text-left"
    style="left:{x}px;top:{y}px"
    on:mouseenter={() => { mouseInTooltip = true; }}
    on:mouseleave={() => { showCitation = false; }}
>     
    {@html citation}
</a>

<a 
    class="bg-[#9cbeaf] rounded-md px-1 [&>*]:pointer-events-none" href="https://www.zotero.org/groups/5766383/g2c/items" target="_blank"
    on:mouseenter={(e) => { showCitation = true; x = e.clientX; y=e.clientY}}
    on:mouseleave={() => { showCitation = false }}
>
    <slot />
</a>

