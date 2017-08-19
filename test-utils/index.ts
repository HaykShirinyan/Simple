

class Test {
    public static testClasses: ITestClass[] = [];
    public static errors: Error[] = [];

    private static checkErrors() {
        for (let error of Test.errors) {
            console.log(error.stack);
        }
    }

    public static run(): void {
        let body = document.querySelector('body');

        for (let test of Test.testClasses) {
            let instance = Object.create(test.obj);
            instance.constructor.apply(instance);

            for (let child of test.children) {
                let title = document.createElement('h2');
                title.textContent = child.name;
                body.appendChild(title);

                try {
                    child.func.apply(instance);

                    let pass = document.createElement('span');
                    pass.textContent = "Passed";
                    body.appendChild(pass);
                } catch (e) {
                    let error = document.createElement('p');
                    error.textContent = e.stack;
                    error.style.color = 'red';
                    body.appendChild(error);
                }                
            }
        }

        //Test.checkErrors();
    }
}

class Assert {   
    private static error(message?: string): void {
        Test.errors.push();
    }

    public static areEqual(expected: any, actual: any, message?: string): void {
        if (expected !== actual) {
            throw new Error(message)
        }
    }

    public static areNotEqual(expected: any, actual: any, message?: string): void {
        if (expected === actual) {
            throw new Error(message)
        }
    }

    public static isTrue(value: boolean, message?: string): void {
        if (!value) {
            throw new Error(message);
        } 
    }

    public static isFalse(value: boolean, message?: string): void {
        if (value) {
            throw new Error(message);
        }
    }
}

interface ITestClass {
    obj: Function;
    children?: ITestMethod[];
}

interface ITestMethod {
    name: string;
    func: () => void;
}