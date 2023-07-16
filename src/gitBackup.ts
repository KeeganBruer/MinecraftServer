import * as child_process from 'child_process';
import { addToLog } from './Logger';
let start_commands = [
    `"./PortableGit/git-cmd.exe" add .`,
    `"./PortableGit/git-cmd.exe" commit -m "Auto Update"`,
    `"./PortableGit/git-cmd.exe" push origin main`,
    `exit`
]
export function backup() {
    addToLog("Backing Up Server To Git")
    let child = child_process.spawn("cmd");
    if (child.stdout == null) {console.log("No Child output"); return;}
    child.stdout.setEncoding('utf8');
    child.stdout.pipe(process.stdout)
    for (let i = 0; i < start_commands.length; i++) {
        child.stdin?.write(start_commands[i] + "\n")
    }
    child.on("exit", ()=>{
        addToLog("Finished Backing Up Server To Git")
    })

}
