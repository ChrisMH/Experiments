
import { JsonObject, JsonMember } from "typedjson-npm";
import { JsGridColumn } from "./JsGridColumn";

@JsonObject
export class JsGridConfigModel
{
    @JsonMember({elements: JsGridColumn})
    columns: JsGridColumn[]
}
