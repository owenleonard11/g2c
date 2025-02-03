<script lang="ts">
    import { writable, type Writable } from "svelte/store";

    enum xDirection { Auto, Left, Center, Right }
    enum yDirection { Auto, Up, Middle, Down }

    export let citation: string[]    = [];
    export let xDir:    xDirection = xDirection.Center;
    export let yDir:    yDirection = yDirection.Auto;

    let showCitation = false;

    let windowWidth: number;
    let windowHeight: number;
    let citationWidth: number;
    let citationHeight: number;
    let anchor: HTMLAnchorElement;

    let positionStyle: Writable<string> = writable("")
    const calcPosStyle = (x: number, y: number) => {
        // calculate direction
        let useXDir: xDirection = xDir;
        let useYDir: yDirection = yDir;

        // check distance to left
        if (useXDir == xDirection.Left && x - citationWidth < 0.45 * windowHeight) {
            useXDir = xDirection.Center;
        }
        if (useXDir == xDirection.Center && x - citationWidth / 2 < 0.45 * windowHeight) {
            useXDir = xDirection.Right;
        }

        // check distance to right
        if (useXDir == xDirection.Right && x + citationWidth > windowWidth) {
            useXDir = xDirection.Center;
        }
        if (useXDir == xDirection.Center && x + citationWidth / 2 > windowWidth) {
            useXDir = xDirection.Left;
        }

        // check distance to top
        if (useYDir == yDirection.Up && y - citationHeight < 0) {
            useYDir = yDirection.Middle;
        }
        if (useYDir == yDirection.Middle && y - citationHeight / 2 < 0) {
            useYDir = yDirection.Down;
        }

        // check distance to bottom
        if (useYDir == yDirection.Down && y + citationHeight > windowHeight) {
            useYDir = yDirection.Middle;
        }
        if (useYDir == yDirection.Middle && y + citationHeight / 2 > windowHeight) {
            useYDir = yDirection.Up;
        }

        // set auto directions
        if (useXDir == xDirection.Auto) {
            useXDir = x >= (windowWidth / 2) ? xDirection.Left : xDirection.Right;
        }
        if (useYDir == yDirection.Auto) {
            useYDir = y >= (windowHeight / 2) ? yDirection.Up : yDirection.Down;
        }

        // calculate position
        let xPos:   string = `left:${x}px`;
        let yPos:   string = `top:${y}px`;
        let xTrans: string = '';
        let yTrans: string = '';

        switch (useXDir) {
            case xDirection.Right:  xTrans = '0';    break;
            case xDirection.Center: xTrans = '-50';  break;
            case xDirection.Left:   xTrans = '-100'; break;
        }
        switch (useYDir) {
            case yDirection.Down:   yTrans = '0';    break;
            case yDirection.Middle: yTrans = '-50';  break;
            case yDirection.Up:     yTrans = '-100'; break;
        }

        positionStyle.set(`${xPos};${yPos};transform:translate(${xTrans}%, ${yTrans}%)`);
    }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}/>

<a 
    class="bg-[#9cbeaf] rounded-md px-1" href={citation[1]} target="_blank"
    bind:this={anchor}
    on:focusin={ () => { let rect = anchor.getBoundingClientRect(); calcPosStyle(rect.x, rect.y); showCitation = true }}
    on:focusout={() => { showCitation = false }}
    on:mouseenter={(e) => { calcPosStyle(e.clientX, e.clientY); showCitation = true;}}
    on:mouseleave={() => { showCitation = false }}
>
    <slot />
</a>

<div bind:clientWidth={citationWidth} bind:clientHeight={citationHeight}
    style="{$positionStyle}; opacity: {showCitation ? 1 : 0}; pointer-events: {showCitation? 'auto' : 'none'}"
    class="bg-[#9cbeaf] absolute top-0 text-xs lg:text-sm p-2 w-[24dvw] text-left"
>     
    {@html citation[0]}
</div>