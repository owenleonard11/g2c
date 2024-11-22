<script lang="ts">
	import { slide } from 'svelte/transition';
	
	import '../app.postcss';
	import favicon from '$lib/images/favicon.svg';
	import zotero from '$lib/images/zotero.svg';
	import github from '$lib/images/github.svg';
	import * as exhibits from '$lib/exhibits.json'

	import { currentLayer } from "$lib/../stores";
	import { buildZoteroBib, Layer } from '$lib/utils';

	import LayerCard from "$lib/components/LayerCard.svelte";
    import LayerSummary from '$lib/components/LayerSummary.svelte';
	import SummaryParagraph from '$lib/components/SummaryParagraph.svelte';
    import Citation from '$lib/components/Citation.svelte';
	import Exhibit from '$lib/components/Exhibit.svelte';
    import ExhibitCarousel from '$lib/components/ExhibitCarousel.svelte';

	const LAYER_NAMES  = ['Home', 'Extract', 'Produce', 'Transport', 'Connect', 'Compute', 'Train'];

	let bib = buildZoteroBib('5766383', 'g2c', 'chicago-fullnote-bibliography')
	
	let layer = Layer.Home; let showMenu = true;
	currentLayer.subscribe((value) => layer = value);
	currentLayer.subscribe((value) => showMenu = value == Layer.Home);
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
			<LayerSummary heading="Welcome to G2C, a starter kit for the infra&shy;structure of artificial intelligence.">
				<SummaryParagraph>
					Ground to Cloud (G2C) is a non-exhaustive repository of scholarly research and investigative journalism on the 
					numerous infra&shy;structures that support contemporary artificial intelligence. Inspired by 
					<Citation {bib} citekey="Bratton2015">
						Benjamin Bratton's  "stack"
					</Citation>
					and 
					<Citation {bib} citekey="Crawford2021">
						Kate Crawford's "atlas,"
					</Citation>
					G2C has organized a selection of this work into the layers you see on the left. Select one to
					browse sites of interest and accompanying resources. Text
					<span class="px-1 rounded-md bg-[#9cbeaf]">highlighted in teal</span>
					indicates a citation; hover to view and click to see more details on Zotero. 
					
					You can return to this page at any time by selecting the 
					<img src={favicon} alt="Ground to Cloud Favicon" class="inline h-[1.875rem] p-0.5" />
					icon at the top left.
				</SummaryParagraph>
				<SummaryParagraph>
					G2C is built and maintained by 
					<a class="anchor" href="https://owenleonard.dev" target="_blank" title="Owen Leonard on owenleonard.dev">Owen Leonard</a>
					and hosted on Github Pages. A full bibliography for the site is available on 
					<a class="anchor" href="https://www.zotero.org/groups/5766383/g2c" target="_blank" title="G2C on Zotero">Zotero</a>. 
					The code is open-source and can be viewed on 
					<a class="anchor" href="https://github.com/owenleonard11/g2c" target="_blank" title="G2C on Github">Github</a>. 
				</SummaryParagraph>
			</LayerSummary>
			{:else if layer == Layer.Train}
			<LayerSummary heading="Layer 6: Training">

			</LayerSummary>
			{:else if layer == Layer.Compute}
			<LayerSummary heading="Layer 5: Computation">

			</LayerSummary>
			{:else if layer == Layer.Connect}
			<LayerSummary heading="Layer 4: Connection">

			</LayerSummary>
			{:else if layer == Layer.Transport}
			<LayerSummary heading="Layer 3: Transportation">

			</LayerSummary>
			{:else if layer == Layer.Produce}
			<LayerSummary heading="Layer 2: Production">

			</LayerSummary>
			{:else if layer == Layer.Extract}
			<LayerSummary heading="Layer 1: Extraction">
				<SummaryParagraph>
					Artificial intelligence begins with what 
					<Citation {bib} citekey="Labban2014">
						Marzen Labban (2014)
					</Citation>
					calls the "planetary extractive machine": the globe-spanning collection of 
					mining, smelting, and refining operations that provide the raw materials for
					the manufacture of chips, boards, batteries, and other components. Despite
					abstract, ethereal imagery of "cloud architectures" and "wireless comm&shy;unications," 
					<Citation {bib} citekey="Hogan and Lepage-Richter">
						Hogan and Lepage-Richer
					</Citation>
					remind us that AI "is ultimately a resource-heavy technology reliant on
					large-scale computing infra&shy;structures."

					Increasing demand for the latest products and ever-shorter obsolescence cycles 
					have driven the extractive machine into overdrive—"From the perspective of deep time,"
					<Citation {bib} citekey="Crawford2021">
						Kate Crawford (2021)
					</Citation> 
					writes, "we are extracting Earth's geological history to serve a split-second of 
					contemporary technological time."
				</SummaryParagraph>
				<SummaryParagraph>
					The AI industry drives mineral extraction primarily through its reliance on 
					specialized computer chips like Graphics Processing Units (GPUs),
					Field-Programmable Gate Arrays (FGPAs), and Application-Specific Integrated
					Circuits (ASICs), which rely in turn on semiconductor chips made from
					a wide array of metals and other elements. A
					<Citation {bib} citekey="Khan et al.2021">
						2021 report on the semiconductor supply chain
					</Citation>
					shows that while the United States and Western Europe dominate
					semiconductor device design, the actual extraction of the necessary
					raw materials (and therefore the environmental and health impacts of mining)
					are heavily concentrated in China and the Global South. From coltan in the 
					Congo to rare earth elements in Inner Mongolia, the exhibits on the right
					represent only a few of the many sites at which this disparity is realized.
				</SummaryParagraph>
			</LayerSummary>
			{/if}
		</div>
	</div>

	<div class="h-lvh w-full animate-exhibit-bg-{LAYER_NAMES[layer]}">
		{#if layer == Layer.Home}
			placeholder
		{:else if layer == Layer.Train}
			placeholder
		{:else if layer == Layer.Compute}
			placeholder
		{:else if layer == Layer.Connect}
			placeholder
		{:else if layer == Layer.Transport}
			placeholder
		{:else if layer == Layer.Produce}
			placeholder
		{:else if layer == Layer.Extract}
		<ExhibitCarousel exhibits={exhibits['extract']}>
			<Exhibit exhibit={exhibits['extract'][0]}>
				The Bayan Obo deposit in Inner Mongolia, China is the world's single largest source of 
				rare earth elements (REEs)—key materials in the production of the semi&shy;conductor devices that 
				power AI training. According to
				<Citation {bib} citekey="BayanObo">
					mindat.org,
				</Citation>
				Bayan Obo accounts for 70% of known REE reserves. Once extracted from the ground, 
				ore from the mining complex undergoes hydro&shy;metal&shy;lurgical leaching in the nearby city of Baotou. 
				Liquid waste from this process is deposited into a nearly four-square-mile artificial lake 
				"filled with a black, barely-liquid, toxic sludge"
				<Citation {bib} citekey="Maughan2015">
					(Maughan, 2015).
				</Citation>
				In 2016,
				<Citation {bib} citekey="Pan and Li2016">
					an investigation into soil pollution
				</Citation>
				found that high concentrations of heavy metals at and around Bayan Obo pose substantial ecological
				and public health risks.
			</Exhibit>
		</ExhibitCarousel>
		{/if}
	</div>
</div>
