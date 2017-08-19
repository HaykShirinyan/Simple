declare namespace Simple {
    interface IServiceInjection {
        name: string;
        dependencies?: string[];
        singleton?: boolean;
    }
    function injectable(injection: IServiceInjection): (target: Function) => void;
}
declare namespace Simple {
    class Configuration {
        private static _container;
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
