export interface IServiceResponse<TData>
{
    success: boolean;
    message: string;
    data: TData;
}
