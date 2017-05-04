import { Component, Input } from "@angular/core";
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
    @Input() server: HealthServer;

    constructor(protected appSettings: AppSettings)
    {
    }

    ngOnInit(): void
    {

    }

    ngOnDestroy(): void
    {
        
    }
}
   