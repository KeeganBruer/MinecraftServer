import * as child_process from 'child_process';
import { addToLog } from './Logger';

let start_commands = [
    `cd ./Server`, 
    `"../jre-17.0.7.7-hotspot/bin/java.exe" -Xms1G -Xmx1G -jar paper.jar`
]
let child:child_process.ChildProcess;
let restart_server = true;
export function startServer() {
    console.log("Starting Minecraft Server")
    child = child_process.spawn("cmd");
    if (child.stdout == null) {console.log("No Child output"); return;}
    child.stdout.setEncoding('utf8');
    child.stdout.on("data", (data)=>{
        addToLog(data.toString());
        if (data.toString().includes("Closing Server")) {
            child.kill("SIGKILL")
        }
    })
    child.on("exit", ()=>{
        addToLog("Minecraft Server Has Been Closed");
        if (restart_server) startServer();
    })
    for (let i = 0; i < start_commands.length; i++) {
        child.stdin?.write(start_commands[i] + "\n")
    }
    
}

export function stopServer() {
    restart_server = false;
    child.stdin?.write(`stop\n`)
    child.stdin?.write(`exit\n`)
}


export function isConnected() {
    return child != undefined ? child.connected : false;
}

