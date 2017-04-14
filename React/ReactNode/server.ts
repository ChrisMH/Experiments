import * as express from "express";
import * as fs from "fs";

if (process.env.NODE_ENV === undefined)
    throw "NODE_ENV is not defined";

let app = express();
let dev = process.env.NODE_ENV === "development";
let port = process.env.port || 3000;

app.get("/", (req: express.Request, res: express.Response) =>
{
    res.render("main",
        {
            title: dev ? "Dev | React NodeJS Template" : "React NodeJS Template",
            baseUrl: "/",
            config: JSON.stringify({ version: getVersion() }),
            stylesheets: getStylesheets(),
            scripts: getScripts()
        });
});   
 
app.listen(port, () =>
{
    app.set("view engine", "pug");
    app.use(express.static("public"));

    if (dev)
    {
        app.use("/node_modules", express.static("node_modules"));
        app.use("/src", express.static("src"));
    }
     
    console.log(`Listening on port ${port} (${process.env.NODE_ENV}, v${getVersion()})`);
});     

function getVersion(): string
{
    var packageFile = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageFile["version"];
}

function getStylesheets(): string[]
{
    let result = new Array<string>();

    result.push("bootstrap/css/bootstrap-3.3.7.css");

    return result;
}

function getScripts(): string[]
{
    let result = new Array<string>();

    if (dev)
    {
        result.push("node_modules/systemjs/dist/system.src.js");
        result.push("src/system.config.js");
    }
    else
    {
        result.push("system-0.20.12.js");
        result.push(`system.config-${getVersion()}.js`);
    }

    return result;
}

