
import "reflect-metadata";
import * as moment from "moment";

export namespace UrlQuery {
 
const UrlQueryClassKey = "UrlQueryClass";

/**
    Usage:
    
class QueryClass
{
    @UrlQueryParam("stTm", IsoDateConverter)
    startTime: Date;
    
    @UrlQueryParam("pgNum", IntConverter)
    pageNumber: number;

    @UrlQueryParam("tit", StringConverter)
    title: string;
}
*/
  
export function UrlQueryParam(urlKey: string, converterFactory: { new(): IConverter }): (target: any, property?: PropertyKey, descriptor?: PropertyDescriptor) => void
{
    return (target: any, property?: PropertyKey, descriptor?: PropertyDescriptor) =>
    {
        if (converterFactory == null)
            throw `UrlQueryParam: converterFactory is undefined for urlKey '${urlKey}'`;

        let classData = <UrlQueryClassMetadata>Reflect.getMetadata(UrlQueryClassKey, target);
        if (!classData)
        {
            classData = new UrlQueryClassMetadata();
            Reflect.defineMetadata(UrlQueryClassKey, classData, target);
        }

        let paramData = new UrlQueryParamMetadata(urlKey, property.toString(), new converterFactory());

        classData.paramMap.set(property.toString(), paramData);
        classData.urlMap.set(urlKey, paramData);
    };
}


export function getParamMap(target: any): Map<string, UrlQueryParamMetadata>
{
    var meta = <UrlQueryClassMetadata>Reflect.getMetadata(UrlQueryClassKey, target);
    if (!meta) 
        return new Map<string, UrlQueryParamMetadata>();
    return meta.paramMap;
}

export function getUrlMap(target: any): Map<string, UrlQueryParamMetadata>
{
    var meta = <UrlQueryClassMetadata>Reflect.getMetadata(UrlQueryClassKey, target);
    if (!meta) 
        return new Map<string, UrlQueryParamMetadata>();
    return meta.urlMap;
}

export class UrlQueryClassMetadata {
    paramMap: Map<string, UrlQueryParamMetadata> = new Map<string, UrlQueryParamMetadata>();
    urlMap: Map<string, UrlQueryParamMetadata> = new Map<string, UrlQueryParamMetadata>();
}

export class UrlQueryParamMetadata {
    constructor(public urlKey: string, public propertyKey: string, public converter: IConverter)
    {
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

   
}