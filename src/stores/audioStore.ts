import { muteAudio } from "./preferenceStore";

let dieSound: HTMLAudioElement = new Audio("/roll2.mp3");
let diceSound: HTMLAudioElement = new Audio("/roll.mp3");

let muteRollSound: boolean;

dieSound.load();
diceSound.load();


export const playDieSound = () => {
   if(!muteRollSound){
    dieSound.play();
   } 
}

export const playDiceSound = () => {
   if(!muteRollSound){
    diceSound.play();
   } 
}

muteAudio.subscribe((muteSound: boolean) => muteRollSound = muteSound);



