import * as express from "express";
import * as fs from "fs";

if (process.env.node_env === undefined)
    throw "node_env is not defined";

let app = express();
let dev = process.env.node_env === "development";
let port = process.env.port || 3000;

const routes =
[
    `${getVirtualDir()}/`, 
    `${getVirtualDir()}/second`
]
app.get(routes, (req: express.Request, res: express.Response) =>
{
    res.render("main",
        {
            dev: dev,
            baseUrl: `${getVirtualDir()}/`,
            version: appVersion()
        }); 
});    

app.set("view engine", "pug");
app.use(getVirtualDir(), express.static("public"));

app.listen(port, () =>
{       
    console.log(`Listening on port ${port}: ${process.env.node_env}, v${appVersion()}`);
});     

function appVersion(): string
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
