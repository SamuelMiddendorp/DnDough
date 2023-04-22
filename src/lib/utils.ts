export const rollDie = (dieType: number) : number =>{

    return Math.floor(Math.random() * dieType + 1); // The maximum is exclusive and the 
}
interface DieInfo{
    type: number,
    count: number
}
export const getDieTemplate = () : DieInfo[] => {
    let dieInfo: DieInfo[] = [];
}
