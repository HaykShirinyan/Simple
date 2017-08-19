
namespace Simple {
    export class ObservableArray {
        private _array: any[];
        private _events: IStringDictionary<((result, ...args: any[]) => void)[]>;
    
        constructor(array: any[]) {
            this._events = {};
    
            this._array=array;
    
            this.extend();
        }
    
        private extend(): void {
            for (var key in this._array) {
                let prop = this[key];
    
                if (typeof prop === 'function') {
                    this[key] = (...args: any[]) => {
                        let result = prop.apply(this, args);
    
                        this.call(key, result, args);
                        
                        return result;
                    }
                }
            }
        }
    
        private call(eventName: string, result: any, ...args: any[]): void {
            let eventArray = this._events[eventName];
    
            if (eventArray) {
                for (let event of eventArray) {
                    if (event) {
                        event(result, args);
                    }
                }
            }
        }
    
        public addEventListener(name: string, event: (result: any, ...args: any[]) => void): void {
            if (!Array.isArray(this._events[name])) {
                this._events[name] = [];
            }
    
            this._events[name].push(event);
        }
    }
}