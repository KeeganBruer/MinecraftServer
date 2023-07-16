let logs:string[] = [];


export function addToLog(...stuff:any[]) {
    logs.push(...stuff);
}
export function getLogs() {
    return logs
}