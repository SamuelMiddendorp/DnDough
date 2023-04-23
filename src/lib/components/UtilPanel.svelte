<script lang="ts">
let audio: boolean = false;
let lightTheme: boolean = false;
</script>
<div class="util-panel shadow">
    <p class="non-selectable">Sound {audio ? "on" : "off"}</p>
    <p class="non-selectable">Theme: {lightTheme ? "light" : "dark"}</p>
</div>
<style>
    .util-panel{
        position: fixed;
        top: 0;
        right: 0;
        background-color: var(--panel-color);
        border-radius: 0.3rem;
        height: 2rem;
        font-size: 0.8rem;
        display: grid;
        padding: 0.3rem;
    }
    .util-panel p{
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 0.3rem;
        margin-top: 0.2rem;
        background-color: var(--statement-color);
    }
</style>