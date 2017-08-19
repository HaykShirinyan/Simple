var Simple;
(function (Simple) {
    function injectable(injection) {
        return function (target) {
            Simple.Configuration.container.register(injection.name, target, injection.dependencies, injection.singleton);
        };
    }
    Simple.injectable = injectable;
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
            this.bind(parent, key, key);
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
        Watcher.prototype.bind = function (object, key, path) {
            var _this = this;
            if (!(path in this.objectGraph)) {
                this.objectGraph[path] = object[key];
            }
            Object.defineProperty(object, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return _this.objectGraph[path];
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
//# sourceMappingURL=simple.js.map