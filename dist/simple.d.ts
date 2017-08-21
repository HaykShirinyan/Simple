declare namespace Simple {
    interface IView {
        name: string;
        selector?: string;
        dependencies?: string[];
    }
    interface IServiceInjection {
        name: string;
        dependencies?: string[];
        singleton?: boolean;
    }
    function injectable(injection: IServiceInjection): (target: Function) => void;
    function view<T extends View<any>>(injection: IView): (target: Function) => void;
}
declare namespace Simple {
    class Configuration {
        private static _container;
        static $views: IStringDictionary<string>;
        static container: IServiceContainer;
        private static resolve<T>(name);
    }
}
declare namespace Simple {
    class ServiceContainer implements IServiceContainer {
        services: IServiceItem[];
        private _singletons;
        register(name: string, service: Function, dependencies?: string[], singleton?: boolean): Function;
        addInstance(name: string, instance: any): any;
        private getSingletonInstance(name);
        private getSingleton<T>(item);
        private getDependencies(item);
        private createInstance<T>(item);
        private getInstance<T>(item);
        get<T>(name: string): T;
    }
    interface IServiceContainer {
        services: IServiceItem[];
        register(name: string, service: Function, dependencies?: string[], singleton?: boolean): Function;
        addInstance(name: string, instance: any): any;
        get<T>(name: string): T;
    }
    interface IServiceItem {
        name: string;
        service: Function;
        depencencies: string[];
        singleton: boolean;
    }
    interface ISingleton {
        name: string;
        instance: any;
    }
}
declare namespace Simple.Services {
    interface IHtmlService {
        ready(func: () => void): void;
        craeteElement(name: string): Element;
        addEventListener(name: string, callback: (...args: any[]) => void): void;
        select(selector: string, context?: Element): Element;
        selectAll(selector: string, context?: Element): NodeListOf<Element>;
    }
}
declare namespace Simple {
    class View<T> {
        protected modelWatcher: Watcher;
        protected viewDataWatcher: Watcher;
        protected htmlService: Services.IHtmlService;
        static viewName: string;
        selector: string;
        viewData: any;
        model: T;
        constructor(htmlService: Services.IHtmlService);
        protected setPath(obj: any, path: string, value: any): any;
        initializeContext(element: Element, model: T): void;
    }
}
declare namespace Simple {
    class ObservableArray extends Array<any> {
        private _copy;
        private _events;
        private _mutators;
        constructor(array: any[], callback: (index: number, value: any) => void);
        private extend();
        private extendFunction(key, func);
        private call(eventName, oldValue?, newValue?);
        addEventListener(name: string, event: (oldValue?: any[], newValue?: any[]) => void): void;
        addEventListeners(names: string[], event: (oldValue?: any[], newValue?: any[]) => void): void;
    }
}
declare namespace Simple {
    interface IStringDictionary<T> {
        [key: string]: T;
    }
}
declare namespace Simple {
    class Watcher {
        objectGraph: any;
        parent: any;
        valueChangedEvents: IStringDictionary<((oldValue?, newValue?) => void)[]>;
        constructor(parent: any, key: string);
        watch(path: string, callback: (oldValue?: any, newValue?: any) => void): void;
        private valueChanged(path, oldValue, newValue);
        private canUpdate(forceSet, oldValue, newValue);
        private isObject(value);
        private setObject(object, value, key, path);
        private resetObject(path);
        private watchArrayFunctions(path, observableArray);
        private setArray(object, value, key, path);
        private set(object, newValue, key, path, forceSet?);
        protected bind(object: any, key: string | number, path: string): void;
    }
}
declare namespace Simple.Rendering {
    interface IViewEngine {
        renderView(data: any): void;
    }
}
declare namespace Simple.Rendering.Concrete {
}
declare namespace Simple.Rendering.Views {
    class SimpleBind<T> extends View<T> {
        constructor(htmlService: Services.IHtmlService);
        initializeContext(element: Element, model: T): void;
    }
}
declare namespace Simple.Services {
    interface IHttpService {
        get<T>(url: string): Promise<IResponse<T>>;
    }
    interface IResponse<T> {
        statusCode: number;
        data?: T | string;
    }
}
declare namespace Simple.Services.Concrete {
    class HtmlService implements IHtmlService {
        private _document;
        private _window;
        ready(func: () => void): void;
        addEventListener(name: string, callback: (...args: any[]) => void): void;
        select(selector: string, context?: Element): Element;
        selectAll(selector: string, context?: Element): NodeListOf<Element>;
        craeteElement(name: string): Element;
    }
}
declare namespace Simple.Services.Concrete {
    class HttpService implements IHttpService {
        private parseResponse<T>(responseText);
        private success<T>(request);
        private fail<T>(request);
        get<T>(url: string): Promise<IResponse<T>>;
    }
}
