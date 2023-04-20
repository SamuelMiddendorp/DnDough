<script lang="ts">

    interface Die{
        type: number;
        currentValue: number;
    }
    let dieTypes: number[] = [4,6,8,10,12,20];
    let dice: Die[] = [];
    const addDie = (dieType: number) => {
        dice = [...dice, {type: dieType, currentValue: 0}];
    }
    const removeDie = (die: Die) => {
        dice = dice.filter(d => d != die);
    }
</script>

<body>
    <main>
        <h1>DnDough</h1>
        <div class="dice">
            {#each dice as die}
            <div class="die shadow">
                <p>{die.type}</p>
                <p on:click={() => removeDie(die)} class="die-remove">-</p>
            </div>
            {/each}
            <div class="die-add shadow">
                {#each dieTypes as dieType}
                <span on:click={() => addDie(dieType)}>{dieType}</span>
                {/each}
            </div>
        </div>
    </main>
</body>

<style>
    :root {
        --statement-color: #3d816c;
        --background-color: #060D0B;
        --panel-color: #0C1A15;
        --text-color: #E8E8E8;
    }
    @import url("https://fonts.googleapis.com/css2?family=Grenze+Gotisch&display=swap");
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: var(--background-color);
    }
    .shadow{
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
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
    }
    main h1{
        font-size: 5rem;
    }
    .dice{
        margin-left: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: 1fr;
    }
    .die{
        min-height: 10rem;
        max-width: 10rem;
        position: relative;
        transition: all 0.2s ease-out;
        display: grid;
        place-items: center;
        padding: 1rem;
        border-radius: 0.3rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        background-color: var(--panel-color);
    }
    .die:active .die-remove{
        display: grid;
        opacity: 1;
    }
    .die:hover .die-remove{
        display: grid;
        opacity: 1;
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
        display: grid;
        width: 2rem;
        border-radius: 0.3rem;
        height: 2rem;
        place-content: center;
        background-color: var(--statement-color);
    }
    .die-remove{
        cursor: pointer;
        transition: all 0.7s ease-in-out;
        opacity: 0;
        position: absolute;
        background-color: var(--statement-color);
        border-top-left-radius: 0.3rem;
        font-size: 2rem;
        padding: 0.2rem;
        display: grid;
        place-content: center;
        width: 2rem;
        height: 2rem;
        display: none;
        top: 0;
        left: 0;
    }
</style>
