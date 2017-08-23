/// <reference path="../../../test-utils/index.d.ts" />
/// <reference path="../../../dist/simple.d.ts" />

class SimpleBindSpec {
    @testMethod()
    public initializeContext(): void {
        let HtmlService = new Simple.Services.Concrete.HtmlService();
        let bind = new Simple.Rendering.Views.SimpleBind<any>(HtmlService);
        let view = new Simple.View<any>(HtmlService);
        
        let viewContext = HtmlService.craeteElement('div');
        let element = HtmlService.craeteElement('p');
        
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';
        viewContext.appendChild(element);

        bind.initializeContext(viewContext, view);

        Assert.isTruthy(view.model);
        Assert.areEqual(view.model.name, 'test');
    }

    @testMethod()
    public initializeContext_valueChanged() {
        let HtmlService = new Simple.Services.Concrete.HtmlService();
        let bind = new Simple.Rendering.Views.SimpleBind<any>(HtmlService);
        let view = new Simple.View<any>(HtmlService);
        
        let viewContext = HtmlService.craeteElement('div');
        let element = HtmlService.craeteElement('p');
        
        element.setAttribute('simple-bind', 'model.name.first');
        element.textContent = 'test';
        viewContext.appendChild(element);

        bind.initializeContext(viewContext, view);
        view.model.name.first = 'changed';
        
        window.setTimeout(() =>  Assert.areEqual(view.model.name.first, element.textContent), 10);
    }
}