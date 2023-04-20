<script lang="ts">

    interface Die{
        type: number;
        currentValue: number;
    }
    let dice: Die[] = [];
    const addDie = (dieType: number) => {
        dice = [...dice, {type: dieType, currentValue: 0}];
    }
</script>

<body>
    <main>
        <h1>DnDough</h1>
        <div class="dice">
            {#each dice as die}
            <div class="die shadow">
                <p class="die-remove">-</p>
                <p>{die.type}</p>
            </div>
            {/each}
            <div on:click={() => addDie(12)} class="die shadow">
                <span>Add Die</span>
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
        grid-template-rows: min-content max-content;
        grid-template-columns: 1fr;
        font-family: "Grenze Gotisch", cursive;
    }
    main h1{
        font-size: 5rem;
    }
    .dice{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        grid-template-rows: 1fr;
    }
    .die{
        min-height: 10rem;
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
    .die:hover .die-remove{
        display: grid;
        opacity: 1;
    }
    .die:active .die-remove{
        display: grid;
        opacity: 1;
    }
    .die-remove{
        cursor: pointer;
        transition: opacity 0.7s ease-in-out;
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
