
namespace Simple {
    export class ObservableArray extends Array<any> {
        private _copy: any[];
        private _events: IStringDictionary<((oldValue?: any[], newValue?: any[]) => void)[]>;

        private _mutators = [
            'push',
            'pop',
            'shift',
            'unshift',
            'splice',
            'sort',
            'reverse'
        ];
    
        constructor(array: any[], callback: (index: number, value: any) => void) {
            super();
            this._events = {};    
    
            this.extend();
            this.filter
            for (let index = 0; index < array.length; index++) {
                let value = array[index];
                
                super.push(value);
                this._copy.push(value);

                callback(index, value);
            }
        }
    
        private extend(): void {
            for (var key in this) {
                let prop = this[key];
    
                if (typeof prop === 'function') {
                    this.extendFunction(key, prop);
                }
            }
        }

        private extendFunction(key: string, func: Function): void {
            this[key] = (...args: any[]) => {     
                let result = func.apply(this, args);

                this.call(key, this._copy, this);

                if (this._mutators.indexOf(key) > -1) {
                    this._copy[key].apply(this._copy, args);
                }
                
                return result;
            }
        }
    
        private call(eventName: string, oldValue?: any[], newValue?: any[]): void {
            let eventArray = this._events[eventName];
    
            if (eventArray) {
                for (let event of eventArray) {
                    if (event) {
                        event(oldValue, newValue);
                    }
                }
            }
        }

        public addEventListener(name: string, event: (oldValue?: any[], newValue?: any[]) => void): void {
            if (!Array.isArray(this._events[name])) {
                this._events[name] = [];
            }
    
            this._events[name].push(event);
        }

        public addEventListeners(names: string[], event: (oldValue?: any[], newValue?: any[]) => void): void {
            for (let name of names) {
                this.addEventListener(name, event);
            }
        }
    }
}