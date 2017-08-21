

namespace Simple.Services {
    export interface IHttpService {
        get<T>(url: string): Promise<IResponse<T>>;
    }

    export interface IResponse<T> {
        statusCode: number;
        data?: T | string
    }
}