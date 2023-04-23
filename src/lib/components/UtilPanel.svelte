<script lang="ts">
    import { muteAudio, useDarkTheme } from "../../stores/audioStore";

    let muted: boolean;
    muteAudio.subscribe((x) => {
        muted = x;
    });
    let darkTheme: boolean;
    useDarkTheme.subscribe((x) => {
        darkTheme = x;
    });
    $: {
        muteAudio.set(muted);
    }
    $: {
        useDarkTheme.set(darkTheme);
        let theme = darkTheme ? "dark" : "light";
        setTheme(theme);
    }
    const setTheme = (theme: string) => {
        document.documentElement.style.setProperty(
            "--background-color",
            `var(--background-color-${theme})`
        );
        document.documentElement.style.setProperty(
            "--text-color",
            `var(--text-color-${theme})`
        );
        document.documentElement.style.setProperty(
            "--panel-color",
            `var(--panel-color-${theme}`
        );
    };
</script>

<div class="util-panel shadow">
    <p class="non-selectable" on:click={() => (muted = !muted)}>
        Mute sound: {muted ? "on" : "off"}
    </p>
    <p class="non-selectable" on:click={() => (darkTheme = !darkTheme)}>
        Theme: {darkTheme ? "dark" : "light"}
    </p>
</div>

<style>
    .util-panel {
        z-index: 1;
        position: fixed;
        top: 0.4rem;
        right: 0.4rem;
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
