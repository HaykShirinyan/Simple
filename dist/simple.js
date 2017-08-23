var Simple;
(function (Simple) {
    function injectable(injection) {
        return function (target) {
            Simple.Configuration.container.register(injection.name, target, injection.dependencies, injection.singleton);
        };
    }
    Simple.injectable = injectable;
    function view(injection) {
        return function (target) {
            target.prototype.constructor.viewName = injection.name;
            Simple.Configuration.container.register(injection.name, target, injection.dependencies);
            Simple.Configuration.$views[injection.name] = injection.selector || injection.name;
        };
    }
    Simple.view = view;
})(Simple || (Simple = {}));
/// <reference path="decorators.ts" />
var Simple;
(function (Simple) {
    var Configuration = (function () {
        function Configuration() {
        }
        Object.defineProperty(Configuration, "container", {
            get: function () {
                if (!Configuration._container) {
                    Configuration._container = new Simple.ServiceContainer();
                    Configuration._container.addInstance('$serviceContainer', Configuration._container);
                }
                return Configuration._container;
            },
            set: function (value) {
                if (Configuration._container) {
                    for (var _i = 0, _a = Configuration._container.services; _i < _a.length; _i++) {
                        var item = _a[_i];
                        value.register(item.name, item.service, item.depencencies, item.singleton);
                    }
                }
                Configuration._container = value;
            },
            enumerable: true,
            configurable: true
        });
        Configuration.resolve = function (name) {
            return Configuration.container.get(name);
        };
        Configuration.$views = {};
        return Configuration;
    }());
    Simple.Configuration = Configuration;
})(Simple || (Simple = {}));
var Simple;
(function (Simple) {
    var ServiceContainer = (function () {
        function ServiceContainer() {
            this.services = [];
            this._singletons = [];
        }
        ServiceContainer.prototype.register = function (name, service, dependencies, singleton) {
            if (singleton === void 0) { singleton = false; }
            for (var i = 0; i < this.services.length; i++) {
                var item = this.services[i];
                if (item.name === name) {
                    item.service = service;
                    item.depencencies = dependencies || [];
                    item.singleton = singleton;
                    this.services[i] = item;
                    return service;
                }
            }
            this.services.push({
                name: name,
                service: service,
                depencencies: dependencies || [],
                singleton: singleton
            });
            return service;
        };
        ServiceContainer.prototype.addInstance = function (name, instance) {
            this.register(name, instance, [], true);
            this._singletons.push({
                name: name,
                instance: instance
            });
            return instance;
        };
        ServiceContainer.prototype.getSingletonInstance = function (name) {
            for (var _i = 0, _a = this._singletons; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.name === name) {
                    return item.instance;
                }
            }
            return undefined;
        };
        ServiceContainer.prototype.getSingleton = function (item) {
            var singleton = this.getSingletonInstance(item.name);
            if (singleton) {
                return singleton;
            }
            var instance = this.createInstance(item);
            this._singletons.push({
                name: item.name,
                instance: instance
            });
            return instance;
        };
        ServiceContainer.prototype.getDependencies = function (item) {
            var list = [];
            for (var _i = 0, _a = item.depencencies; _i < _a.length; _i++) {
                var dependency = _a[_i];
                list.push(this.get(dependency));
            }
            return list;
        };
        ServiceContainer.prototype.createInstance = function (item) {
            var dependencies = this.getDependencies(item);
            var instance = Object.create(item.service.prototype);
            instance.constructor.apply(instance, dependencies);
            return instance;
        };
        ServiceContainer.prototype.getInstance = function (item) {
            if (item.singleton) {
                return this.getSingleton(item);
            }
            return this.createInstance(item);
        };
        ServiceContainer.prototype.get = function (name) {
            for (var _i = 0, _a = this.services; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.name === name) {
                    return this.getInstance(item);
                }
            }
            throw new Error("Service was not found. name: " + name);
        };
        return ServiceContainer;
    }());
    Simple.ServiceContainer = ServiceContainer;
})(Simple || (Simple = {}));
/// <reference path="decorators.ts" />
/// <reference path="services/i-html-service.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Simple;
(function (Simple) {
    var View = (function () {
        function View(htmlService) {
            this.htmlService = htmlService;
            this.modelWatcher = new Simple.Watcher(this, 'model');
            this.viewDataWatcher = new Simple.Watcher(this, 'viewData');
        }
        View.prototype.setPath = function (obj, path, value) {
            var array = path.split('.');
            for (var i = 0; i < array.length - 1; i++) {
                obj = obj[array[i]] || {};
            }
            obj[array[array.length - 1]] = value;
            return obj;
        };
        View.prototype.initializeContext = function (element, model) {
            this.model = model;
        };
        View.viewName = 'simple-view';
        View = __decorate([
            Simple.view({
                name: 'simple-view'
            })
        ], View);
        return View;
    }());
    Simple.View = View;
})(Simple || (Simple = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Simple;
(function (Simple) {
    var ObservableArray = (function (_super) {
        __extends(ObservableArray, _super);
        function ObservableArray(array, callback) {
            var _this = _super.call(this) || this;
            _this._mutators = [
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse'
            ];
            _this._events = {};
            _this.extend();
            _this.filter;
            for (var index = 0; index < array.length; index++) {
                var value = array[index];
                _super.prototype.push.call(_this, value);
                _this._copy.push(value);
                callback(index, value);
            }
            return _this;
        }
        ObservableArray.prototype.extend = function () {
            for (var key in this) {
                var prop = this[key];
                if (typeof prop === 'function') {
                    this.extendFunction(key, prop);
                }
            }
        };
        ObservableArray.prototype.extendFunction = function (key, func) {
            var _this = this;
            this[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = func.apply(_this, args);
                _this.call(key, _this._copy, _this);
                if (_this._mutators.indexOf(key) > -1) {
                    _this._copy[key].apply(_this._copy, args);
                }
                return result;
            };
        };
        ObservableArray.prototype.call = function (eventName, oldValue, newValue) {
            var eventArray = this._events[eventName];
            if (eventArray) {
                for (var _i = 0, eventArray_1 = eventArray; _i < eventArray_1.length; _i++) {
                    var event_1 = eventArray_1[_i];
                    if (event_1) {
                        event_1(oldValue, newValue);
                    }
                }
            }
        };
        ObservableArray.prototype.addEventListener = function (name, event) {
            if (!Array.isArray(this._events[name])) {
                this._events[name] = [];
            }
            this._events[name].push(event);
        };
        ObservableArray.prototype.addEventListeners = function (names, event) {
            for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                var name_1 = names_1[_i];
                this.addEventListener(name_1, event);
            }
        };
        return ObservableArray;
    }(Array));
    Simple.ObservableArray = ObservableArray;
})(Simple || (Simple = {}));
/// <reference path="../utils/i-string-dictionary.ts" />
/// <reference path="observable-array.ts" />
var Simple;
(function (Simple) {
    var Watcher = (function () {
        function Watcher(parent, key) {
            this.parent = parent;
            this.objectGraph = {};
            this.valueChangedEvents = {};
            var value = parent[key];
            this.bind(parent, key, key);
            if (value) {
                this.set(parent, value, key, key, true);
            }
        }
        Watcher.prototype.watch = function (path, callback) {
            if (!Array.isArray(this.valueChangedEvents[path])) {
                this.valueChangedEvents[path] = [];
            }
            this.valueChangedEvents[path].push(callback);
        };
        Watcher.prototype.valueChanged = function (path, oldValue, newValue) {
            var callBackArray = this.valueChangedEvents[path];
            if (callBackArray) {
                for (var _i = 0, callBackArray_1 = callBackArray; _i < callBackArray_1.length; _i++) {
                    var callback = callBackArray_1[_i];
                    if (callback) {
                        callback(oldValue, newValue);
                    }
                }
            }
        };
        Watcher.prototype.canUpdate = function (forceSet, oldValue, newValue) {
            if (forceSet) {
                return true;
            }
            if (oldValue !== newValue) {
                return true;
            }
            return false;
        };
        Watcher.prototype.isObject = function (value) {
            if (value) {
                if (typeof value !== 'function' && typeof value !== 'string') {
                    if (Object.keys(value)) {
                        if (!Array.isArray(value)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        Watcher.prototype.setObject = function (object, value, key, path) {
            for (var child in value) {
                var childPath = path + '.' + child;
                this.bind(object[key], child, childPath);
                this.set(object[key], value[child], child, childPath, true);
            }
        };
        Watcher.prototype.resetObject = function (path) {
            var p = '.';
            for (var oldKey in this.objectGraph) {
                if (oldKey.indexOf(p) === 0 && oldKey.length > path.length) {
                    var oldValue = this.objectGraph[oldKey];
                    var newValue = undefined;
                    delete this.objectGraph[oldKey];
                    this.valueChanged(path, oldValue, newValue);
                }
            }
        };
        Watcher.prototype.watchArrayFunctions = function (path, observableArray) {
            var _this = this;
            observableArray.addEventListeners([
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse'
            ], function (oldValue, newValue) {
                _this.valueChanged(path, oldValue, newValue);
            });
            return observableArray;
        };
        Watcher.prototype.schedule = function (value, key, path) {
            var _this = this;
            var keyCount = Object.keys(value).length;
            var handler = window.setTimeout(function () {
                if (keyCount !== Object.keys(value).length) {
                    for (var prop in value) {
                        if (!Object.getOwnPropertyDescriptor(value, prop).get) {
                            var childPath = path + '.' + prop;
                            var currentValue = value[prop];
                            value[prop] = undefined;
                            _this.bind(value, prop, childPath);
                            _this.set(value, currentValue, prop, childPath, true);
                        }
                    }
                }
                window.clearTimeout(handler);
            }, 1);
        };
        Watcher.prototype.setArray = function (object, value, key, path) {
            var _this = this;
            return this.watchArrayFunctions(path, new Simple.ObservableArray(value, function (index, item) {
                var itemPath = path + "[" + index + "]";
                _this.bind(object[key], index, itemPath);
                _this.set(object[key], item, index, itemPath, true);
                for (var child in item) {
                    var childPath = path + "[" + index + "]." + child;
                    _this.bind(object[key][index], child, childPath);
                    _this.set(object[key][index][child], item[child], child, childPath, true);
                }
            }));
        };
        Watcher.prototype.set = function (object, newValue, key, path, forceSet) {
            if (forceSet === void 0) { forceSet = false; }
            var oldValue = this.objectGraph[path];
            var wasObject = this.isObject(oldValue);
            if (this.canUpdate(forceSet, oldValue, newValue)) {
                this.objectGraph[path] = newValue;
                this.valueChanged(path, oldValue, newValue);
                if (this.isObject(newValue)) {
                    this.setObject(object, newValue, key, path);
                }
                else if (wasObject) {
                    this.resetObject(path);
                }
                else if (Array.isArray(newValue)) {
                    this.objectGraph[path] = this.setArray(object, newValue, key, path);
                }
            }
        };
        Watcher.prototype.get = function (key, path) {
            var value = this.objectGraph[path];
            if (this.isObject(value)) {
                this.schedule(value, key, path);
            }
            return value;
        };
        Watcher.prototype.bind = function (object, key, path) {
            var _this = this;
            if (!(path in this.objectGraph)) {
                this.objectGraph[path] = object[key];
            }
            Object.defineProperty(object, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return _this.get(key, path);
                },
                set: function (value) {
                    _this.set(object, value, key, path);
                }
            });
        };
        return Watcher;
    }());
    Simple.Watcher = Watcher;
})(Simple || (Simple = {}));
/// <reference path="../../services/i-html-service.ts" />
var Simple;
(function (Simple) {
    var Rendering;
    (function (Rendering) {
        var Concrete;
        (function (Concrete) {
            var ViewEngine = (function () {
                function ViewEngine(htmlService, serviceContainer) {
                    this._htmlService = htmlService;
                    this._serviceContainer = serviceContainer;
                }
                ViewEngine.prototype.renderView = function (data) {
                    for (var key in Simple.Configuration.$views) {
                        var element = this._htmlService.select(Simple.Configuration.$views[key]);
                        if (element) {
                            var view_1 = this._serviceContainer.get(key);
                            view_1.initializeContext(element, data);
                        }
                    }
                };
                ViewEngine = __decorate([
                    Simple.injectable({
                        name: '$viewEngine',
                        singleton: true,
                        dependencies: [
                            '$htmlService',
                            '$serviceContainer'
                        ]
                    })
                ], ViewEngine);
                return ViewEngine;
            }());
        })(Concrete = Rendering.Concrete || (Rendering.Concrete = {}));
    })(Rendering = Simple.Rendering || (Simple.Rendering = {}));
})(Simple || (Simple = {}));
var Simple;
(function (Simple) {
    var Rendering;
    (function (Rendering) {
        var Views;
        (function (Views) {
            var SimpleBind = (function () {
                function SimpleBind(htmlService) {
                    this.htmlService = htmlService;
                }
                SimpleBind.prototype.setPath = function (obj, path, value) {
                    var array = path.split('.');
                    for (var i = 0; i < array.length - 1; i++) {
                        if (!obj[array[i]]) {
                            obj[array[i]] = {};
                        }
                        obj = obj[array[i]] || {};
                    }
                    obj[array[array.length - 1]] = value;
                };
                SimpleBind.prototype.initializeContext = function (viewContext, view) {
                    var elements = this.htmlService.selectAll('[simple-bind]', viewContext);
                    view.model = view.model || {};
                    view.viewData = view.viewData || {};
                    var _loop_1 = function (i) {
                        var element = elements[i];
                        var attr = element.getAttribute('simple-bind');
                        if (attr.indexOf('model.') === 0) {
                            view.modelWatcher.watch(attr, function (oldValue, newValue) {
                                element.textContent = newValue;
                            });
                            this_1.setPath(view.model, attr.substring('model.'.length), element.textContent);
                        }
                        else if (attr.indexOf('viewData.') === 0) {
                            view.viewDataWatcher.watch(attr, function (oldValue, newValue) {
                                element.textContent = newValue;
                            });
                            this_1.setPath(view.viewData, attr.substring('viewData.'.length), element.textContent);
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < elements.length; i++) {
                        _loop_1(i);
                    }
                };
                SimpleBind = __decorate([
                    Simple.view({
                        name: 'simple-bind',
                        selector: '[simple-bind]:not([simple-repeat] [simple-bind])'
                    })
                ], SimpleBind);
                return SimpleBind;
            }());
            Views.SimpleBind = SimpleBind;
        })(Views = Rendering.Views || (Rendering.Views = {}));
    })(Rendering = Simple.Rendering || (Simple.Rendering = {}));
})(Simple || (Simple = {}));
/// <reference path="../../decorators.ts" />
var Simple;
(function (Simple) {
    var Services;
    (function (Services) {
        var Concrete;
        (function (Concrete) {
            var HtmlService = (function () {
                function HtmlService() {
                    this._document = document;
                    this._window = window;
                }
                HtmlService.prototype.ready = function (func) {
                    if (this._document.attachEvent ? this._document.readyState === "complete" : this._document.readyState !== "loading") {
                        func();
                    }
                    else {
                        this._document.addEventListener('DOMContentLoaded', func);
                    }
                };
                HtmlService.prototype.addEventListener = function (name, callback) {
                    this._window.addEventListener(name, callback);
                };
                HtmlService.prototype.select = function (selector, context) {
                    return context
                        ? context.querySelector(selector)
                        : this._document.querySelector(selector);
                };
                HtmlService.prototype.selectAll = function (selector, context) {
                    return context
                        ? context.querySelectorAll(selector)
                        : this._document.querySelectorAll(selector);
                };
                HtmlService.prototype.craeteElement = function (name) {
                    return this._document.createElement(name);
                };
                HtmlService = __decorate([
                    Simple.injectable({
                        name: '$htmlService'
                    })
                ], HtmlService);
                return HtmlService;
            }());
            Concrete.HtmlService = HtmlService;
        })(Concrete = Services.Concrete || (Services.Concrete = {}));
    })(Services = Simple.Services || (Simple.Services = {}));
})(Simple || (Simple = {}));
/// <reference path="../../decorators.ts" />
/// <reference path="../i-http-service.ts" />
var Simple;
(function (Simple) {
    var Services;
    (function (Services) {
        var Concrete;
        (function (Concrete) {
            var HttpService = (function () {
                function HttpService() {
                }
                HttpService.prototype.parseResponse = function (responseText) {
                    if (responseText) {
                        return JSON.parse(responseText);
                    }
                    return responseText;
                };
                HttpService.prototype.success = function (request) {
                    return {
                        statusCode: request.status,
                        data: this.parseResponse(request.responseText)
                    };
                };
                HttpService.prototype.fail = function (request) {
                    return {
                        statusCode: request.status,
                        data: this.parseResponse(request.responseText)
                    };
                };
                HttpService.prototype.get = function (url) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        request.open('GET', '/my/url', true);
                        request.onload = function () {
                            if (request.status >= 200 && request.status < 400) {
                                // Success!
                                resolve(_this.success(request));
                            }
                            else {
                                // We reached our target server, but it returned an error
                                reject(_this.fail(request));
                            }
                        };
                        request.onerror = function () {
                            // There was a connection error of some sort
                            reject(_this.fail(request));
                        };
                        request.send();
                    });
                };
                HttpService = __decorate([
                    Simple.injectable({
                        name: '$httpService'
                    })
                ], HttpService);
                return HttpService;
            }());
            Concrete.HttpService = HttpService;
        })(Concrete = Services.Concrete || (Services.Concrete = {}));
    })(Services = Simple.Services || (Simple.Services = {}));
})(Simple || (Simple = {}));
//# sourceMappingURL=simple.js.map