
namespace Simple {
    export interface IServiceInjection {
        name: string;
        dependencies?: string[];
        singleton?: boolean;
    }

    export function injectable(injection: IServiceInjection) {
        return function (target: Function) {
            Configuration.container.register(injection.name, target, injection.dependencies, injection.singleton);
        }
    }
}