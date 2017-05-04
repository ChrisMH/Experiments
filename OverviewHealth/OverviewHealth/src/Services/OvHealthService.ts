import { Injectable, Inject } from "@angular/core";

import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HealthServer } from "../Services";

@Injectable()
export class OvHealthService
{
    constructor(protected appSettings: AppSettings)
    {

    }

    getBacklog(server: HealthServer)
    {
    }

    getCounters(server: HealthServer)
    {

    }

    getBacklogHistory(server: HealthServer)
    {

    }

}
 