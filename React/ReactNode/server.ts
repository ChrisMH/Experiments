import * as express from "express";
import * as fs from "fs";

if (process.env.node_env === undefined)
    throw "node_env is not defined";

let app = express();
let dev = process.env.node_env === "development";
let port = process.env.port || 3000;

app.get(`${getVirtualDir()}/`, (req: express.Request, res: express.Response) =>
{
    res.render("main",
        {
            title: dev ? "Dev | React NodeJS Template" : "React NodeJS Template",
            baseUrl: getVirtualDir() ? getVirtualDir() : "/",
            config: JSON.stringify({ version: getVersion() }),
            stylesheets: getStylesheets(),
            scripts: getScripts()
        }); 
});   
              
app.listen(port, () =>
{
    app.set("view engine", "pug");
    app.use(express.static(`${getVirtualDir()}/public`));

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
 
function getStylesheets(): string[]
{
    let result = new Array<string>();

    result.push(`bootstrap/css/bootstrap-${getVersion()}.css`);

    return result;
}

function getScripts(): string[]
{
    let result = new Array<string>();

    if (dev)
    {
        result.push(`${getVirtualDir()}/node_modules/systemjs/dist/system.src.js`);
        result.push(`${getVirtualDir()}/src/system.config.js`);
    }
    else
    {
        result.push(`system-${getVersion()}.js`);
        result.push(`system.config-${getVersion()}.js`);
    }

    return result;
}

