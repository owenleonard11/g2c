<script lang="ts">
    import { slide } from "svelte/transition";
    export let heading: string;
</script>
<div transition:slide={{ duration: 1000 }} class="pb-[4dvh]">
    <h2 class="text-base md:text-xl xl:text-3xl font-bold">{heading}</h2>
    <slot />
</div>