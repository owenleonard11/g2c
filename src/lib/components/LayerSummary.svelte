<script lang="ts">
    import { slide } from "svelte/transition";
    export let heading: string;
</script>
<div transition:slide class="pb-[4dvh]">
    <h2 class="xl:text-3xl font-bold">{heading}</h2>
    <slot />
</div>