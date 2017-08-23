/// <reference path="../utils/i-string-dictionary.ts" />
/// <reference path="observable-array.ts" />

namespace Simple {
    export class Watcher {
        public objectGraph: any;
        public parent: any;
        public valueChangedEvents: IStringDictionary<((oldValue?, newValue?) => void)[]>;

        constructor(parent: any, key: string) {
            this.parent = parent;
            this.objectGraph = {};
            this.valueChangedEvents = {}; 

            let value = parent[key];

            this.bind(parent, key, key);

            if (value) {
                this.set(parent, value, key, key, true);
            }
        }

        public watch(path: string, callback: (oldValue?: any, newValue?: any) => void) {
            if (!Array.isArray(this.valueChangedEvents[path])) {
                this.valueChangedEvents[path] = [];
            }

            this.valueChangedEvents[path].push(callback);
        }

        private valueChanged(path: string, oldValue: any, newValue: any): void {
            let callBackArray = this.valueChangedEvents[path];

            if (callBackArray) {
                for (let callback of callBackArray) {
                    if (callback) {
                        callback(oldValue, newValue);
                    }
                }
            }
        }

        private canUpdate(forceSet: boolean, oldValue: any, newValue: any): boolean {
            if (forceSet) {
                return true;
            }

            if (oldValue !== newValue) {
                return true;
            }

            return false;
        }

        private isObject(value: any): boolean {
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
        }

        private setObject(object: any, value: any, key: string | number, path: string): void {
            for (let child in value) {
                let childPath = path + '.' + child;

                this.bind(object[key], child, childPath);
                this.set(object[key], value[child], child, childPath, true);
            }
        }

        private resetObject(path: string): void {
            let p = '.';

            for (let oldKey in this.objectGraph) {
                if (oldKey.indexOf(p) === 0 && oldKey.length > path.length) {
                    let oldValue = this.objectGraph[oldKey];
                    let newValue = undefined;

                    delete this.objectGraph[oldKey];
                    this.valueChanged(path, oldValue, newValue);
                }
            }
        }

        private watchArrayFunctions( path: string, observableArray: ObservableArray): any[] {
            observableArray.addEventListeners([
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse'
            ], (oldValue, newValue) => {
                this.valueChanged(path, oldValue, newValue);
            });

            return observableArray;
        }

        private schedule(value: any, key: string | number, path: string): void {
            let keyCount = Object.keys(value).length;
            
            let handler = window.setTimeout(() => {
                if (keyCount !== Object.keys(value).length) {
                    for (let prop in value) {
                        if (!Object.getOwnPropertyDescriptor(value, prop).get) {
                            let childPath = path + '.' + prop;

                            let currentValue = value[prop];                            
                            value[prop] = undefined;
                            
                            this.bind(value, prop, childPath);
                            this.set(value, currentValue, prop, childPath, true);
                        }
                    }
                }
                
                window.clearTimeout(handler);
            }, 1);
        }

        private setArray(object: any, value: any[], key: string | number, path: string): any[] {    
            return this.watchArrayFunctions(path, new ObservableArray(value, (index, item) => {
                let itemPath = `${path}[${index}]`;
                
                this.bind(object[key], index, itemPath);
                this.set(object[key], item, index, itemPath, true);

                for (let child in item) {
                    let childPath = `${path}[${index}].${child}`;

                    this.bind(object[key][index], child, childPath);
                    this.set(object[key][index][child], item[child], child, childPath, true);
                }
            }));
        }

        private set(object: any, newValue: any, key: string | number, path: string, forceSet = false): void {
            let oldValue = this.objectGraph[path];
            let wasObject = this.isObject(oldValue);

            if (this.canUpdate(forceSet, oldValue, newValue)) {
                this.objectGraph[path] = newValue;
                this.valueChanged(path, oldValue, newValue);

                if (this.isObject(newValue)) {
                    this.setObject(object, newValue, key, path);
                } else if (wasObject) {
                    this.resetObject(path);
                } else if (Array.isArray(newValue)) {
                    this.objectGraph[path] = this.setArray(object, newValue, key, path);
                }
            }
        }

        private get(key: string | number, path: string): any {
            let value = this.objectGraph[path];

            if (this.isObject(value)) {
                this.schedule(value, key, path);
            }

            return value;
        }

        protected bind(object: any, key: string | number, path: string): void {
            if (!(path in this.objectGraph)) {
                this.objectGraph[path] = object[key];
            }

            Object.defineProperty(object, key, {
                enumerable: true,
                configurable: true,
                get: () => {
                    return this.get(key, path);
                },
                set: value => {
                    this.set(object, value, key, path);
                }
            });
        }
    }
}