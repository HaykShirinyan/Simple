/// <reference path="../../test-utils/index.d.ts" />
/// <reference path="../../dist/simple.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WatcherSpec = (function () {
    function WatcherSpec() {
    }
    WatcherSpec.prototype.watch_wasCalled_simpleProps = function () {
        var view = {
            model: {
                firstName: 'First Name',
                lastName: 'Last Name',
                number: 1
            }
        }, firstNameCalled = 0, lastNameCalled = 0, numberCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
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
        var view = {
            model: {
                firstName: 'First Name',
                lastName: 'Last Name',
                number: 1
            }
        };
        var watcher = new Simple.Watcher(view, 'model');
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
        var view = {
            model: {
                first: {
                    second: {
                        third: 'first.second.third'
                    }
                },
                second: {
                    third: 'second.third'
                }
            }
        }, firstSecondThirdCalled = 0, secondThirdCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
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
        var view = {
            model: {
                first: {
                    second: {
                        third: 'first.second.third'
                    }
                },
                second: {
                    third: 'second.third'
                }
            }
        }, firstSecondThirdCalled = 0, secondThirdCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        watcher.watch('model.first.second.third', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        watcher.watch('model.second', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
        });
        view.model.first.second.third += ' changed';
        view.model.second = 'changed';
    };
    WatcherSpec.prototype.watch_propAdded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var view, newValueCalled, watcher;
            return __generator(this, function (_a) {
                view = {
                    model: {}
                }, newValueCalled = 0;
                watcher = new Simple.Watcher(view, 'model');
                watcher.watch('model.first', function (oldValue, newValue) {
                    Assert.areNotEqual(oldValue, newValue);
                    newValueCalled++;
                });
                view.model.first = new Date();
                Assert.delay(function () { return Assert.areNotEqual(0, newValueCalled); }, 10);
                return [2 /*return*/];
            });
        });
    };
    WatcherSpec.prototype.watch_array_childChanges = function () {
        var view = {
            model: {
                items: [
                    {
                        name: 'Name',
                        age: 20
                    }
                ]
            }
        }, nameCalled = 0, ageCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        watcher.watch('model.items[0].name', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
            nameCalled++;
        });
        watcher.watch('model.items[0].age', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
            ageCalled++;
        });
        view.model.items[0].name += ' changed';
        view.model.items[0].age += 5;
        Assert.areNotEqual(0, nameCalled);
        Assert.areNotEqual(0, ageCalled);
    };
    WatcherSpec.prototype.watch_array_methodCalled = function () {
        var view = {
            model: {
                items: [
                    {
                        key: 1
                    },
                    {
                        key: 2
                    },
                    {
                        key: 3
                    }
                ]
            }
        }, methodCalled = 0;
        var watcher = new Simple.Watcher(view, 'model');
        watcher.watch('model.items', function (oldValue, newValue) {
            Assert.areNotEqual(oldValue, newValue);
            methodCalled++;
        });
        view.model.items.push({
            key: 4
        });
        view.model.items.pop();
        view.model.items.shift();
        view.model.items.unshift({
            key: 5
        });
        view.model.items.splice(0, 1);
        view.model.items.sort();
        view.model.items.reverse();
        Assert.areEqual(7, methodCalled);
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
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_propAdded", null);
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_array_childChanges", null);
    __decorate([
        testMethod()
    ], WatcherSpec.prototype, "watch_array_methodCalled", null);
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
        var view = new Simple.View(HtmlService);
        var viewContext = HtmlService.craeteElement('div');
        var element = HtmlService.craeteElement('p');
        element.setAttribute('simple-bind', 'model.name');
        element.textContent = 'test';
        viewContext.appendChild(element);
        bind.initializeContext(viewContext, view);
        Assert.isTruthy(view.model);
        Assert.areEqual(view.model.name, 'test');
    };
    SimpleBindSpec.prototype.initializeContext_valueChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var HtmlService, bind, view, viewContext, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        HtmlService = new Simple.Services.Concrete.HtmlService();
                        bind = new Simple.Rendering.Views.SimpleBind(HtmlService);
                        view = new Simple.View(HtmlService);
                        viewContext = HtmlService.craeteElement('div');
                        element = HtmlService.craeteElement('p');
                        element.setAttribute('simple-bind', 'model.name.first');
                        element.textContent = 'test';
                        viewContext.appendChild(element);
                        bind.initializeContext(viewContext, view);
                        view.model.name.first = 'changed';
                        return [4 /*yield*/, Assert.delay(function () { return Assert.areEqual(view.model.name.first, element.textContent); }, 10)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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