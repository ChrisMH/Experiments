import * as moment from "moment";
import "reflect-metadata";


export const UrlQueryParamKey: string = "UrlQueryParam";


export function UrlQueryParam(urlKey: string, converterFactory: {new(): IConverter}): (target: any, propertyKey: string) => void
{
    if(converterFactory == null)
        throw `UrlQueryParam: converterFactory is undefined for urlKey '${urlKey}'`;

    return (target: any, propertyKey: string) =>
    {
        Reflect.defineMetadata(UrlQueryParamKey, new UrlQueryParamMetadata(urlKey, new converterFactory()), target, propertyKey);
    }
}

export class UrlQueryParamMetadata {
    constructor(public urlKey: string, public converter: IConverter) {
    }
} 

export interface IConverter {
    toUrl: (value: any) => string;
    fromUrl: (value: string) => any;
}

export class StringConverter implements IConverter {
    toUrl(value: string): string { return value; }
    fromUrl(value: string): string { return value; }
}

export class IntConverter implements IConverter {
    toUrl(value: number): string { return value.toString(); }
    fromUrl(value: string): number { return parseInt(value); }
}

export class IsoDateConverter implements IConverter {
    toUrl(value: Date): string { return moment(value).toISOString(); }
    fromUrl(value: string): Date { return moment(value).toDate(); }
}

