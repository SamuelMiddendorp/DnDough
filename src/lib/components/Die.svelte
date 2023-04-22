<script lang="ts">
    import { rollDie } from "../utils";
    interface Die{
        type: number,
        currentValue: number,
        roll: (playSound: boolean) => void,
        sound: HTMLAudioElement
    }
    export let die: Die;
    export let removeDie: (die: Die) => void;
    let dieIsRolling: boolean = false;
    die.roll = (playSound: boolean) => {

        if(playSound){
            die.sound.load();
            die.sound.play();
        }
        dieIsRolling = true;
        setTimeout(() => {dieIsRolling = false; die.currentValue = rollDie(die.type)}, 800);
    };

</script>

<div class="die shadow">
    <img class="{dieIsRolling ? 'die-icon-anim die-icon' : 'die-icon'}" src="/icons/d{die.type}.svg" alt="die" />
    <p class="die-value">{die.currentValue}</p>
    <p class="die-remove shadow" on:click={() => removeDie(die)}>-</p>
    <img src="/icons/d20.svg" class="die-roll shadow" on:click={() => die.roll(true)}/>
</div>

<style>
    @keyframes dieSpawn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes spin{
        33%{
            transform: rotateY(360deg) rotateZ(360deg);
        }
        66%{
            transform: rotateY(360deg) rotateZ(-360deg);
        }
        100%{
            transform: rotateY(360deg) rotateZ(360deg);
        }
    }
    .die-icon-anim{
        animation: spin 1s ease-in-out !important;
    }
    .die-icon {
        opacity: 1;
        animation: dieSpawn 0.4s ease forwards;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .die-value {
        z-index: 2;
        background-color: #222;
        padding: 0.2rem;
        display: grid;
        place-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 0.3rem;
    }
    .die {
        height: 10rem;
        max-height: 10rem;
        width: 10rem;
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
    .die:active .die-remove {
        display: grid;
        opacity: 1;
    }
    .die:hover .die-remove {
        display: grid;
        opacity: 1;
    }
    .die-remove {
        cursor: pointer;
        transition: all 0.7s ease-in-out;
        position: absolute;
        background-color: var(--statement-color);
        border-top-left-radius: 0.3rem;
        font-size: 2rem;
        padding: 0.2rem;
        display: grid;
        place-content: center;
        width: 2rem;
        height: 2rem;
        opacity: 0;
        display: none;
        top: 0;
        left: 0;
    }
    .die-roll {
        cursor: pointer;
        transition: all 0.7s ease-in-out;
        position: absolute;
        background-color: var(--statement-color);
        border-top-right-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
        font-size: 2rem;
        padding: 0.2rem;
        display: grid;
        place-content: center;
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        top: 0;
        right: 0;
    }
</style>
