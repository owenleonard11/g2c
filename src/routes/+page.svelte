<script lang="ts">
	import '../app.postcss';
	import { slide } from 'svelte/transition';
	import '@fortawesome/fontawesome-free/css/all.min.css'

	import { currentLayer } from "$lib/../stores";
	import { Layer } from '$lib/utils';
	import LayerCard from "$lib/components/LayerCard.svelte";
	import { fetchBib } from '$lib/utils';

	import favicon from '$lib/images/favicon.svg';
	import zotero from '$lib/images/zotero.svg';
	import github from '$lib/images/github.svg';

	const LAYER_NAMES  = ['Home', 'Extract', 'Produce', 'Transport', 'Connect', 'Compute', 'Train']
	const LAYER_COLORS = ['#111928', '#a56b47', '#c9bf96', '#c49b87', '#9cbeaf', '#79a657', '#fbcb7d']

	fetchBib();
	
	let layer = Layer.Home; let showMenu = true; let rightColor = LAYER_COLORS[Layer.Home];
	currentLayer.subscribe((value) => layer = value);
	currentLayer.subscribe((value) => showMenu = value == Layer.Home);
	currentLayer.subscribe((value) => rightColor = LAYER_COLORS[value])
</script>

<svelte:head>
	<title>{'G2C - ' + LAYER_NAMES[layer]}</title>
</svelte:head>

<div class="flex flex-row justify-start h-lvh bg-[#111928]">
	<div class="flex flex-col">
		<div class="h-[10dvh] w-[40dvh] flex flex-row items-center">
			<div class="bg-[#a56b47] h-0.5 md:h-1 w-full rounded-r-xl mr-2"/>
			<div class="flex flex-row bg-[#70482f] rounded-full">
				<button class="h-[8dvh] w-[8dvh] hover:brightness-110"
				 on:click={() => { showMenu = !showMenu; currentLayer.set(Layer.Home)}}>
					<img src={favicon} alt="G2C Icon" class="animate-favicon-{showMenu ? "forwards" : "backwards"}"/>
				</button>
				{#if showMenu}
					<div class="flex pr-2" transition:slide={{ axis: "x" }}>
						<a href="https://www.zotero.org/groups/5766383/g2c" target="_blank" title="G2C on Zotero" 
						   class="h-[8dvh] w-[8dvh] hover:brightness-110" transition:slide>
							<img src={zotero} alt="G2C Icon" class="h-1/2 block m-auto my-[2dvh]"/>
						</a>
						<a href="https:/github.com/owenleonard11/g2c" target="_blank" title="G2C on Github" 
						   class="h-[8dvh] w-[8dvh] hover:brightness-110 " transition:slide>
							<img src={github} alt="G2C Icon" class="h-[60%] block m-auto my-[1.5dvh]"/>
						</a>
					</div>
				{/if}
			</div>
			<div class="bg-[#a56b47] h-0.5 md:h-1 w-full rounded-l-xl ml-2" />
		</div>
		<LayerCard layer={Layer.Train} />
		<LayerCard layer={Layer.Compute}/>
		<LayerCard layer={Layer.Connect}/>
		<LayerCard layer={Layer.Transport}/>
		<LayerCard layer={Layer.Produce}/>
		<LayerCard layer={Layer.Extract}/>
	</div>
	
	<div class="h-lvh min-w-[33dvw] max-w-[33dvw] bg-[#dcd6cc] ml-[-5dvh] z-0 px-[6dvh] pt-[4dvh] overflow-y-scroll">
		<div class="flex flex-col text-black">
			{#if layer == Layer.Home}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Welcome to G2C, a starter kit for the infrastructure of artificial intelligence.</h2>
				<p class="xl:text-xl mt-4 text-justify">
					Ground to Cloud (G2C) is a non-exhaustive repository of scholarly research and investigative journalism on the 
					numerous infrastructures that support contemporary artificial intelligence. Inspired by Benjamin Bratton's "stack"
					and Kate Crawford's "atlas," G2C has organized a selection of this work into the layers you see on the left. Select one to
					browse sites of interest and accompanying resources. You can return to this page at any time by clicking the 
					<img src={favicon} alt="Ground to Cloud Favicon" class="inline h-[1.875rem] p-0.5" />
					icon at the top left.
				</p>
				<p class="xl:text-xl mt-4 text-justify">
					G2C is built and maintained by 
					<a class="anchor" href="https://owenleonard.dev" target="_blank" title="Owen Leonard on owenleonard.dev">Owen Leonard</a>
					and hosted on Github Pages. A full bibliography for the site is available on 
					<a class="anchor" href="https://www.zotero.org/groups/5766383/g2c" target="_blank" title="G2C on Zotero">Zotero</a>. 
					The code is open-source and can be viewed on 
					<a class="anchor" href="https://github.com/owenleonard11/g2c" target="_blank" title="G2C on Github">Github</a>. 
				</p>
			</div>
			{:else if layer == Layer.Train}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 6: Training</h2>
			</div>
			{:else if layer == Layer.Compute}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 5: Computation</h2>
			</div>
			{:else if layer == Layer.Connect}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 4: Connection</h2>
			</div>	
			{:else if layer == Layer.Transport}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 3: Transportation</h2>
			</div>
			{:else if layer == Layer.Produce}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 2: Production</h2>
			</div>
			{:else if layer == Layer.Extract}
			<div transition:slide class="pb-[4dvh]">
				<h2 class="xl:text-3xl font-bold">Layer 1: Extraction</h2>
			</div>
			{/if}
		</div>
	</div>
	<div class="h-lvh w-full px-[6dvh] pt-[4dvh] overflow-y-scroll">
		<div class="flex flex-col text-black">
			{#if layer == Layer.Home}
			<div transition:slide>

			</div>
			{:else if layer == Layer.Train}
			<div transition:slide class="pb-[4dvh]">
			</div>
			{:else if layer == Layer.Compute}
			<div transition:slide class="pb-[4dvh]">
		
			</div>
			{:else if layer == Layer.Connect}
			<div transition:slide class="pb-[4dvh]">
	
			</div>	
			{:else if layer == Layer.Transport}
			<div transition:slide class="pb-[4dvh]">
				
			</div>
			{:else if layer == Layer.Produce}
			<div transition:slide class="pb-[4dvh]">
	
			</div>
			{:else if layer == Layer.Extract}
			<div transition:slide class="pb-[4dvh]">
	
			</div>
			{/if}
		</div>
	</div>
</div>
