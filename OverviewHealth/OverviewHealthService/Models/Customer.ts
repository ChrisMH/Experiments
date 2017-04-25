import { JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class Customer
{
    @JsonMember
    id: number;

    @JsonMember
    name: string;

    constructor(
        id?: number,
        name?: string) 
    {
        if(id !== undefined)
            this.id = id;
            
        if(name !== undefined)
            this.name = name;
    }
}
