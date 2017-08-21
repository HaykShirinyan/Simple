/// <reference path="../../test-utils/index.d.ts" />
/// <reference path="../../dist/simple.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WatcherSpec = (function () {
    function WatcherSpec() {
    }
    WatcherSpec.prototype.watch_wasCalled_simpleProps = function () {
        var view = {}, firstNameCalled = 0, lastNameCalled = 0, numberCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        view.model = {
            firstName: 'First Name',
            lastName: 'Last Name',
            number: 1
        };
        watcher.watch('model.firstName', function (oldValue, newValue) {
            firstNameCalled++;
        });
        watcher.watch('model.lastName', function (oldValue, newValue) {
            lastNameCalled++;
        });
        watcher.watch('model.number', function (oldValue, newValue) {
            numberCalled++;
        });
        view.model.firstName += ' changed';
        view.model.lastName += ' changed';
        view.model.number = 2;
        Assert.areEqual(1, firstNameCalled);
        Assert.areEqual(1, lastNameCalled);
        Assert.areEqual(1, numberCalled);
        view.model.firstName = String(view.model.firstName); // stays the same
        view.model.lastName += ' changed again';
        view.model.number = 3;
        Assert.areEqual(1, firstNameCalled);
        Assert.areEqual(2, lastNameCalled);
        Assert.areEqual(2, numberCalled);
    };
    WatcherSpec.prototype.watch_simpleProps = function () {
        var view = {};
        var watcher = new Simple.Watcher(view, 'model');
        view.model = {
            firstName: 'First Name',
            lastName: 'Last Name',
            number: 1
        };
        watcher.watch('model.firstName', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        watcher.watch('model.lastName', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        watcher.watch('model.number', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        view.model.firstName += ' changed';
        view.model.lastName += ' changed';
        view.model.number = 2;
    };
    WatcherSpec.prototype.watch_wasCalled_object = function () {
        var view = {}, firstSecondThirdCalled = 0, secondThirdCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        view.model = {
            first: {
                second: {
                    third: 'first.second.third'
                }
            },
            second: {
                third: 'second.third'
            }
        };
        watcher.watch('model.first.second.third', function (oldValue, newValue) {
            firstSecondThirdCalled++;
        });
        watcher.watch('model.second', function (oldValue, newValue) {
            secondThirdCalled++;
        });
        view.model.first.second.third += ' changed';
        view.model.second = 'changed';
        Assert.areEqual(1, firstSecondThirdCalled);
        Assert.areEqual(1, secondThirdCalled);
        view.model.first.second.third += ' changed again';
        Assert.areEqual(2, firstSecondThirdCalled);
        view.model.first.second.third = String(view.model.first.second.third);
        Assert.areEqual(2, firstSecondThirdCalled);
    };
    WatcherSpec.prototype.watch_object = function () {
        var view = {}, firstSecondThirdCalled = 0, secondThirdCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        view.model = {
            first: {
                second: {
                    third: 'first.second.third'
                }
            },
            second: {
                third: 'second.third'
            }
        };
        watcher.watch('model.first.second.third', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        watcher.watch('model.second', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        view.model.first.second.third += ' changed';
        view.model.second = 'changed';
    };
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_wasCalled_simpleProps", null);
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_simpleProps", null);
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_wasCalled_object", null);
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_object", null);
    return WatcherSpec;
}());
/// <reference path="../../../test-utils/index.d.ts" />
/// <reference path="../../../dist/simple.d.ts" />
var SimpleBindSpec = (function () {
    function SimpleBindSpec() {
    }
    SimpleBindSpec.prototype.initializeContext = function () {
        var HtmlService = new Simple.Services.Concrete.HtmlService();
        var bind = new Simple.Rendering.Views.SimpleBind(HtmlService);
        var element = HtmlService.craeteElement('p');
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';
        bind.initializeContext(element, undefined);
        Assert.isTruthy(bind.model);
        Assert.areEqual(bind.model.name, 'test');
    };
    SimpleBindSpec.prototype.initializeContext_valueChanged = function () {
        var HtmlService = new Simple.Services.Concrete.HtmlService();
        var bind = new Simple.Rendering.Views.SimpleBind(HtmlService);
        var element = HtmlService.craeteElement('p');
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';
        bind.initializeContext(element, undefined);
        bind.model.name = 'changed';
        Assert.areEqual(bind.model.name, element.textContent);
    };
    __decorate([
        testMethod()
    ], SimpleBindSpec.prototype, "initializeContext", null);
    __decorate([
        testMethod()
    ], SimpleBindSpec.prototype, "initializeContext_valueChanged", null);
    return SimpleBindSpec;
}());
/// <reference path="../test-utils/index.d.ts" />
/// <reference path="data-binding/watcher.spec.ts" />
/// <reference path="rendering/views/simple-bind.ts" />
Test.run();
//# sourceMappingURL=simple.spec.js.map