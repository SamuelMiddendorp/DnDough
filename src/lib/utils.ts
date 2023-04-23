export const rollDie = (dieType: number): number => {

    return Math.floor(Math.random() * dieType + 1);
}
interface DieInfo {
    type: number,
    count: number
}
export const getDieTemplate = (): DieInfo[] => {
    let dieInfo: DieInfo[] = [];
    let url = window.location.href;
    let dieDataString = url.split("/?")[1];
    let dieData = dieDataString.split("_");
    for (var i = 0; i < dieData.length; i += 2) {
        dieInfo.push({ type: Number(dieData[i]), count: Number(dieData[i + 1]) })
    }
    return dieInfo;
}

export const getDiceString = (dice: number[]): string => {
    let diceInfo = createDieInfoArray(dice);
    let diceString = "?";
    diceInfo.forEach(die => {
        diceString = `${diceString}${die.type}_${die.count}_`
    })
    diceString = diceString.slice(0, -1);
    return diceString;
}
const createDieInfoArray = (dice: number[]): DieInfo[] => {
    let dieMap = new Map<number, number>();
    dice.forEach(die => {
        if (dieMap.has(die)) {
            dieMap.set(die, dieMap.get(die)! + 1);
        }
        else{
            dieMap.set(die, 1);
        }
    });
    let dieInfo: DieInfo[] = []
    dieMap.forEach((value: number, key: number) => {
        dieInfo.push({type: key, count: value});
    })
    return dieInfo.sort((a,b) => a.type - b.type);
}

