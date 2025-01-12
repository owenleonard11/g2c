<script lang="ts">
    enum xDirection { Auto, Left, Center, Right }
    enum yDirection { Auto, Up, Middle, Down }

    export let citation: string    = '';
    export let xDir:    xDirection = xDirection.Center;
    export let yDir:    yDirection = yDirection.Auto;

    let showCitation = false;
    let citationUrl = '';

    let windowWidth: number;
    let windowHeight: number;

    let positionStyle: string = ""
    const calcPosStyle = (x: number, y: number) => {
        // calculate direction
        let useXDir: xDirection = xDir;
        let useYDir: yDirection = yDir;
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

        return `${xPos};${yPos};transform:translate(${xTrans}%, ${yTrans}%)`;
    }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div
    class="{showCitation ? "" : "hidden"} bg-[#9cbeaf] absolute top-0 p-2 text-sm w-[24dvw] text-left"
    style="{positionStyle}"
>     
    {@html citation}
</div>

<a 
    class="bg-[#9cbeaf] rounded-md px-1" href={citationUrl} target="_blank"
    on:mouseenter={(e) => { showCitation = true; positionStyle = calcPosStyle(e.clientX, e.clientY)}}
    on:mouseleave={() => { showCitation = false }}
>
    <slot />
</a>

