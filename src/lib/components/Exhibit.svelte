<script lang="ts">
    export let image: string;
    export let image_alt: string;
    export let image_title: string;
    export let title: string;
</script>

<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
    {#if image}
        <div class="pb-0">
            {#await import(`$lib/images/exhibits/${image}.png`) then { default: src }}
                <img {src} alt={image_alt} title={image_title} class="h-auto w-full rounded-t-md"/>
            {/await} 
        </div>
    {/if}
    <div class="p-4 bg-[#dcd6cc] rounded-b-md">
        <p>
            <span class="xl:text-xl font-semibold">{title}</span>
            <span class="xl:text-lg text-slate-800 ml-2">Inner Mongolia, China</span>
        </p>
        <div class="pt-2 xl:text-lg text-justify max-h-full">
            <slot />
        </div>
    </div>
</div>