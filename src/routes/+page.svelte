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
			<LayerSummary heading="Welcome to G2C, a gallery of AI infrastructure.">
				<SummaryParagraph>
					Ground to Cloud (G2C) brings together scholarly research and investigative journalism on the vast array of infrastructure that supports contemporary artificial intelligence, with a focus on specific sites and forms of labor. Each of the six layers on the left collects examples of the material configurations that underlie the supposedly immaterial cloud, often involving very real extraction and exploitation. From cobalt mining in the Congo to logjams in the Panama Canal to image labelling in Venezuela, these exhibits serve as a corrective to the sleek, futuristic, and conspicuously depeopled images of neatly arranged server racks that dominate the official imagery of AI.
				</SummaryParagraph>
				<SummaryParagraph>
					Another aim of G2C is to demonstrate the astonishing scale and breadth of AI systems. It is no accident that the writers cited throughout make liberal use of the term "planetary"—researchers have examined the "planetary extractive machine" 
					<Citation {bib} citekey="Labban2014">
						(Labban 2014),
					</Citation>
					"planetary-scale computation" 
					<Citation {bib} citekey="Bratton2015">
						(Bratton 2015),
					</Citation>
					"planetary labor markets" 
					<Citation {bib} citekey="Graham and Anwar2019">
						(Graham 2019),
					</Citation>
					and the "planetary costs of AI"
					<Citation {bib} citekey="Crawford2021">
						(Crawford 2021).
					</Citation>
					Artificial intelligence requires a truly earth-spanning infrastructure, one that collides and overlaps in different ways with older forms of power and sovereignty. My hope is that the exhibits here can offer a point of departure for exploring the kinds of site-specific interactions that result.
				</SummaryParagraph>
				<SummaryParagraph>
					Text <span class="px-1 rounded-md bg-[#9cbeaf]">highlighted in teal</span>
					indicates a citation; hover to preview and click to see complete bibliographic information on Zotero. 
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
				<SummaryParagraph>
					Even the most advanced models still require data to be manually classified and sorted, whether to build out training sets or to avoid generating harmful images and text. This labor-intensive process relies on further infrastructure to recruit and organize AI trainers: the underpaid and precarious workers who label millions of images for use by autonomous vehicles
					<Citation {bib} citekey="Schmidt2022">
						(Schmidt 2022)
					</Citation>
					or sift through violent content to improve social media moderation algorithms
					<Citation {bib} citekey="Roberts2021">
						(Roberts 2021).
					</Citation>
					Such "clickworkers," "crowdworkers," or "Mechanical Turks" are often intentionally made invisble by AI firms intent on presenting a high-tech, fully-automated image—a phenomenon that
					<Citation {bib} citekey="Taylor2018">
						Astra Taylor (2018)
					</Citation>
					has called "fauxtomation" and
					<Citation {bib} citekey="Sadowski2022">
						Jathan Sadowski (2022)
					</Citation>
					has called "Potemkin AI." 
				</SummaryParagraph>
				<SummaryParagraph>
					Describing the new "planetary labor market" of digital microwork,
					<Citation {bib} citekey="Graham and Ferrari2022">
						Graham and Ferrari (2022)
					</Citation>
					note "the sobering reality of their [digital technologies'] reliance on the labor of distant workers"—an observation that could equally be applied to any layer of the AI stack. The lesson of the training layer is that no amount of infrastructure, even the earth-spanning network surveyed here, is sufficient to produce a meaningfully "artificial" intelligence. Human labor is involved, top-to-bottom: from cobalt mining to image classification, the raw materials of computational intelligence are produced by human workers at specific sites. The final step in the AI supply chain, the hand-labelling of training data, is no exception.
				</SummaryParagraph>
			</LayerSummary>
			{:else if layer == Layer.Compute}
			<LayerSummary heading="Layer 5: Computation">
				<SummaryParagraph>
					Training modern AI systems requires lots of data and lots of computation—reflecting a dominant, though flawed, belief that "bigger is better"
					<Citation {bib} citekey="Dobbe and Whittaker2019">
						(Dobbe and Whittaker 2019).
					</Citation>
					One of the first efforts to footprint the energy use of contemporary architectures was undertaken by
					<Citation {bib} citekey="Strubell et al.2020">
						Strubell et al. 2020,
					</Citation>
					who concluded that compute and energy requirements for the largest models were far outpacing hardware improvements. Generative models designed to respond dynamically to user prompts are even more resource-intensive to train.
					<Citation {bib} citekey="Luccioni et al.2024">
						Luccioni et al. (2024)
					</Citation>
					have shown that the shift towards general-purpose rather than task-specific models has incurred exponentially higher energy costs. While
					<Citation {bib} citekey="MIT Technology Review Insights2023">
						MIT Technology Review Insights (2023)
					</Citation>
					notes that "efficiency gains have moderated the increase" in computational energy use, the inverse is equally true: resource-hungry AI models have effectively reversed the energy savings promised by more efficient processors.
				</SummaryParagraph>
				<SummaryParagraph>
					Although the nature of cloud computing makes it difficult to say exactly <em>where</em> AI models are trained, large-scale commercial models likely distribute their computation requirements across data centers and specialized supercomputers owned by cloud providers like Microsoft, Google, and Meta
					<Citation {bib} citekey="Bobrowsky and Berber2024">
						(Bobrowsky and Berber 2024).
					</Citation>
					Comparing these sites to those of the Extract and Produce layers illustrates the differential economic incentives that guide infrastructural development. Mining and fabrication facilities are located to take advantage of lax environmental and labor protections, often in the Global South, whereas compute facilities are located to take advantage of cheap energy and high-speed fiber availability, often in Scandinavia and the United States
					<Citation {bib} citekey="Velkova2024">
						(Velkova 2024).
					</Citation>
					While the former takes advantage of infrastructural instability in the form regulatory vacuums that allow harmful but profitable practices to flourish, the latter takes advantage of infrastructural stability that ensures reliable access to electricity and communications networks.
				</SummaryParagraph>
			</LayerSummary>

			{:else if layer == Layer.Connect}
			<LayerSummary heading="Layer 4: Connection">
				<SummaryParagraph>
					Parallel to the global shipping lanes used to transport the solid materials of AI systems, planetary-scale computation requires an equally global infrastructure for the transmission of data. Text and images are scraped from across the world wide web (see
					<Citation {bib} citekey="Crawford and Paglen2019">
						Crawford and Paglen 2019),
					</Citation>
					collected and centralized for model training, then disseminated again to end users through various APIs and interfaces. This network of transmission relies on a physical subtrate that is no less material than cargo ships and canals. "Place, proximity, and positionalities will never be fully transcended," write
					<Citation {bib} citekey="Graham and Ferrari2022">
						Mark Graham and Fabian Ferrari (2022).
					</Citation>
					"Even digital data must be transmitted over physical infrastructure and will reside in a physical server, which will sit in a particular place and jurisdiction." With next-generation models demanding wider sourcing of data
					<Citation {bib} citekey="Muennighoff et al.2023">
						(Muennighoff et al. 2023),
					</Citation>
					the infrastructural politics of connectivity have become inseparable from the development of artificial intelligence.
				</SummaryParagraph>
				<SummaryParagraph>
					As scholars of media infrastructure have noted, these politics are often marked by inequality. So-called "dark fiber" networks run through rural neighborhoods without offering access to residents 
					<Citation {bib} citekey="Halegoua2016">
						(Halegoua 2016),
					</Citation>
					and Norwegian towns remain cut off from high-speed internet even as nearby "hyperscale" data centers send and receive huge amounts of information
					<Citation {bib} citekey="Mayer and Velkova2023">
						(Mayer and Velkova 2023).
					</Citation>
					<Citation {bib} citekey="Holt2024">
						Jennifer Holt (2024)
					</Citation>
					notes the absence of universal service mandates for broadband in the United States—a policy choice that, together with the ephemeral, high-speed nature of data transmission, allows communications networks to bypass populations considered unprofitable or undeserving. Such populations are then excluded both from the development of AI, since they are underrepresented in training data, and from its possible benefits, since they lack access to digital delivery mechanisms.
				</SummaryParagraph>
			</LayerSummary>
			{:else if layer == Layer.Transport}
			<LayerSummary heading="Layer 3: Transportation">
				<SummaryParagraph>
					For minerals extracted in the Congo to be assembled into processors in Taiwan which are then installed in 
					Utah data centers, the supply chains of AI require a massive global network of logistics and distribution.
					Dimerco, a Taiwanese freight company, claims that semiconductor components travel up to 25,000 miles and
					cross up to 70 international borders before integration into a finished product
					<Citation {bib} citekey="SemiconductorSupply2022">
						(Dimerco 2022).
					</Citation>
					Further transportation is then required to deliver finished microelectronics to end users.
					Although chips are themselves relatively lightweight, the sheer diffusion of their raw materials
					engenders a heavy reliance on overseas shipping—an industry whose carbon footprint is growing rapidly
					due to the difficulty of regulating emissions in high seas regions
					<Citation {bib} citekey="Li et al.2023">
						(Li et al. 2023).
					</Citation> 
				</SummaryParagraph>
				<SummaryParagraph>
					Global shipping networks obviously predate contemporary compu&shy;tational techniques, and in some ways even prefigure 
					the planetary megamachine of artificial intelligence. Kate Crawford writes that the modern logistics industry
					"made it possible to envision and model the planet as a single massive factory" and observes that the standardized
					cargo container is not unlike the data packets discussed in the "Connect" layer
					<Citation {bib} citekey="Crawford2021">
						(Crawford 2021).
					</Citation>
					As with other AI infrastructures, the materiality of logistics networks is often effaced by the illusory 
					convenience of consumer products like Amazon Prime—leading Rose George to term shipping "the invisible industry" in
					<Citation {bib} citekey="George2013">
						her 2013 book.
					</Citation>
					Invisible or not, transportation of solid physical objects is a critical—if often overlooked—component of 
					modern AI systems.
				</SummaryParagraph>
			</LayerSummary>
			{:else if layer == Layer.Produce}
			<LayerSummary heading="Layer 2: Production">
				<SummaryParagraph>
					<Citation {bib} citekey="Bratton2015">
						Benjamin Bratton (2015)
					</Citation>
					writes that planetary computational infrastructure "terraforms the host planet by drinking and vomiting its elemental juices and spitting up mobile phones." Replace mobile phones with GPUs, and the same can be said of the AI industry—from lakes of toxic sludge in China to massively polluted Superfund sites in California, Bratton's imagery seems quite appropriate to the foundries and factories profiled here. Refining minerals and assembling devices also requires massive expenditure of energy and labor.
					<Citation {bib} citekey="Gupta et al.2021">
						Gupta et al. (2021)
					</Citation>
					report that hardware manufacturing is the largest contributor to computation-related carbon emissions. 
				</SummaryParagraph>
				<SummaryParagraph>
					The recent AI boom has affected the production layer mostly by driving demand for integrated circuits (ICs), also called microchips. Labor in the IC sector is distributed unevenly; the so-called "fabless-foundry" model
					<Citation {bib} citekey="Chatterjee et al.1999">
						(Chatterjee et al. 1999),
					</Citation>
					in which the companies that design and sell chips outsource their actual production, has resulted in a market dominated by "fabless" firms based mostly in the U.S. and "foundry" firms based mostly in Southeast Asia
					<Citation {bib} citekey="Ren et al.2023">
						(Ren et al. 2023).
					</Citation>
					Such partnerships, which direct profit towards designers and environmental damage towards producers, are responsible for much of the recent revenue growth in the semiconductor industry 
					<Citation {bib} citekey="Hung et al.2017">
						(Hung et al. 2017).
					</Citation>
					While these disproportionate effects have long been acknowledged
					<Citation {bib} citekey="Williams et al.2002">
						(Williams et al. 2002,
					</Citation>
					<Citation {bib} citekey="Sonnenfeld et al.2006">
						Sonnenfeld et al. 2006),
					</Citation>
					the length of supply chains and the lack of transparent climate reporting by tech companies makes the true scale of the problem difficult to assess
					<Citation {bib} citekey="Dobbe and Whittaker2019">
						(Dobbe and Whittaker 2019).
					</Citation>
					Fast-moving development of larger AI models demands immediate availability of chips, leaving little time to redress inequalities and injustices in the production stack.
				</SummaryParagraph>
			</LayerSummary>
			{:else if layer == Layer.Extract}
			<LayerSummary heading="Layer 1: Extraction">
				<SummaryParagraph>
					Artificial intelligence begins with what Marzen Labban (2014) 
					<Citation {bib} citekey="Labban2014">
						Marzen Labban (2014)
					</Citation>
					calls the "planetary extractive machine": the globe-spanning collection of mining operations that provide the raw materials for the manufacture of chips, boards, batteries, and other components. Despite abstract, ethereal imagery of "cloud architectures" and "wireless communications," 
					<Citation {bib} citekey="Hogan and Lepage-Richter2024">
						Hogan and Lepage-Richer (2024)
					</Citation>
					Hogan and Lepage-Richer (2024) remind us that AI "is ultimately a resource-heavy technology reliant on large-scale computing infrastructures." Increasing demand for the latest products and ever-shorter obsolescence cycles have driven the extractive machine into overdrive, as minerals that take millions of years to form are dug up to meet demand that increases daily. "From the perspective of deep time," 
					<Citation {bib} citekey="Crawford2021">
						Kate Crawford (2021)
					</Citation> 
					writes, "we are extracting Earth's geological history to serve a split-second of contemporary technological time."
				</SummaryParagraph>
				<SummaryParagraph>
					AI training drives mineral extraction primarily through its reliance on specialized computer chips like Graphics Processing Units (GPUs), Field-Programmable Gate Arrays (FGPAs), and Application-Specific Integrated Circuits (ASICs), which rely in turn on semiconductors made from a wide array of metals and other elements. 
					<Citation {bib} citekey="Khan et al.2021">
						A 2021 report on the semiconductor supply chain
					</Citation>
					shows that while the United States and Western Europe dominate semiconductor device design, the actual extraction of the necessary raw materias—and therefore the environmental and health impacts of mining—are heavily concentrated in China and the Global South. From coltan in the Congo to tin in Indonesia, the exhibits on the right represent only a few of the many sites at which this disparity is realized. 
				</SummaryParagraph>
			</LayerSummary>
			{/if}
		</div>
	</div>

	<div class="h-lvh w-full animate-exhibit-bg-{LAYER_NAMES[layer]}">
		{#if layer == Layer.Home}
		<div class="h-[92dvh] my-[4dvh]">
			<div class="max-h-[82.8dvh] mx-8">
				<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
					{#await import(`$lib/images/exhibits/banners/earth.png`) then { default: src }}
						<img {src} alt="hello" class="h-auto w-full rounded-t-md"/>
					{/await} 
					<div class="p-4 bg-[#dcd6cc] rounded-b-md">
						<div class="xl:text-lg max-h-full">
							Each site is accompanied by a satellite image, courtesy of Google Earth. 
							Select a layer on the left to start exploring the infrastructures of AI.
						</div>
					</div>
				</div>
			</div>
		</div>
		{:else if layer == Layer.Train}
		<div class="h-[92dvh] my-[4dvh]">
			<div class="max-h-[82.8dvh] mx-8">
				<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
					{#await import(`$lib/images/exhibits/banners/earth.png`) then { default: src }}
						<img {src} alt="hello" class="h-auto w-full rounded-t-md"/>
					{/await} 
					<div class="p-4 bg-[#dcd6cc] rounded-b-md">
						<div class="xl:text-lg max-h-full">
							Exhibits coming soon.
						</div>
					</div>
				</div>
			</div>
		</div>
		{:else if layer == Layer.Compute}
		<div class="h-[92dvh] my-[4dvh]">
			<div class="max-h-[82.8dvh] mx-8">
				<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
					{#await import(`$lib/images/exhibits/banners/earth.png`) then { default: src }}
						<img {src} alt="hello" class="h-auto w-full rounded-t-md"/>
					{/await} 
					<div class="p-4 bg-[#dcd6cc] rounded-b-md">
						<div class="xl:text-lg max-h-full">
							Exhibits coming soon.
						</div>
					</div>
				</div>
			</div>
		</div>
		{:else if layer == Layer.Connect}
		<div class="h-[92dvh] my-[4dvh]">
			<div class="max-h-[82.8dvh] mx-8">
				<div class="text-black snap-center min-w-full max-h-[90%] overflow-y-auto">
					{#await import(`$lib/images/exhibits/banners/earth.png`) then { default: src }}
						<img {src} alt="hello" class="h-auto w-full rounded-t-md"/>
					{/await} 
					<div class="p-4 bg-[#dcd6cc] rounded-b-md">
						<div class="xl:text-lg max-h-full">
							Exhibits coming soon.
						</div>
					</div>
				</div>
			</div>
		</div>
		{:else if layer == Layer.Transport}
		<ExhibitCarousel exhibits={exhibits['transport']}>
			<Exhibit exhibit={exhibits['transport'][0]}>
				Because of its proximity to the Nanzi Export Processing Zone, home to several important semiconductor foundries, the Port of Kaohsung is a major hub for the distribution of the microchips that are eventually used to train AI systems. In 2020,
				<Citation {bib} citekey="Yang and Ge2020">
					an investigation by Taiwanese and Chinese researchers
				</Citation>
				found that harbor operations at Kaohsiung are threatened by rising sea levels and more intense typhoon seasons associated with climate change. Benjamin Bratton 
				<Citation {bib} citekey="Bratton2015">
					Benjamin Bratton (2015)
				</Citation>
				has described this as the "ouroboural" nature of planetary-scale computation: like the snake eating its own tail, the climate impact of AI endangers the very infrastructure that makes it possible. Bratton warns that AI is locked in a "race against its own physics" as promises to help mitigate global warming
				<Citation {bib} citekey="Zehner and Ullrich2024">
					(Zehner and Ullrich 2024)
				</Citation>
				compete with the massive energy requirements of fabrication and computation
				<Citation {bib} citekey="CleanClicks2024">
					(Stand.earth 2024).
				</Citation>
				Whether or not AI can deliver on these promises might depend on the fate of vulnerable infrastructure like the Port of Kaohsiung.
			</Exhibit>
			<Exhibit exhibit={exhibits['transport'][1]}>
				Although the Panama Canal might seem somewhat out of place in a gallery of AI infrastructure, the importance of transpacific shipping to global technology supply chains has carved out a key role for the century-old waterway. The Panama Canal handles almost half of all container traffic between the Eastern United States and Northeast Asia
				<Citation {bib} citekey="Rojanasakul2024">
					(Rojanasakul 2024),
				</Citation>
				including imports and exports of critical AI materials. Electronics-grade silicon manufactured near Mobile, Alabama
				<Citation {bib} citekey="Koerner2017">
					(Koerner 2017)
				</Citation>
				is shipped to manufacturers in China, Vietnam, and Taiwan
				<Citation {bib} citekey="Silicon,>99.99%">
					(OEC).
				</Citation>
				Finished processors are then shipped back to the U.S., many of them destined for use in East Coast data centers. Without the continued flow of container ships through the canal, this bidirectional trade would be prohibitively slow and expensive. After a drought in early 2024 forced authorities to limit passages, consultants at
				<Citation {bib} citekey="FourKey2024">
					Gallagher (2024)
				</Citation>
				identified water levels in the Panama canal as a major threat to global semiconductor supply chains. As one of the oldest sites presented here, the history of the canal might offer some insight into the futures of other AI infrastructures—which are likely to involve similar conflicts over colonial power, labor abuses, and displacement of local populations. Much of the canal's complex history is recounted capably by Ashley Carse in
				<Citation {bib} citekey="Carse2014">
					her 2014 book <em>Beyond the Big Ditch</em>.
				</Citation>
			</Exhibit>
			<Exhibit exhibit={exhibits['transport'][2]}>
				With the possibility of an AI-driven chip shortage looming
				<Citation {bib} citekey="Hanbury et al.2024">
					(Habury et al. 2024),
				</Citation>
				the scramble for processors has sometimes displaced slower overseas and overland shipping in favor of air transport. As reported by logistics industry publication <em>The Loadstar</em>, semiconductors alone account for 65% of airfreight volume from Taiwan—with nearly half a million tons of semiconductor cargo leaving Taoyuan in just the first three months of 2024
				<Citation {bib} citekey="Goldstone2024">
					(Goldstone 2024).
				</Citation>
				Major logistics firms, including
				<Citation {bib} citekey="Taiwan'sStrategic2024">
					Dimerco (2024)
				</Citation>
				and
				<Citation {bib} citekey="DHLSupply2022">
					DHL (2022),
				</Citation>
				have established large-scale operations at Taoyuan. Given the vulnerability of maritime shipping infrastructures to climate change (see Port of Koahsiung and the Panama Canal) and geopolitical instability (see e.g.
				<Citation {bib} citekey="Mills2024">
					Mills 2024),
				</Citation>
				airfreight will likely play an even larger role in the future of artificial intelligence—despite its much higher carbon emissions when compared to other modes of transportation
				<Citation {bib} citekey="Kleijn et al.2021">
					(Kleijn et al. 2021).
				</Citation>
			</Exhibit>
		</ExhibitCarousel>
		{:else if layer == Layer.Produce}
		<ExhibitCarousel exhibits={exhibits['produce']}>
			<Exhibit exhibit={exhibits['produce'][0]}>
				Rare Earth Elements (REEs) are key materials in the semiconductors that power AI training. Although found across the world, refining REEs into usable materials require a process of dissolution in acid baths that "yields reservoirs of poisonous waste"
				<Citation {bib} citekey="Crawford2021">
					(Crawford 2021).
				</Citation>
				Ore from the mining complex undergoes hydrometallurgical leaching in the nearby city of Baotou, where waste flows into a nearly four-square-mile artificial lake "filled with a black, barely-liquid, toxic sludge" 
				<Citation {bib} citekey="Maughan2015">
					(Maughan 2015).
				</Citation>
				Investigations into pollution at and around Bayan Obo have found high concentrations of heavy metals in soil
				<Citation {bib} citekey="Pan and Li2016">
					an investigation into soil pollution
				</Citation>
				and dangerous levels of atmospheric thorium
				<Citation {bib} citekey="Wang et al.2016">
					Another 2016 survey
				</Citation>
				With REE demand slated to increase up to sevenfold by 2040
				<Citation {bib} citekey="Fatunde2024">
					(Fatunde 2024),
				</Citation>
				production—and pollution—at Bayan Obo is likely to ramp up in the coming years. Uncertainy about the future of trade relations with China, however, has led the U.S. to explore options for domestic REE sourcing. 
				<Citation {bib} citekey="DoDAwards2022">
					The Department of Defense (2022)
				</Citation>
				recently awarded $35 million to MP Materials for a processing facility at the Mountain Pass mine in Southern California—a site with its own history of environmental abuse
				<Citation {bib} citekey="Margonelli2009">
					(Margonelli 2009).
				</Citation>
			</Exhibit>
			<Exhibit exhibit={exhibits['produce'][1]}>
				Taiwan Semiconductor Manufacturing Company (TSMC) is by far the largest semiconductor foundry in the world, and its headquarters in Hsinchu is possibly the most important single site for global chip manufacturing. As Charlie Campbell
				<Citation {bib} citekey="Campbell2021">
					Charlie Campbell (2021)
				</Citation>
				writes, "TSMC's dominance is such that its chief rivals are not companies but governments"—as evidenced by massive state funding initiatives for semiconductor production across the globe
				<Citation {bib} citekey="Goldberg et al.2024">
					(Goldberg et al. 2024).
				</Citation>
				Recent demand for GPUs has only bolstered this dominance, with TSMC executives crediting revenue from AI-related processors for massive 2024 profits
				<Citation {bib} citekey="Jie and Qin2024">
					(Jie and Qin 2024).
				</Citation>
				TSMC has used its considerable economic power to influence provision of utilities, particularly water. During a 2021 drought, the Hsinchu facility continued to churn through 63,000 tons of water a day even as authorities shut off irrigation to nearby farmland
				<Citation {bib} citekey="Zhong and Chien2021">
					(Zhong and Chien 2021).
				</Citation>
				<Citation {bib} citekey="Lee et al.2024">
					A 2024 assessment of climate impact
				</Citation>
				conducted by Taiwanese researchers in 2024 predicts that global warming will contribute to further insecurity in the water supply to Hsinchu—and thus to further conflict between global semiconductor demand and local resource concerns.
			</Exhibit>
			<Exhibit exhibit={exhibits['produce'][2]}>
				Intended largely to maintain competitiveness in artificial intelligence by protecting against Chinese supply chain dominance, the
				<Citation {bib} citekey="FACTSHEET:2022">
					2022 CHIPS and Science Act
				</Citation>
				promised $52.7 billion in funding for domestic chip production in the United States. Intel, one of the largest beneficiaries, recently announced a massive $20 billion expansion to their Ocotillo manufacturing campus 
				<Citation {bib} citekey="Leggate2024">
					(Leggate 2024).
				</Citation>
				Although significant improvements to recycling techniques have lessened the strain on local water supplies
				<Citation {bib} citekey="Meese et al.2022">
					(Meese et al. 2024),
				</Citation>
				concerns remain about the resource demands of semiconductor fabrication in Arizona given the state's reliance on the drought-sensitive Colorado River
				<Citation {bib} citekey="Wong2024">
					(Wong 2024).
				</Citation>
				In response to the construction and expansion of facilities like Ocotillo, a group of labor unions and NGOs has formed
				<Citation {bib} citekey="Buildinga">
					CHIPS Communities United.
				</Citation>
				The coalition advocates for responsible labor and environmental practices, pointing to the toxic legacy of earlier U.S. semiconductor plants in Santa Clara County, California—which led to birth defects among workers' children and left groundwater contaminated for decades
				<Citation {bib} citekey="Calma2023">
					(Calma 2023).
				</Citation>
				As of 2018, Silicon Valley still had the highest concentration of EPA-designated Superfund cites in the U.S. 
				<Citation {bib} citekey="Nieves2018">
					(Nieves 2018).
				</Citation>
			</Exhibit>
		</ExhibitCarousel>
		{:else if layer == Layer.Extract}
		<ExhibitCarousel exhibits={exhibits['extract']}>
			<Exhibit exhibit={exhibits['extract'][0]}>
				Because of its higher resistivity at small dimensions, cobalt powers AI computing by allowing
				for the manufacture of faster, smaller integrated circuits
				<Citation {bib} citekey="Bakke2018">
					(Bakke 2018).
				</Citation>
				Rising global demand intersects with urban precarity in the Congolesse city of Kolwezi, where cobalt-mining pits have "swallowed" entire neighborhoods
				<Citation {bib} citekey="Beaule2023">
					(Beaule 2023).
				</Citation>
				In a chapter of her 
				<Citation {bib} citekey="Kara2023">
					her 2023 book <i>Cobalt Red</i>
				</Citation> 
				Siddarth Kara reports extremely hazardous conditions in and around Kolwezi. Miners, some of them children, spend twelve hours or longer in dimly-lit hand-dug tunnels at constant risk of collapse. Attempts by the Congolese government to formalize and regulate cobalt mining have proceeded only haltingly, frustrated by corruption and instability.
				<Citation {bib} citekey="Umpula et al.2021">
					A 2021 report 
				</Citation>
				by the International Institute for Environment Development in collaboration with African Resources Watch, along with
				<Citation {bib} citekey="Umpula and Bisil2023">
					a 2023 follow-up
				</Citation>
				found that reform attempts often have little effect beyond empowering smugglers. As demand for cobalt continues to grow, so will the profits of predatory middlemen and grey-market traders in places like Kolwezi—to the detriment of local populations, who rarely benefit from their land's enormous mineral wealth.
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][1]}>
				Since the move away from lead-based solders in the early 2000s, tin-based alloys have become the solder of choice in electronics manufacturing
				<Citation {bib} citekey="Moshrefi-Torbati and Swingler2011">
					(Moshrefi-Torbati and Swingler 2011).
				</Citation>
				An MIT study comissioned by the 
				<Citation {bib} citekey="Latham2018">
					Rio Tinto mining group in 2018 
				</Citation>
				predicted that tin would be the metal most affected by new technologies, with high-performance computing representing the largest demand sector. Following this demand, international mining interests have converged on sites like Bisie in the DRC's North Kivu province—one of the world's largest deposits of cassiterite, a valuable tin-containing ore. Although the jungle hides much of the operation, the patchwork of mostly hand-dug pits has seen military skirmishes, labor riots, and international boycotts over accusations of child trafficking and slavery
				<Citation {bib} citekey="Rudahigwa2010">
					(Rudahigwa 2010,
				</Citation>
				<Citation {bib} citekey="Wimmer and Hilgert2011">
					Wimmer and Hilgert 2011,
				</Citation>
				<Citation {bib} citekey="Witley and Heins2014">
					Witley and Heins 2014).
				</Citation>
				The acquisition of the Bisie mine by Canadian conglomerate Alphamin has led to violent clashes between corporate personnel and artisinal miners, a theme of mineral rights disputes throughout the DRC
				<Citation {bib} citekey="Huggins2023">
					(Huggins 2023).
				</Citation>
				Although foreign corporations promise to industrialize and formalize the mining process, locals worry that their involvement will do little to ameliorate the infrastructural and regulatory failures that created the conditions for exploitation at Bisie and elsewhere.
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][2]}>
				Besides the Bisie Deposit, another major source of tin is Indonesia's Bangka island—where the metal is extracted on behalf of the national tin corporation PT Timah and supplied via various solder manufacturers to Foxconn, whose partnerships with major device manufacturers including Apple and NVIDIA are well-documented 
				<Citation {bib} citekey="Simpson2012">
					(Simpson 2012).
				</Citation>
				As in the Congo, tin extraction in Indonesia is dominated by minimally regulated artisinal mining. Workers dredge for ore off the coast or risk being buried by landslides in the huge mining pits visible in turquoise in the satellite image
				<Citation {bib} citekey="Hodal2012">
					(Hodal 2012).
				</Citation>
				Tin extracted under these dangerous conditions passes through a "shadow network" of distributors that "hides behind official companies"
				<Citation {bib} citekey="Nugraha and Purwanto2020">
					(Nugraha and Purwanto 2020).
				</Citation>
				Despite efforts by electronics manufacturers and NGOs to promote fair labor practices and supply chain accountability, including the establishment of the Tin Working Group in 2014, 
				<Citation {bib} citekey="Diprose et al.2022">
					Diprose et al. (2022)
				</Citation>
				conclude that such interventions "make small contributions to narrowly defined regulatory 'problems,' while failing to curtail patterns of environmental and social harm." 
			</Exhibit>
			<Exhibit exhibit={exhibits['extract'][3]}>
				Tantalum, an element used in the electrolytic capacitors that are crucial for microelectronics production, is derived almost exclusively from coltan ore mined in the DRC
				<Citation {bib} citekey="Taffel2015">
					(Taffel 2015).
				</Citation>
				The Bibatama Mining Concession at Rubaya is one of many sites where coltan is illegally extracted and laundered into the global supply chain. Multinational mining groups surreptitiously purchase and fraudulently certify illegal coltan, meaning that "end users cannot be certain about the origins of the tantalum elements in their electronic devices"
				<Citation {bib} citekey="Ojewale2022">
					(Ojewale 2022).
				</Citation>
				This uncertainty is often reflected in statements by AI device manufacturers. NVIDIA, the world's largest supplier of GPUs, claimed in
				<Citation {bib} citekey="NVIDIA Corporation2023">
					its 2023 Conflict Minerals Report
				</Citation>  
				that 97% of processing facilities in its supply chain were compliant with the Responsible Minerals Assurance Process—but the report includes only the information disclosed by direct suppliers.
				<Citation {bib} citekey="NVIDIA Corporation2014">
					An earlier SEC filing
				</Citation>
				shows that a majority of suppliers reported unknown countries of origin; since 2014, NVIDIA has not provided any information about the proportion of suppliers reporting. As reporting in
				<Citation {bib} citekey="Whyit’s2021">
					(<i>The Economist</i> 2021).
				</Citation>
				notes, difficulties in regulating coltan mining are worsened by long-standing issues like the lack of consistent transportation and communication infrastructure in many parts of the DRC. Such difficulties are further exacerbated by frequent military conflict. In May of 2024, the Rwanda-afilliated M23 rebel group siezed control of Rubaya and threatens the rest of the mineral-rich North Kivu province—promising further opacity in coltan sourcing, considering Rwanda's role in smuggling and exporting
				<Citation {bib} citekey="Malkia and Banchereau2024">
					(Malkia and Banchereau 2024).
				</Citation>
			</Exhibit>
		</ExhibitCarousel>
		{/if}
	</div>
</div>
