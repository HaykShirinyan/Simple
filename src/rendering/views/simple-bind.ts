
namespace Simple.Rendering.Views {
    @view({
        name: 'simple-bind',
        selector: '[simple-bind]:not([simple-repeat] [simple-bind])'
    })
    export class SimpleBind<T> {
        public static viewName: string;
        protected htmlService: Services.IHtmlService;

        constructor(htmlService: Services.IHtmlService) {
            this.htmlService = htmlService;
        }

        protected setPath(obj: any, path: string, value: any): void {
            let array = path.split('.');

            for (let i = 0; i < array.length - 1; i++) {
                if (!obj[array[i]]) {
                    obj[array[i]] = {};
                }

                obj = obj[array[i]] || {};
            }

            obj[array[array.length - 1]] = value;
        }

        public initializeContext(viewContext: Element, view: View<T>): void {
            let elements = this.htmlService.selectAll('[simple-bind]', viewContext);
            view.model = view.model || <T>{};
            view.viewData = view.viewData || {};

            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                let attr = element.getAttribute('simple-bind');

                if (attr.indexOf('model.') === 0) {
                    view.modelWatcher.watch(attr, (oldValue, newValue) => {
                        element.textContent = newValue;
                    });
                    
                    this.setPath(view.model, attr.substring('model.'.length), element.textContent);
                } else if (attr.indexOf('viewData.') === 0) {
                    view.viewDataWatcher.watch(attr, (oldValue, newValue) => {
                        element.textContent = newValue;
                    });

                    this.setPath(view.viewData, attr.substring('viewData.'.length), element.textContent);
                }
            }
        }
    }
}