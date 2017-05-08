import { JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class TrackerBacklog
{
    @JsonMember
    trackerId: number;

    @JsonMember
    trackerName: string;
    
    @JsonMember
    assetName: string;
    
    @JsonMember
    statTime: Date;
    
    @JsonMember
    backlog: number;
    
    @JsonMember
    lastReceivedOn: Date;
    
    @JsonMember
    totalReceived: Number

    constructor(
        trackerId?: number,
        trackerName?: string,
        assetName?: string,
        statTime?: Date,
        backlog?: number,
        lastReceivedOn?: Date,
        totalReceived?: Number) 
    {
        if(trackerId !== undefined)
            this.trackerId = trackerId;
            
        if(trackerName !== undefined)
            this.trackerName = trackerName;
            
        if(assetName !== undefined)
            this.assetName = assetName;
            
        if(statTime !== undefined)
            this.statTime = statTime;
            
        if(backlog !== undefined)
            this.backlog = backlog;
            
        if(lastReceivedOn !== undefined)
            this.lastReceivedOn = lastReceivedOn;
            
        if(totalReceived !== undefined)
            this.totalReceived = totalReceived;
    }
}
