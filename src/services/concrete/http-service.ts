/// <reference path="../../decorators.ts" />
/// <reference path="../i-http-service.ts" />

namespace Simple.Services.Concrete {
    @injectable({
        name: '$httpService'
    })
    export class HttpService implements IHttpService {
        private parseResponse<T>(responseText: string): T | string {
            if (responseText) {
                return <T>JSON.parse(responseText);
            }

            return responseText;
        }

        private success<T>(request: XMLHttpRequest): IResponse<T> {
            return {
                statusCode: request.status,
                data: this.parseResponse(request.responseText)
            };
        }

        private fail<T>(request: XMLHttpRequest): IResponse<T> {
            return {
                statusCode: request.status,
                data: this.parseResponse(request.responseText)
            };
        }

        public get<T>(url: string): Promise<IResponse<T>> {
            return new Promise<IResponse<T>>((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('GET', '/my/url', true);
                
                request.onload = () => {
                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        resolve(this.success(request));
                    } else {
                        // We reached our target server, but it returned an error
                        reject(this.fail(request));
                    }
                };
                
                request.onerror =() => {
                    // There was a connection error of some sort
                    reject(this.fail(request));
                };
                
                request.send();
            });
        }
    }
}