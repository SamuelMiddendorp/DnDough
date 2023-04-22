<script lang="ts">
    import Die from "$lib/components/Die.svelte";


    interface Die{
        type: number,
        currentValue: number,
        sound: HTMLAudioElement;
        roll: () => void
    }
    let dieTypes: number[] = [4,6,8,10,12,20];

    let totalValue: number = 0;

    let dieSound = new Audio('/roll.wav');

    let dice: Die[] = [];
    const addDie = (dieType: number) => {
        dice = [...dice, {type: dieType, currentValue: 0, roll: () => {}, sound: dieSound}];
    }
    const removeDie = (die: Die) => {
        console.log("Foobar");
        dice = dice.filter(d => d != die);
    }
    const rollAll = () => {
        dice.forEach(die => die.roll());
    }
    $:{
        let value = 0;
        dice.forEach(die => {
            value = value + die.currentValue;
        })
        totalValue = value;
    }
</script>

<body>
    <main>
        <h1>DnDough</h1>
        <div class="dice">
                <h3 on:click={() => rollAll()}>Roll all dice</h3>
            <div class="die-add shadow">
                <h3>{totalValue}</h3>
                {#each dieTypes as dieType}
                <span on:click={() => addDie(dieType)}>{dieType}</span>
                {/each}
            </div>
            {#each dice as die}
            <Die removeDie={(die) => removeDie(die)} bind:die={die}/>
            {/each}
        </div>
    </main>
</body>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100;400&display=swap');
    :root {
        --statement-color: #3d816c;
        --background-color: #060D0B;
        --panel-color: #0C1A15;
        --text-color: #E8E8E8;
    }
    :global(*){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: var(--background-color);
    }
    :global(.shadow){
        box-shadow: 0 3px 10px rgb(0, 0, 0);
    }
    main {
        color: var(--text-color);
        max-width: 1200px;
        width: 100%;
        min-height: 100vh;
        margin-right: auto;
        margin-left: auto;
        display: grid;
        justify-content: center;
        grid-template-rows: min-content min-content;
        grid-template-columns: 1fr;
        font-family: "Grenze Gotisch", cursive;
        font-weight: 400;
    }
    main h1{
        font-size: 5rem;
        font-weight: 400;
    }
    .dice{
        margin-left: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: 1fr;
    }
    .die-add{
        background-color: var(--panel-color);
        position: relative;
        max-height: 10rem;
        height: 10rem;
        padding: 1rem;
        max-width: 10rem;
        border-radius: 0.3rem;
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .die-add span{
        cursor: pointer;
        display: grid;
        width: 2rem;
        border-radius: 0.3rem;
        height: 2rem;
        place-content: center;
        background-color: var(--statement-color);
    }
</style>
