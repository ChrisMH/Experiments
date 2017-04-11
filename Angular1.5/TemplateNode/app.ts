import * as express from "express";

let app = express();
 
app.get("/", (req: express.Request, res: express.Response) =>
{
    res.render("main",
        {
            title: "Angular 1.5 Template",
            scripts: getScripts()
        });
});

let port = process.env.port || 3000;
app.listen(port, () =>
{
    if (process.env.NODE_ENV === undefined)
        throw "NODE_ENV is not defined";

    app.set("view engine", "pug");
    app.use(express.static("public"));

    if (process.env.NODE_ENV === "development")
    {
        app.use("/node_modules", express.static("node_modules"));
        app.use("/app", express.static("app"));
    }

    console.log(`Listening on port ${port} (${process.env.NODE_ENV})`);
});     


function getScripts(): string[]
{
    let result = new Array<string>();

    if (process.env.NODE_ENV === "development")
    {
        result.push("node_modules/systemjs/dist/system.src.js");
        result.push("app/system.config.js");
    }
    else
    {
        result.push("js/system-0.20.12.js");
    }

    return result;
}