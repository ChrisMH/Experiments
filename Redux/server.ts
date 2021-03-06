import * as express from "express";
import * as fs from "fs";
import * as path from "path";

if (process.env.node_env === undefined)
    throw "node_env is not defined";

let app = express();
let dev = process.env.node_env === "development";
let port = process.env.port || 3000;

const routes =
[
    `${getVirtualDir()}/`
]
app.get(routes, (req: express.Request, res: express.Response) =>
{
    if(dev)
        res.sendFile(path.join(__dirname, "src/index.html"));
    else
        res.sendFile(path.join(__dirname, "public/index.html"));

});    
              
app.listen(port, () =>
{
    app.use(getVirtualDir(), express.static("public"));

    if (dev)
    {
        app.use(`${getVirtualDir()}/node_modules`, express.static("node_modules"));
        app.use(`${getVirtualDir()}/src`, express.static("src"));
    }
       
    console.log(`Listening on port ${port}: ${process.env.node_env}, v${getVersion()}, vDir: ${getVirtualDir() ? getVirtualDir() : "<None>"}`);
});     

function getVersion(): string
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageFile["version"];
}

function getVirtualDir(): string
{
    if(process.env.hasOwnProperty("virtual_dir") && process.env.virtual_dir !== undefined)
        return `/${process.env.virtual_dir}`
    return "";
}
