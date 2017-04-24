import { Component } from "@angular/core";
import * as moment from "moment";

import { AppSettings, HealthServer } from "../../Services";

@Component({
    moduleId: module.id,
    selector: "server-block",
    templateUrl: "./ServerBlock.html",
    inputs: [ "server" ]
})

export class ServerBlock
{
    server: HealthServer;

    constructor(protected appSettings: AppSettings)
    {
    }
}
   