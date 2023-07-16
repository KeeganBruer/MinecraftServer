console.log("Helath checker")
import express, { Express, Request, Response } from 'express';
import * as server from './MinecraftServer';
import * as logger from './Logger';
import * as git from './gitBackup';

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.post('/stopServer', (req: Request, res: Response) => {
    server.stopServer();
    res.send("OKAY")
});
app.post('/stop', (req: Request, res: Response) => {
    server.stopServer();
    res.send("OKAY")
    console.log("Closing Application")
    logger.addToLog("Closing Application")
    setTimeout(()=>{
        process.exit();
    }, 10 * 1000)
});
app.post('/startServer', (req: Request, res: Response) => {
    server.startServer();
    res.send("OKAY")
});
app.post('/backup', (req: Request, res: Response) => {
    git.backup();
    res.send("OKAY")
});
app.get('/logs', (req: Request, res: Response) => {
    let logs = logger.getLogs();
    let log_divs = logs.map(log=>`<div>${log}</div>`)
    res.send(
`
<html>
    
    <body style="display:flex; flex-direction:column; margin: 0; padding: 0; height: 100vh;">
        <center>
            <h1>Minecraft Server Logs</h1>
        </center>
        <div id="console" style="display:flex; flex-direction:column; overflow: scroll; flex: 1; border-bottom: 1px solid black; border-top: 1px solid black; margin-bottom: 50px;">
            ${log_divs.join("")}
        </div>
        <script>
            let currinterval;
            let intervalTime = 5 * 1000;
            const handleVisibilityChange = function() {
                if (document.visibilityState === 'visible') {
                    console.log('has focus');
                    window.location.reload();
                } else {
                    console.log('lost focus');
                    clearInterval(currinterval)
                }
            }
            document.addEventListener("visibilitychange", handleVisibilityChange);
            window.addEventListener("load", ()=>{
                var objDiv = document.getElementById("console");
                objDiv.scrollTop = objDiv.scrollHeight;
                if (document.visibilityState === 'visible') {
                    currTimeout = setInterval(()=>{
                        window.location.reload();
                    }, intervalTime)
                }
            });
        </script>
    </body>
</html>
`
    );
  });
app.get('/healthz', (req: Request, res: Response) => {
    if (server.isConnected())
        res.send("Okay")
    else
        res.send("Fail")
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
server.startServer();
