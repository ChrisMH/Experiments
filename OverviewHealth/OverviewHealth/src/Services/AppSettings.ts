

export class AppSettings
{
    rootUrl: string;
    version: string;

    constructor(configRoot: Object)
    {
        if(configRoot && configRoot.hasOwnProperty("app") && configRoot["app"].hasOwnProperty("settings"))
        {
            let appSettings = configRoot["app"]["settings"];

            this.rootUrl = appSettings["rootUrl"];
            this.version = appSettings["version"];
        }
    }
}