
import { JsonObject, JsonMember } from "typedjson-npm";

@JsonObject
export class JsGridColumn
{
    constructor(field?: string, title?: string, type?: string, width?: string|number, format?: string, aggregate?: string, footerHeader?: string, hidden?: boolean)
    {
        this.field = field;
        this.title = title;
        this.type = type;
        this.width = typeof width === "number" ? width.toString() : width;
        this.format = format;
        this.aggregate = aggregate;
        this.footerHeader = footerHeader;
        this.hidden = hidden;
    }

    @JsonMember
    field: string;

    @JsonMember
    title: string;

    @JsonMember
    type: string;

    @JsonMember
    width: string;

    @JsonMember
    format: string;

    @JsonMember
    aggregate: string;

    @JsonMember
    footerHeader: string;

    @JsonMember
    hidden: boolean;

}
