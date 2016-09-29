import { JsonObject, JsonMember } from "typedjson";

@JsonObject
export class PageConfig {
    @JsonMember
    originUrl: string;

    @JsonMember
    rootUrl: string;

    @JsonMember
    version: string;
}