<script lang="ts">
    export let carouselDiv: HTMLDivElement;
    export let thumbnailSrc: string;
    export let thumbnailDesc: string;
    export let index: number;
    let handleThumbnailClick = (index: number) => {
        carouselDiv.scroll(carouselDiv.clientWidth * index, 0);
    }
</script>

<button type="button" on:click={() => handleThumbnailClick(index)}>
    {#await import(`$lib/images/exhibits/${thumbnailSrc}.png`) then { default: src }}
        <img {src} alt={`Thumbnail for ${thumbnailDesc}`} title={`Jump to ${thumbnailDesc}`} class="h-auto w-full rounded-t-md"/>
    {/await} 
</button>