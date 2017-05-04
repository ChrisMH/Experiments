import { JsonObject, JsonMember } from "typedjson-npm";

export class CustomerCounter
{
    @JsonMember
    customerId: number;

    @JsonMember
    customerName: string;

    @JsonMember
    databaseConnections: number;

    @JsonMember
    idleDatabaseConnections: number;

    constructor(
        customerId?: number,
        customerName?: string,
        databaseConnections?: number,
        idleDatabaseConnections?: number) 
    {
        if(customerId !== undefined)
            this.customerId = customerId;   
            
        if(customerName !== undefined)
            this.customerName = customerName;
            
        if(databaseConnections !== undefined)
            this.databaseConnections = databaseConnections;
            
        if(idleDatabaseConnections !== undefined)
            this.idleDatabaseConnections = idleDatabaseConnections;
    }
}
