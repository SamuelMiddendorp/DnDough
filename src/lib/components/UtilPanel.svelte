<script lang="ts">
    import { muteAudio } from "../../stores/audioStore";

    
    let muted: boolean = true;
    let lightTheme: boolean = false;
    $:{
        muteAudio.set(muted);
    }

</script>

<div class="util-panel shadow">
    <p class="non-selectable" on:click={() => (muted = !muted)}>
        Mute sound: {muted? "on" : "off"}
    </p>
    <p class="non-selectable" on:click={() => (lightTheme = !lightTheme)}>
        Theme: {lightTheme ? "light" : "dark"}
    </p>
</div>

<style>
    .util-panel {
        z-index: 1;
        position: fixed;
        top: 0;
        right: 0;
        background-color: var(--panel-color);
        border-radius: 0.3rem;
        font-size: 0.8rem;
        display: grid;
        padding: 0.3rem;
    }
    .util-panel p {
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 0.3rem;
        margin-top: 0.2rem;
        background-color: var(--statement-color);
    }
</style>
