/// <reference path="../../../test-utils/index.d.ts" />
/// <reference path="../../../dist/simple.d.ts" />

class SimpleBindSpec {
    @testMethod()
    public initializeContext(): void {
        let HtmlService = new Simple.Services.Concrete.HtmlService();
        let bind = new Simple.Rendering.Views.SimpleBind<any>(HtmlService);
        
        let element = HtmlService.craeteElement('p');
        
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';

        bind.initializeContext(element, undefined);

        Assert.isTruthy(bind.model);
        Assert.areEqual(bind.model.name, 'test');
    }

    @testMethod()
    public initializeContext_valueChanged() {
        let HtmlService = new Simple.Services.Concrete.HtmlService();
        let bind = new Simple.Rendering.Views.SimpleBind<any>(HtmlService);
        
        let element = HtmlService.craeteElement('p');
        
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';

        bind.initializeContext(element, undefined);
        bind.model.name = 'changed';
        
        Assert.areEqual(bind.model.name, element.textContent);
    }
}