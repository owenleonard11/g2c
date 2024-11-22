<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.min.css'

    let carouselDiv: HTMLDivElement
    let carouselLeft = () => {
        const x = carouselDiv.scrollLeft == 0 ? carouselDiv.clientWidth * carouselDiv.childElementCount : carouselDiv.scrollLeft - carouselDiv.clientWidth;
        carouselDiv.scroll(x, 0);
    }
    let carouselRight = () => {
        const x = carouselDiv.scrollLeft == carouselDiv.scrollWidth - carouselDiv.clientWidth ? 0 : carouselDiv.scrollLeft + carouselDiv.clientWidth;
        carouselDiv.scroll(x, 0);
    }
</script>

<div class="h-[92dvh] my-[4dvh] mx-4">
    <div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left" />
        </button>
    
        <div bind:this={carouselDiv} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto max-h-[82.8dvh] hide-scrollbar">
            <slot />
        </div>
    
        <button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right" />
        </button>
    </div>
    
    <div class="flex flex-row justify-center gap-4 mt-4 min-h-[10%] max-h-[10%]">
        <button type="button">
            HELLO
        </button>
        <button type="button">
            HELLO
        </button>
    </div>
</div>
