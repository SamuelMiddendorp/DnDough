import { writable } from "svelte/store";

let localStorageAudio = "dndoughMuteAudio";
let localStorageDarkTheme = "dndoughLightTheme";
let localStorageRollOnTemplate = "dndoughRollOnTemplate";

let getLocalStorageOrDefault = (item: string):boolean => {

    let localItem = window.localStorage.getItem(item);

    if (localItem != null && localItem == "false"){
        return false;
    }
    return true;
}

export const muteAudio = writable(getLocalStorageOrDefault(localStorageAudio));
export const useDarkTheme = writable(getLocalStorageOrDefault(localStorageDarkTheme));
export const rollOnTemplate = writable(getLocalStorageOrDefault(localStorageRollOnTemplate));

muteAudio.subscribe(x => {
    window.localStorage.setItem(localStorageAudio, String(x));
})
useDarkTheme.subscribe(x => {
    window.localStorage.setItem(localStorageDarkTheme, String(x));
})
rollOnTemplate.subscribe(x => {
    window.localStorage.setItem(localStorageRollOnTemplate, String(x));
})