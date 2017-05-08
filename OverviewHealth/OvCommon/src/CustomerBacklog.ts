import { JsonObject, JsonMember } from "typedjson-npm";
import { TrackerBacklog } from "./TrackerBacklog";

export class CustomerBacklog
{
    @JsonMember
    customerId: number;
    
    @JsonMember
    customerName: string;
    
    @JsonMember
    statTime: Date;
    
    @JsonMember
    backlog: number;
    
    @JsonMember
    lastReceivedOn: Date;
    
    @JsonMember
    totalReceived: number;

    @JsonMember({ elements: TrackerBacklog })
    trackerBacklog: Array<TrackerBacklog>;

    constructor(
        customerId?: number,
        customerName?: string,
        statTime?: Date,
        backlog?: number,
        lastReceivedOn?: Date,
        totalReceived?: number)
    {
        if(customerId !== undefined)
            this.customerId = customerId;
        
        if(customerName !== undefined)
            this.customerName = customerName;
            
        if(statTime !== undefined)
            this.statTime = statTime;
            
        if(backlog !== undefined)
            this.backlog = backlog;
            
        if(lastReceivedOn !== undefined)
            this.lastReceivedOn = lastReceivedOn;
            
        if(totalReceived !== undefined)
            this.totalReceived = totalReceived;

        this.trackerBacklog = new Array<TrackerBacklog>();
    }
}
