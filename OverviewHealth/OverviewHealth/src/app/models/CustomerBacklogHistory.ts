import { JsonObject, JsonMember } from "typedjson-npm";

export class CustomerBacklogHistory
{
    @JsonMember({ name: "i" })
    customerId: number;
    
    @JsonMember({ name: "n" })
    customerName: string;
    
    @JsonMember({ name: "t" })
    statTime: Date;
    
    @JsonMember({ name: "b" })
    backlog: number;

    constructor(
        customerId?: number,
        customerName?: string,
        statTime?: Date,
        backlog?: number)
    {
        if(customerId !== undefined)
            this.customerId = customerId;
            
        if(customerName !== undefined)
            this.customerName = customerName;
            
        if(statTime !== undefined)
            this.statTime = statTime;
            
        if(backlog !== undefined)
            this.backlog = backlog;
    }
}
