/// <reference path="../../services/i-html-service.ts" />

namespace Simple.Rendering.Concrete {
    @injectable({
        name: '$viewEngine',
        singleton: true,
        dependencies: [
            '$htmlService',
            '$serviceContainer'
        ]
    })
    class ViewEngine implements IViewEngine {
        private _htmlService: Services.IHtmlService;
        private _serviceContainer: IServiceContainer;

        constructor(
            htmlService: Services.IHtmlService,
            serviceContainer: IServiceContainer
        ) {
            this._htmlService = htmlService;
            this._serviceContainer = serviceContainer;
        }

        public renderView(data: any): void {
            for (let key in Configuration.$views) {
                let element = this._htmlService.select(Configuration.$views[key]);

                if (element) {
                    let view = this._serviceContainer.get<View<any>>(key);

                    view.initializeContext(element, data);
                }
            }
        }
    }
}