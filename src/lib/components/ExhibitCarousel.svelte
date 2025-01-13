<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import type { exhibit } from '$lib/utils.ts'

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
</script>

<div class="h-[92dvh] my-[4dvh] mx-4">
    <div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <button type="button" class="btn-icon bg-[#dcd6cc]" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left text-black" />
        </button>
    
        <div bind:this={carouselDiv} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto max-h-[82.8dvh] hide-scrollbar">
            <slot />
        </div>
    
        <button type="button" class="btn-icon bg-[#dcd6cc]" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right text-black" />
        </button>
    </div>
    
    <div class="flex flex-row justify-center mt-4 min-h-[9.2dvh] max-h-[9.2dvh]">
        {#each exhibits as exhibit, i}
            <button on:click={() => carouselToIndex(i)} class="max-w-[9.2dvh] hover:brightness-125 border-[#dcd6cc]">
                {#await import(`$lib/images/exhibits/thumbnails/${exhibit.id}.png`) then { default: src }}
                    <img {src} alt={exhibit.alt} title={exhibit.title} class="h-auto w-full {selected == i ? 'border-2 rounded-md' : ''}"/>
                {/await} 
            </button>
        {/each}
    </div>
</div>
