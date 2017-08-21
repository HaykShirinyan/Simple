/// <reference path="../../decorators.ts" />

namespace Simple.Services.Concrete {
    @injectable({
        name: '$htmlService'
    })
    export class HtmlService implements IHtmlService {
        private _document: Document = document;
        private _window: Window = window;

        public ready(func: () => void): void {
            if ((<any>this._document).attachEvent ? this._document.readyState === "complete" : this._document.readyState !== "loading"){
                func();
              } else {
                this._document.addEventListener('DOMContentLoaded', func);
              }
        }

        public addEventListener(name: string, callback: (...args: any[]) => void): void {
            this._window.addEventListener(name, callback);
        }

        public select(selector: string, context?: Element): Element {
            return context
                ? context.querySelector(selector)
                : this._document.querySelector(selector);
        }

        public selectAll(selector: string, context?: Element): NodeListOf<Element> {
            return context 
                ? context.querySelectorAll(selector)
                : this._document.querySelectorAll(selector);
        }  
        
        public craeteElement(name: string): Element {
            return this._document.createElement(name);
        }
    }
}