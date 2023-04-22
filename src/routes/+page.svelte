<script lang="ts">
    import Die from "$lib/components/Die.svelte";
    import { getDieTemplate } from "$lib/utils";


    interface Die{
        type: number,
        currentValue: number,
        sound: HTMLAudioElement;
        roll: (playSound: boolean) => void
    }
    let dieTypes: number[] = [4,6,8,10,12,20];
    let totalValue: number = 0;

    let dieSound = new Audio('/roll2.mp3');
    let diceSound = new Audio('/roll.mp3');
    let dice: Die[] = [];
    const loadTemplate = () => {

        let template = getDieTemplate();

        template.forEach(die => {
            for(var i = 0; i < die.count; i++){
                if(dieTypes.includes(die.type)){
                    dice = [...dice, {type: die.type, currentValue: 0, roll: () => {}, sound: dieSound}];
                }
            }
        })
    }
    // We want to know if values are supplied
    if(window.location.href.split("/?").length > 1){
        loadTemplate();
    }
    const addDie = (dieType: number) => {
        dice = [...dice, {type: dieType, currentValue: 0, roll: () => {}, sound: dieSound}];
    }
    const removeDie = (die: Die) => {
        console.log("Foobar");
        dice = dice.filter(d => d != die);
    }
    const rollAll = () => {
        diceSound.load();
        diceSound.play();
        dice.forEach(die => die.roll(false));
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
            <div class="die-panel shadow">
                <h3>Add die:</h3>
                <div class="die-add">
                    {#each dieTypes as dieType}
                    <span on:click={() => addDie(dieType)}>{dieType}</span>
                    {/each}
                </div>
        </div>
            <div class="dice-info shadow">
                <h3 style="margin-bottom: 0.2rem;background-color: var(--statement-color); padding: 0.1rem; border-radius: 0.3rem; cursor: pointer" on:click={() => rollAll()}>Roll all dice</h3>
                <h3>Dice data:</h3>
                <h4>Total value: {totalValue}</h4>
                <h4>Die count: {dice.length}</h4>
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
        margin-bottom: 1rem;
        margin-left: 1rem;
        font-size: 5rem;
        font-weight: 400;
    }
    .dice{
        margin-left: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: 1fr;
    }
    .dice-info{
        margin-bottom: 1rem;
        background-color: var(--panel-color);
        height: 10rem;
        max-width: 10rem;
        padding: 1rem;
        border-radius: 0.3rem;
    }
    .dice-info h4{
        display: grid;
        place-content: center;
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 0.3rem;
    }
    .die-panel{
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
    .die-panel h3{
        padding: 1rem;
    }
    .die-add{
        position: relative;
        border-radius: 0.3rem;
        display: grid;
        justify-items: center;
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
