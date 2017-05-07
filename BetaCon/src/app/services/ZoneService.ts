import { injectable, inject } from "inversify";
import { Observable, Subscriber } from "rxjs";

import { ZoneDescription, ZoneInput, ZoneSource } from "../models";

@injectable()
export class ZoneService
{
    getZones(): Observable<ZoneDescription>
    {
        return new Observable<ZoneDescription>((obs: Subscriber<ZoneDescription>) =>
        {
            // TODO: Call the web service/socket service
            obs.next(new ZoneDescription(
                "Zone 1: 4 Input Source (#2 selected), 2 Level Paging, ANC, Biamp Output",
                [ new ZoneInput("Source 1", false),
                  new ZoneInput("Source 2", true),
                  new ZoneInput("Source 3", false),
                  new ZoneInput("Source 4", false)
                ],
                new ZoneSource("Source2")
            ));


            obs.next(new ZoneDescription(
                "Zone 2: 3 Input Source, 1 Level Paging, ANC, Single Output",
                [ new ZoneInput("Source 1", false),
                  new ZoneInput("Source 2", false),
                  new ZoneInput("Source 3", true)
                ],
                new ZoneSource("Source 3")
            ));

            obs.complete();
        });
    }
}
