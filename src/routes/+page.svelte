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
					<Citation {bib} citekey="Hogan and Lepage-Richter2024">
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
				Because of its higher resistivity at small dimensions, cobalt powers AI computing by allowing
				for the manufacture of faster, smaller integrated circuits
				<Citation {bib} citekey="Bakke2018">
					(Bakke 2018).
				</Citation>
				In the Congolese city of Kolwezi, the provincial capital of Lualaba, cobalt-mining pits have 
				"swallowed" entire neighborhoods as global demand rises
				<Citation {bib} citekey="Beaule2023">
					(Beaule 2023).
				</Citation>
				Siddharth Kara, who profiles the mine at Kolwezi in a chapter of her 
				<Citation {bib} citekey="Kara2023">
					2023 book <i>Cobalt Red</i>
				</Citation> 
				titled "We Work in Our Graves," reports extremely hazardous work in hand-dug tunnels at constant
				risk of collapse, often involving children trafficked by local militias.
				Attempts by the Congolese government to formalize and regulate artisanal cobalt mining have
				proceeded only haltingly, furstrated by corruption and instability. A 
				<Citation {bib} citekey="Umpula et al.2021">
					2021 report 
				</Citation>
				by the International Institute for Environment Development in collaboration with African Resources Watch
				found that supply chain reform attempts often have little effect beyond empowering black-market
				traders. A 
				<Citation {bib} citekey="Umpula and Bisil2023">
					2023 follow-up
				</Citation>
				found that predatory middlemen forcibly evicted from Kolwezi in 2019 had returned to the same sites.
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][1]}>
				Nestled deep in Congo's Walikale territory, the Bisie mine is of the world's largest
				deposits of cassiterite, a valuable tin-containing ore. Although the jungle hides much of the operation,
				the patchwork of mostly hand-dug pits visible in the satellite image has seen military skirmishes, labor
				riots, and international boycotts
				<Citation {bib} citekey="Wimmer and Hilgert2011">
					(Wimmer and Hilgert 2011,
				</Citation>
				<Citation {bib} citekey="Witley and Heins2014">
					Witley and Heins 2014).
				</Citation>
				Since the move away from lead-based solders in the early 2000s, tin-based alloys have become the 
				solder of choice in electronics manufacturing
				<Citation {bib} citekey="Moshrefi-Torbati and Swingler2011">
					(Moshrefi-Torbati and Swingler 2011).
				</Citation>
				An MIT study comissioned by the 
				<Citation {bib} citekey="Latham2018">
					Rio Tinto mining group in 2018 
				</Citation>
				predicted that tin would be the metal most affected by new technologies, with high-performance
				computing representing the largest demand sector. Following this demand, international mining interests 
				have converged on sites like Bisie—leading to conflict between corporate personnel and local artisinal
				miners
				<Citation {bib} citekey="Huggins2023">
					(Huggins 2023).
				</Citation>
				The increasing computational needs of AI models are likely to drive further extraction and exploitation
				at Bisie and throughout North Kivu, where slavery, child labor, and extremely hazardous working conditions 
				have been documented
				<Citation {bib} citekey="TheCongo2011">
					(Free the Slaves 2011,
				</Citation>
				<Citation {bib} citekey="Rudahigwa2010">
					Rudahigwa 2010).
				</Citation>
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][2]}>
				Another major source of tin is Indonesia's Bangka island, where the metal is extracted 
				on behalf of the national tin corporation PT Timah and supplied via various solder manufacturers
				to Foxconn, which partners with AI firms and manufactures devices for Apple
				<Citation {bib} citekey="Simpson2012">
					(Simpson 2012).
				</Citation>
				Artisanal miners dredge for ore off the coast or risk being buried by landslides in the huge mining 
				pits visible in turquoise in the satellite image
				<Citation {bib} citekey="Hodal2012">
					(Hodal 2012).
				</Citation>
				Tin mined under dangerous conditions with little regulatory oversight passes through a "shadow network"
				of distributors that "hides behind official companies"
				<Citation {bib} citekey="Nugraha and Purwanto2020">
					(Nugraha and Purwanto 2020).
				</Citation>
				Despite the establishment of the Tin Working Group in 2014 by electronics manufacturers and various NGOs
				to promote fair labor practices and supply chain accountability
				<Citation {bib} citekey="Diprose et al.2022">
					Diprose et al. (2022)
				</Citation>
				conclude that the group's interventions "make small contributions to narrowly defined regulatory 'problems',
				while failing to curtail patterns of environmental and social harm."
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][3]}>
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
					(Maughan 2015).
				</Citation>
				In 2016,
				<Citation {bib} citekey="Pan and Li2016">
					an investigation into soil pollution
				</Citation>
				found that high concentrations of heavy metals at and around Bayan Obo pose substantial ecological
				and public health risks.
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][4]}>
				Tantalum, an element used in the electrolytic capacitors that are crucial for microelectronics production,
				is derived almost entirely from coltan ore mined in the DRC
				<Citation {bib} citekey="Taffel2015">
					(Taffel 2015).
				</Citation>
				The Bibatama Mining Concession at Rubaya is one of many sites where coltan is illegally extracted and laundered
				into the global supply chain, enabled by widespread corruption and political instability. Lack of transportation
				infrastructure makes regulation extremely difficult, encouraging smuggling and diverting profits away from
				local communities and into the hands of corrupt officials and foreign corporations
				<Citation {bib} citekey="Whyit’s2021">
					(<i>The Economist</i> 2021).
				</Citation>
				Multinational mining groups surreptitiously purchase and fraudulently certify illegal coltan, meaning that "end
				users cannot be certain about the origins of the tantalum elements in their electronic devices"
				<Citation {bib} citekey="Ojewale2022">
					(Ojewale 2022).
				</Citation>
				NVIDIA, a major supplier of GPUs, claimed in its
				<Citation {bib} citekey="NVIDIA Corporation2023">
					2023 Conflict Minerals Report
				</Citation>  
				that 97% of processing facilities in its supply chain were RMAP-compliant—
				but the report includes only the information disclosed by direct suppliers.
				An 
				<Citation {bib} citekey="NVIDIA Corporation2014">
					earlier SEC filing
				</Citation>
				shows that a majority of suppliers reported unknown countries of origin; later filings
				do not provide any information about the proportion of suppliers reporting.
				As companies struggle to account for the origin of their coltan, fighting over the
				valuable deposits in North Kivu continues: the Rwanda-affiliated M23 rebel group
				siezed control of Rubaya in May of 2024 and continues to threaten the nearby provincial
				capital of Goma
				<Citation {bib} citekey="Malkia and Banchereau2024">
					(Malkia and Banchereau 2024).
				</Citation>
			</Exhibit>
		</ExhibitCarousel>
		{/if}
	</div>
</div>
