import { JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class BacklogHistory
{
    @JsonMember({name: "t"})
    statTime: Date;

    @JsonMember({name: "b"})
    backlog: number;

    constructor(
        statTime?: Date,
        backlog?: number)
    {
        if(statTime !== undefined)
            this.statTime = statTime;

        if(backlog !== undefined)
            this.backlog = backlog;
    }
}
