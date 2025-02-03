<script lang="ts">
    import Extract from "$lib/components/layers/Extract.svelte";
    import Produce from "$lib/components/layers/Produce.svelte";
    import Transport from "$lib/components/layers/Transport.svelte";
    import Connect from "$lib/components/layers/Connect.svelte";
    import Compute from "$lib/components/layers/Compute.svelte";
    import Train from "$lib/components/layers/Train.svelte";

    import { currentLayer } from "$lib/../stores";
    import { Layer } from "$lib/utils";

    export let layer: Layer = Layer.Home;
    let animate = "";

    let isCurrentLayer = false;
    currentLayer.subscribe((value) => {
        isCurrentLayer = value == layer;
        animate = isCurrentLayer ? "forwards" : "backwards";
    });
</script>

<button 
    class="{ !isCurrentLayer ? "hover:brightness-110 focus:brightness-110" : "z-10" }" 
    on:focusin={() => animate = "forwards"} 
    on:focusout={() => animate = isCurrentLayer ? "forwards" : "backwards"} 
    on:mouseenter={() => animate = "forwards"} 
    on:mouseleave={() => animate = isCurrentLayer ? "forwards" : "backwards"} 
    on:click={() => { currentLayer.set(layer) }}
>
    <svg 
        width="256mm" height="96mm" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 288 96" 
        class="h-[15dvh] w-[45dvh]"
    >
        {#if      layer==Layer.Extract}   <Extract   animate={animate} />
        {:else if layer==Layer.Produce}   <Produce   animate={animate} />
        {:else if layer==Layer.Transport} <Transport animate={animate} />
        {:else if layer==Layer.Connect}   <Connect   animate={animate} />
        {:else if layer==Layer.Compute}   <Compute   animate={animate} />
        {:else if layer==Layer.Train}     <Train     animate={animate} />
        {/if}
    </svg>
</button>