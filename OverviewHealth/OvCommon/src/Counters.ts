import { JsonObject, JsonMember } from "typedjson-npm";
import { CustomerCounter } from "./CustomerCounter";

@JsonObject
export class Counters
{
    @JsonMember
    statTime: Date;

    @JsonMember
    pctProcessorTime: number;
    
    @JsonMember
    availableMBytes: number;
    
    @JsonMember
    pctPagingFileUsage: number;
    
    @JsonMember
    databaseConnections: number;
    
    @JsonMember
    idleDatabaseConnections: number;

    @JsonMember({ elements: CustomerCounter })
    customerCounters: Array<CustomerCounter>;

    constructor(
        statTime?: Date,
        pctProcessorTime?: number,
        availableMBytes?: number,
        pctPagingFileUsage?: number,
        databaseConnections?: number,
        idleDatabaseConnections?: number)
    {
        if(statTime !== undefined)
            this.statTime = statTime;
            
        if(pctProcessorTime !== undefined)
            this.pctProcessorTime = pctProcessorTime;
            
        if(availableMBytes !== undefined)
            this.availableMBytes = availableMBytes;
            
        if(pctPagingFileUsage !== undefined)
            this.pctPagingFileUsage = pctPagingFileUsage;
            
        if(databaseConnections !== undefined)
            this.databaseConnections = databaseConnections;
            
        if(idleDatabaseConnections !== undefined)
            this.idleDatabaseConnections = idleDatabaseConnections;

        this.customerCounters = new Array<CustomerCounter>();
    }
}
