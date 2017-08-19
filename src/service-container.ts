

namespace Simple {
    export class ServiceContainer implements IServiceContainer {
        public services: IServiceItem[] = [];
        private _singletons: ISingleton[] = [];

        public register(name: string, service: Function, dependencies?: string[], singleton: boolean = false): Function {
            for (let i = 0; i < this.services.length; i++) {
                let item = this.services[i];

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
        }

        public addInstance(name: string, instance: any): any {
            this.register(name, instance, [], true);

            this._singletons.push({
                name: name,
                instance: instance
            });

            return instance;
        }

        private getSingletonInstance(name: string): any {
            for (let item of this._singletons) {
                if (item.name === name) {
                    return item.instance;
                }
            }

            return undefined;
        }

        private getSingleton<T>(item: IServiceItem): T {
            var singleton = this.getSingletonInstance(item.name);

            if (singleton) {
                return <T>singleton;
            }

            let instance = this.createInstance(item);

            this._singletons.push({
                name: item.name,
                instance: instance
            });

            return <T>instance;
        }

        private getDependencies(item: IServiceItem): any[] {
            let list = [];

            for (let dependency of item.depencencies) {
                list.push(this.get<any>(dependency));
            }

            return list;
        }

        private createInstance<T>(item: IServiceItem): T {
            let dependencies = this.getDependencies(item);

            let instance = Object.create(item.service.prototype);
            instance.constructor.apply(instance, dependencies);

            return <T>instance;
        }

        private getInstance<T>(item: IServiceItem): T {
            if (item.singleton) {
                return this.getSingleton<T>(item);
            }

            return this.createInstance<T>(item);
        }

        public get<T>(name: string): T {
            for (let item of this.services) {
                if (item.name === name) {
                    return this.getInstance<T>(item);
                }
            }

            throw new Error(`Service was not found. name: ${name}`);
        }
    }

    export interface IServiceContainer {
        services: IServiceItem[];
        register(name: string, service: Function, dependencies?: string[], singleton?: boolean): Function;
        addInstance(name: string, instance: any): any;
        get<T>(name: string): T;
    }

    export interface IServiceItem {
        name: string;
        service: Function
        depencencies: string[];
        singleton: boolean;
    }

    export interface ISingleton {
        name: string;
        instance: any;
    }
}