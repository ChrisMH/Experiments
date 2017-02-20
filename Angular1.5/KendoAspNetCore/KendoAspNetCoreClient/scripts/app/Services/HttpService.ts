import * as angular from "angular";

export interface IHttpServiceResponse<TData>
{
    success: boolean;
    message: string;
    data: TData;
}

export class HttpService implements angular.IServiceProvider
{
    static $inject = ["$http", "$q"];

    constructor(protected $http: angular.IHttpService,
        protected $q: angular.IQService)
    {
    }

    get<T, TResponse extends IHttpServiceResponse<T>>(
        url: string,
        transformResponse: (data: string) => TResponse,
        params?: any): angular.IPromise<T>
    {
        return this.$q((resolve: angular.IQResolveReject<T>, reject: angular.IQResolveReject<any>) =>
        {
            this.$http({
                method: "GET",
                url: url,
                params: params,
                transformResponse: transformResponse
            })
                .then((response: angular.IHttpPromiseCallbackArg<TResponse>) =>
                {
                    if (response.data.success && response.data.data)
                        resolve(response.data.data);
                    else
                        reject(response.data.message);
                },
                (reason: any) =>
                {
                    console.error(reason);
                    reject(reason);
                });
        });
    }

    $get(): any
    {
        return new HttpService(this.$http, this.$q);
    }
}