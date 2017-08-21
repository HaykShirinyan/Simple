/// <reference path="decorators.ts" />
/// <reference path="services/i-html-service.ts" />

namespace Simple {
    @view({
        name: 'simple-view'
    })
    export class View<T> {
        protected modelWatcher: Watcher;
        protected viewDataWatcher: Watcher;

        protected htmlService: Services.IHtmlService;

        public static viewName: string = 'simple-view';
        public selector: string;
        public viewData: any;
        public model: T;        

        constructor(
            htmlService: Services.IHtmlService
        ) {
            this.htmlService = htmlService;  
            
            this.modelWatcher = new Watcher(this, 'model');
            this.viewDataWatcher = new Watcher(this, 'viewData');
        }

        protected setPath(obj: any, path: string, value: any): any {
            let array = path.split('.');

            if (!obj) {
                obj = {};
            }

            for (let i = 0; i < array.length - 1; i++) {
                obj = obj[i] || {};
            }

            obj[array[array.length - 1]] = value;

            return obj;
        }

        public initializeContext(element: Element, model: T): void {
            this.model = model;
        }
    }
}