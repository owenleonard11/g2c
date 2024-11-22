<script lang="ts">
    import type { ZoteroBib } from "$lib/utils";
    import { onMount } from "svelte";
    enum Direction { Auto, Up, Down }

    export let bib:     Promise<ZoteroBib>;
    export let citekey: string    = "";
    // export let dir:     Direction = Direction.Auto;

    let showCitation = false;
    let citation = '';
    onMount( () =>
        bib.then(bib => { bib.getCitationByCitekey(citekey).then(citekey => { citation = citekey; }) })
    )

    
</script>

<div class="{showCitation ? "" : "hidden"} bg-[#9cbeaf] absolute top-0 p-2 text-sm max-w-[20dvw]"
     style="">
    {@html citation}
</div>

<a 
    class="bg-[#9cbeaf] rounded-md px-1 [&>*]:pointer-events-none" href="https://www.zotero.org/groups/5766383/g2c/items" target="_blank"
    on:mouseenter={() => { showCitation = true }}
    on:mouseleave={() => { showCitation = false }}
>
    <slot />
</a>

