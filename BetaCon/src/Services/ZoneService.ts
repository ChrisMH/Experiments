import { injectable, inject } from "inversify";
import { Observable, Subscriber } from "rxjs";

import { ZoneDescription } from "../Models";

@injectable()
export class ZoneService
{
    getZones(): Observable<ZoneDescription>
    {
        return new Observable<ZoneDescription>((obs: Subscriber<ZoneDescription>) =>
        {
            // TODO: Call the web service/socket service
            obs.next(new ZoneDescription("Zone 1: 4 Input Source (#2 selected), 2 Level Paging, ANC, Biamp Output"));
            obs.next(new ZoneDescription("Zone 2: 3 Input Source, 1 Level Paging, ANC, Single Output"));
            obs.complete();
        });
    }
}
