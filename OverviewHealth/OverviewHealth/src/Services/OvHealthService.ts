import { Injectable, Inject } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

import { TypedJSON, JsonObject, JsonMember } from "typedjson-npm";

import { AppSettings, HealthServer } from "../Services";

@Injectable()
export class OvHealthService
{
    constructor(protected appSettings: AppSettings)
    {

    }

    getBacklog(server: HealthServer) : Observable<any>
    {
        return new Observable<any>((obs: Subscriber<any>) =>
        {
            obs.complete();
        });
    }

    getCounters(server: HealthServer)
    {

    }

    getBacklogHistory(server: HealthServer)
    {

    }

}
 