
namespace Simple {
    export interface IView {
        name: string;
        selector?: string;
        dependencies?: string[];
    }

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

    export function view<T extends View<any>>(injection: IView) {
        return function (target: Function) {
            target.prototype.constructor.viewName = injection.name;

            Configuration.container.register(injection.name, target, injection.dependencies);
            Configuration.$views[injection.name] = injection.selector || injection.name;
        }
    }
}