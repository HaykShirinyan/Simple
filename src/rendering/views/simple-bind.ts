
namespace Simple.Rendering.Views {
    @view({
        name: 'simple-bind',
        selector: '[simple-bind]:not([simple-repeat] [simple-bind])'
    })
    export class SimpleBind<T> extends View<T> {
        constructor(htmlService: Services.IHtmlService) {
            super(htmlService);
        }

        public initializeContext(element: Element, model: T): void {
            super.initializeContext(element, model);

            let attr = element.getAttribute(SimpleBind.viewName);
            
            if (this.model) {
                if (attr.indexOf('model.') === 0) {
                    this.modelWatcher.watch(attr, (oldValue, newValue) => {
                        element.textContent = newValue;
                    });
                } else if (attr.indexOf('viewData.') === 0) {
                    this.viewDataWatcher.watch(attr, (oldValue, newValue) => {
                        element.textContent = newValue;
                    });
                }
            } else {
                if (attr.indexOf('model.') === 0) {
                    this.model = this.setPath(this.model, attr, element.textContent);
                } else if (attr.indexOf('viewData.') === 0) {
                    this.viewData = this.setPath(this.viewData, attr, element.textContent);
                }

                this.initializeContext(element, this.model);
            }
        }
    }
}