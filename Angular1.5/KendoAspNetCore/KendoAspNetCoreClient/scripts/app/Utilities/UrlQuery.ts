
import "reflect-metadata";
import * as moment from "moment";

export namespace UrlQuery
{
    const UrlQueryKey = "UrlQueryKey";

    export class UrlQueryParamConfiguration
    {
        urlKey: string;
        readOnly: boolean;
    }

    /**
     * A property decorator that applied metadata to a class property allowing it to be 
     * serialized to/from a query string
     * 
     * Example usage:
     * 
     * class QueryClass 
     * {
     *     @UrlQueryParam(IsoDateConverter, {urlKey: "stTm"})
     *     startTime: Date;
     * 
     *     @UrlQueryParam(IntConverter) // urlKey will default to pageNumber
     *     pageNumber: number;
     *
     *     @UrlQueryParam(StringConverter)  // urlKey will default to title
     *     title: string;
     * }
     *
     * Configuration object:
     *     urlKey {string} parameter key in the URL
     *     readOnly {boolean} true if the parameter is only read from the url and not written back
     *
     * @param config {Object} configuration object
     * @param converterFactory IUrlConverter The converter to use to convert to/from a URL
     * @returns {Function} A factory function used to apply the metadata to the property 
     */
    export function UrlQueryParam(converterFactory: { new (): IUrlConverter }, config?: Object): (target: any, propertyKey: string) => void
    {
        return (target: any, propertyKey: string) =>
        {
            let _config = config as UrlQueryParamConfiguration || new UrlQueryParamConfiguration();

            if (_config.urlKey === undefined)
                _config.urlKey = propertyKey;
            if (_config.readOnly === undefined)
                _config.readOnly = false;

            if (converterFactory == null)
                throw `UrlQueryParam: converterFactory is undefined for urlKey '${_config.urlKey}'`;

            let classData = Reflect.getMetadata(UrlQueryKey, target) as UrlQueryClassMetadata;
            if (!classData)
            {
                classData = new UrlQueryClassMetadata();
                Reflect.defineMetadata(UrlQueryKey, classData, target);
            }

            const urlParam = new UrlQueryParamMetadata(_config.urlKey, _config.readOnly, propertyKey, new converterFactory());

            classData.urlParams.push(urlParam);
        };
    }


    /**
     * Converts an object decorated with UrlQueryParam to a plain object
     * usable by $location.search or $state
     * 
     * @param query TQuery The object to serialize
     * @returns {Object} The resulting object
     */
    export function toUrlObject<TQuery>(query: TQuery): Object
    {
        const urlParams = UrlQuery.getUrlParams(query);
        let result = {} as Object;

        for (let i = 0; i < urlParams.length; i++)
        {
            if (urlParams[i].readOnly || !urlParams[i].converter)
                continue;

            urlParams[i].converter.toUrl(query, result, urlParams[i])
        }

        return result;
    }


    /**
     * Deserializes data from a url into an object of the supplied type
     * 
     * @param params {Object} parameters from the URL.  typically $location.search() or $state.params
     * @param resultType { new() : TQuery } the desired object type
     * @returns {TQuery} An object created with the parameters in the URL
     */
    export function fromUrlObject<TQuery>(params: Object, resultType: { new (): TQuery }): TQuery
    {
        const result = new resultType();
        const urlParams = UrlQuery.getUrlParams(result);

        for (let i = 0; i < urlParams.length; i++)
        {
            if (!urlParams[i].converter)
                continue;

            urlParams[i].converter.fromUrl(params, result, urlParams[i]);
        }

        return result;
    }

    export function queryStringToUrlObject(queryString: string): Object
    {
        let result = new Object();
        var queryElements = queryString.split("&");
        for (let i = 0; i < queryElements.length; i++)
        {
            var keyValue = queryElements[i].split("=");
            if (keyValue.length === 1)
                result[keyValue[0]] = keyValue[0];
            else if (keyValue.length === 2)
                result[keyValue[0]] = keyValue[1];
        }

        return result;
    }

    export function getUrlParams(target: any): Array<UrlQueryParamMetadata>
    {
        const meta = Reflect.getMetadata(UrlQueryKey, target) as UrlQueryClassMetadata;
        if (!meta)
            return new Array<UrlQueryParamMetadata>();
        return meta.urlParams;

    }

    export class UrlQueryClassMetadata
    {
        urlParams = new Array<UrlQueryParamMetadata>();
    }

    export class UrlQueryParamMetadata
    {
        constructor(public urlKey: string, public readOnly: boolean, public propertyKey: string, public converter: IUrlConverter)
        {
        }
    }

    export interface IUrlConverter
    {
        toUrl: (source: Object, target: Object, pi: UrlQueryParamMetadata) => void;
        fromUrl: (source: Object, target: Object, pi: UrlQueryParamMetadata) => void;
    }

    export class StringConverter implements IUrlConverter
    {
        toUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            if (!source.hasOwnProperty(pi.propertyKey) || source[pi.propertyKey] === undefined)
                return;

            target[pi.urlKey] = source[pi.propertyKey];
        }

        fromUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            var value = source.hasOwnProperty(pi.urlKey) ? source[pi.urlKey] : undefined;
            if (value !== undefined)
                target[pi.propertyKey] = value;
        }
    }

    export class IntConverter implements IUrlConverter
    {
        toUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            if (!source.hasOwnProperty(pi.propertyKey) || source[pi.propertyKey] === undefined)
                return;

            target[pi.urlKey] = source[pi.propertyKey].toString();
        }

        fromUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            var value = source.hasOwnProperty(pi.urlKey) ? source[pi.urlKey] : undefined;
            if (value !== undefined)
                target[pi.propertyKey] = parseInt(value);
        }
    }

    export class BoolConverter implements IUrlConverter
    {
        toUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            if (!source.hasOwnProperty(pi.propertyKey) || source[pi.propertyKey] === undefined)
                return;

            target[pi.urlKey] = source[pi.propertyKey] === true ? "t" : "f";
        }

        fromUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            var value = source.hasOwnProperty(pi.urlKey) ? source[pi.urlKey] : undefined;
            if (value !== undefined)
                target[pi.propertyKey] = (value === "True" || value == "true" || value === "t") ? true : false;
        }
    }

    export class IsoDateConverter implements IUrlConverter
    {
        toUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            if (!source.hasOwnProperty(pi.propertyKey) || source[pi.propertyKey] === undefined)
                return;

            target[pi.urlKey] = moment(source[pi.propertyKey]).toISOString();
        }

        fromUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            var value = source.hasOwnProperty(pi.urlKey) ? source[pi.urlKey] : undefined;
            if (value !== undefined)
                target[pi.propertyKey] = moment(value).toDate();

        }
    }

    export class IntArrayConverter implements IUrlConverter
    {
        toUrl(source: Object, target: Object, pi: UrlQueryParamMetadata): void
        {
            if (!source.hasOwnProperty(pi.propertyKey) || source[pi.propertyKey] === undefined
                || !(source[pi.propertyKey] instanceof Array) || (source[pi.propertyKey] as any[]).length === 0)
                return;

            target[pi.urlKey] = (source[pi.propertyKey] as any[]).join(";");
        }

        fromUrl(source: Object, target: any, pi: UrlQueryParamMetadata): any
        {
            var value = source.hasOwnProperty(pi.urlKey) ? source[pi.urlKey] : undefined;
            if (value !== undefined)
            {
                let array: number[] = [];

                if (value.length > 0)
                {
                    let elements = value.split(";");
                    elements.forEach((e: string) => array.push(parseInt(e)));
                }

                target[pi.propertyKey] = array;
            }
        }
    }
}
