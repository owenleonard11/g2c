<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import type { exhibit } from '$lib/utils.ts'
    import { page } from '$app/stores';
	import { onMount } from 'svelte';

    export let exhibits: exhibit[];

    let carouselDiv: HTMLDivElement
    let selected: number = 0;
    let carouselLeft = () => {
        selected = selected ? selected - 1 : exhibits.length - 1;
        carouselToIndex(selected);
    }
    let carouselRight = () => {
        selected = (selected + 1) % exhibits.length;
        carouselToIndex(selected);
    }
    let carouselToIndex = (i: number) => {
        carouselDiv.scroll(carouselDiv.clientWidth * i, 0);
        selected = i;
    }

    onMount(() => {
		let layerParam = $page.url.searchParams.get('exhibit')
		if (layerParam && parseInt(layerParam) && 0 <= parseInt(layerParam) && parseInt(layerParam) <= exhibits.length) {
			selected = parseInt(layerParam);
            carouselToIndex(selected)
		}
	})
</script>

<div class="my-[4dvh] mx-2 lg:mx-4">
    <div class="grid grid-cols-[auto_1fr_auto] gap-2 lg:gap-4 items-center">
        <button type="button" class="btn-icon bg-[#dcd6cc] w-6 md:w-8 lg:w-12" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left text-black text-xs md:text-sm lg:text-md xl:text-lg" />
        </button>
    
        <div bind:this={carouselDiv} class="snap-x snap-mandatory scroll-smooth flex overflow-x-scroll max-h-[82.8dvh] hide-scrollbar">
            <slot />
        </div>
    
        <button type="button" class="btn-icon bg-[#dcd6cc] w-6 md:w-8 lg:w-12" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right text-black text-xs md:text-sm lg:text-md xl:text-lg" />
        </button>
    </div>
    
    <div class="flex flex-row justify-center my-2 lg:my-4 min-h-[9.2dvh] max-h-[9.2dvh]">
        {#each exhibits as exhibit, i}
            <button on:click={() => carouselToIndex(i)} class="max-w-[9.2dvh] hover:brightness-125 border-[#dcd6cc]">
                {#await import(`$lib/images/exhibits/thumbnails/${exhibit.id}.png`) then { default: src }}
                    <img {src} alt={exhibit.alt} title={exhibit.title} class="h-auto w-full {selected == i ? 'border-2 rounded-md' : ''}"/>
                {/await} 
            </button>
        {/each}
    </div>
</div>
