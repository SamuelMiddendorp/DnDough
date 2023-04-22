export const rollDie = (dieType: number) : number =>{

    return Math.floor(Math.random() * dieType + 1);
}
interface DieInfo{
    type: number,
    count: number
}
export const getDieTemplate = () : DieInfo[] => {
    let dieInfo: DieInfo[] = [];
    let url = window.location.href;
    let dieDataString = url.split("/?")[1];
    let dieData = dieDataString.split("_");
    for(var i = 0; i < dieData.length; i+=2){
        dieInfo.push({type: Number(dieData[i]), count: Number(dieData[i+1])})
    }
    return dieInfo;
}
