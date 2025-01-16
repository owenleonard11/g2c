<script lang="ts">
    import type { exhibit } from "$lib/utils";

    export let exhibit: exhibit;
    const { id, title, alt, loc, desc } = exhibit;
</script>

<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
    {#await import(`$lib/images/exhibits/banners/${id}.png`)}
        <div class="h-[30dvh] bg-[#dcd6cc] p-4">
            <div class="rounded-lg bg-[#888a8c]" />
        </div>
    {:then { default: src }}
        <img {src} {alt} title={desc} class="h-auto w-full rounded-t-md"/>
    {/await} 
    <div class="text-sm lg:text-base xl:text-lg p-2 lg:p-4 bg-[#dcd6cc] rounded-b-md">
        <div>
            <p class="xl:text-xl font-semibold mr-2">{title}</p>
            <p class="xl:text-lg text-slate-800">{loc}</p>
        </div>
        <div class="pt-2 xl:text-lg max-h-full">
            <slot />
        </div>
    </div>
</div>