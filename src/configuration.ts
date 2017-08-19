/// <reference path="decorators.ts" />


namespace Simple {
    export class Configuration {
        private static _container: IServiceContainer;

        public static get container(): IServiceContainer {
            if (!Configuration._container) {
                Configuration._container = new ServiceContainer();
            }
            
            return Configuration._container
        }

        public static set container(value: IServiceContainer) {
            if (Configuration._container) {
                for (let item of Configuration._container.services) {
                    value.register(item.name, item.service, item.depencencies, item.singleton);
                }
            }

            Configuration._container = value;
        }   

        private static resolve<T>(name: string): T {
            return Configuration.container.get<T>(name);
        }
    }
}