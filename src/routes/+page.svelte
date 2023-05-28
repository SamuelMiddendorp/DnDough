<script lang="ts">
    import Die from "$lib/components/Die.svelte";
    import UtilPanel from "$lib/components/UtilPanel.svelte";

    import { getDiceString, getDieTemplate } from "$lib/utils";
    import { playDiceSound } from "../stores/audioStore";
    import { muteAudio, rollOnTemplate } from "../stores/preferenceStore";

    let currentDieId = 0;
    let mute = true;
    let autoRoll = false;
    rollOnTemplate.subscribe(x => autoRoll = x);
    muteAudio.subscribe(x => mute = x);
    interface Die {
        id: number;
        type: number;
        currentValue: number;
        roll: (playSound: boolean) => void;
    }
    let dieTypes: number[] = [4, 6, 8, 10, 12, 20];
    let totalValue: number = 0;
    let diceTemplate = "";
    let dice: Die[] = [];
    const rollAll = () => {
        if (dice.length > 0) {
            if (dice.length == 1) {
                dice.forEach((die) => die.roll(true));
                return;
            }
            if (!mute) {
                console.log("Foobar");
                playDiceSound();
            }
            dice.forEach((die) => die.roll(false));
        }
    };
    const loadTemplate = () => {
        let template = getDieTemplate();

        template.forEach((die) => {
            for (var i = 0; i < die.count; i++) {
                if (dieTypes.includes(die.type)) {
                    dice = [
                        ...dice,
                        {
                            id: currentDieId++,
                            type: die.type,
                            currentValue: 0,
                            roll: () => {},
                        },
                    ];
                }
            }
        });
        // Bit of an evil fix but dice need to have a change
        // to be bound and implemented by their component
        if(autoRoll){
            setTimeout(() => rollAll(), 40);
        }
    };
    // We want to know if values are supplied
    if (window.location.href.split("/?").length > 1) {
        loadTemplate();
    }
    const addDie = (dieType: number) => {
        dice = [
            ...dice,
            {
                id: currentDieId++,
                type: dieType,
                currentValue: 0,
                roll: () => {},
            },
        ];
    };
    const removeDie = (dieId: number) => {
        dice = dice.filter((d) => d.id != dieId);
    };
    $: {
        let value = 0;
        dice.forEach((die) => {
            value = value + die.currentValue;
        });
        totalValue = value;
        diceTemplate = generateDieTemplate(dice.map(x => x.type));

    }
    const generateDieTemplate = (dice: number[]) : string => {
        
        return getDiceString(dice);

    }
    const copyToClipboard = () => {
        // only works on https
        navigator.clipboard.writeText(diceTemplate);
    }
</script>

<body>
    <main>
        <UtilPanel />
        <h1>DnDough</h1>
        <div class="dice">
            <div class="die-panel shadow">
                <h3>Add die:</h3>
                <div class="die-add">
                    {#each dieTypes as dieType}
                        <span
                            class="non-selectable"
                            on:click={() => addDie(dieType)}>{dieType}</span
                        >
                    {/each}
                </div>
            </div>
            <div class="dice-info shadow">
                <h3
                    class="non-selectable"
                    style="margin-bottom: 0.2rem;background-color: var(--statement-color); padding: 0.1rem; border-radius: 0.3rem; cursor: pointer"
                    on:click={() => rollAll()}
                >
                    Roll all dice
                </h3>
                <h3>Dice data:</h3>
                <h4>Total value: {totalValue}</h4>
                <h4>Die count: {dice.length}</h4>
                <h5 class="non-selectable" on:click={() => copyToClipboard()}>Copy current dice</h5>
            </div>
            {#each dice as die (die.id)}
                <Die bind:die removeDie={(die) => removeDie(die)} />
            {/each}
        </div>
    <footer><a href="https://samuelmiddendorp.com"><img src="/icons/owl_optimized.svg"/></a></footer>
    </main>
</body>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100;400&display=swap");
    :root {
        --background-color-dark: #060d0b;
        --panel-color-dark: #0c1a15;
        --text-color-dark: #e8e8e8;

        --background-color-light: #efefef;
        --panel-color-light: #e8e8e8;
        --text-color-light: #060d0b;

        --statement-color: #3d816c;
        --background-color: var(--background-color-light);
        --panel-color: var(--panel-color-light);
        --text-color: var(--text-color-light);
    }
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :global(.shadow) {
        box-shadow: 0 3px 10px var(--background-color);
    }
    :global(.non-selectable) {
        user-select: none;
    }
    :global(html){
        background-color: var(--background-color);
    }
    body {
        margin: 0;
        padding: 0;
    }
    main {
        color: var(--text-color);
        max-width: 1200px;
        width: 100%;
        min-height: 90vh;
        margin-right: auto;
        margin-left: auto;
        display: grid;
        justify-content: center;
        grid-template-rows: min-content min-content 1fr;
        grid-template-columns: 1fr;
        font-family: "Grenze Gotisch", cursive;
        font-weight: 400;
    }
    main h1 {
        margin-bottom: 1rem;
        margin-left: 1rem;
        font-size: 5rem;
        font-weight: 400;
    }
    footer{
        align-self: end;
        color: var(--text-color-dark);
        background-color: var(--statement-color);
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        display: grid;
        position: relative;
        width: 8rem;
        left: 0;
        height: 3rem;
        font-family: sans-serif;
        bottom: 0;
        padding: 0.4rem;
    }
    footer img{
        position: relative;
        display: inline-block;
        height: 100%;
        width: 100%;
    }
    .dice {
        margin-left: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: 1fr;
    }
    .dice-info {
        margin-bottom: 1rem;
        background-color: var(--panel-color);
        height: 10rem;
        max-width: 10rem;
        padding: 1rem;
        padding-top: 0.5rem;
        border-radius: 0.3rem;
    }
    .dice-info h4 {
        display: grid;
        place-content: center;
        padding: 0.1rem;
        border-radius: 0.3rem;
    }
    .dice-info h5{
        background-color: var(--statement-color);
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 0.3rem;
    }
    .die-panel {
        background-color: var(--panel-color);
        position: relative;
        max-height: 10rem;
        height: 10rem;
        width: 10rem;
        padding: 0.2rem;
        border-radius: 0.3rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: min-content;
    }
    .die-panel h3 {
        padding: 1rem;
    }
    .die-add {
        position: relative;
        border-radius: 0.3rem;
        display: grid;
        justify-items: center;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .die-add span {
        color: var(--text-color);
        cursor: pointer;
        display: grid;
        width: 2rem;
        border-radius: 0.3rem;
        height: 2rem;
        place-content: center;
        background-color: var(--statement-color);
    }
</style>
