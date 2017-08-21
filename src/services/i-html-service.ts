

namespace Simple.Services {
    export interface IHtmlService {
        ready(func: ()=> void): void;
        craeteElement(name: string): Element;
        addEventListener(name: string, callback: (...args: any[]) => void): void;
        select(selector: string, context?: Element): Element;
        selectAll(selector: string, context?: Element): NodeListOf<Element>;
    }
}