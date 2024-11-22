<script lang="ts">
    import type { exhibit } from "$lib/utils";

    export let exhibit: exhibit;
    const { id, title, alt, loc, desc } = exhibit;
</script>

<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
    {#await import(`$lib/images/exhibits/banners/${id}.png`) then { default: src }}
        <img {src} {alt} title={desc} class="h-auto w-full rounded-t-md"/>
    {/await} 
    <div class="p-4 bg-[#dcd6cc] rounded-b-md">
        <p>
            <span class="xl:text-xl font-semibold">{title}</span>
            <span class="xl:text-lg text-slate-800 ml-2">{loc}</span>
        </p>
        <div class="pt-2 xl:text-lg text-justify max-h-full">
            <slot />
        </div>
    </div>
</div>