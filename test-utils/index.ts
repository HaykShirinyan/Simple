

class Test {
    public static testClasses: ITestClass[] = [];

    private static addClass(el: Element, className: string): void {
        if (el.classList)
            el.classList.add(className);
          else
            el.className += ' ' + className;
    }

    private static addTestGroup(body: Element, name: string): Element {
        let testGroup = document.createElement('section');
        let testTitle = document.createElement('h1');

        Test.addClass(testGroup, 'test-group');
        Test.addClass(testTitle, 'title');

        testTitle.textContent = name;

        testGroup.appendChild(testTitle);
        body.appendChild(testGroup);

        return testGroup;
    }

    private static addTest(testGroup: Element, name: string): Element {
        let testSection = document.createElement('section');
        let title = document.createElement('h2');

        Test.addClass(testSection, 'test');
        Test.addClass(title, 'title');

        title.textContent = name;

        testSection.appendChild(title);
        testGroup.appendChild(testSection);

        return testSection;
    }

    private static pass(testSection: Element): void {
        let pass = document.createElement('span');

        Test.addClass(pass, 'passed');
        pass.textContent = "Passed";

        testSection.appendChild(pass);
    }

    private static fail(testSection: Element, e: Error): void {
        let fail = document.createElement('span');
        let error = document.createElement('p');       
        
        Test.addClass(fail, 'failed');
        Test.addClass(error, 'error');

        fail.textContent = "Failed";
        error.textContent = e.stack;

        testSection.appendChild(fail);
        testSection.appendChild(error);
    }

    public static run(): void {
        let body = document.querySelector('body');

        for (let test of Test.testClasses) {
            let instance = Object.create(test.obj);
            instance.constructor.apply(instance);
            
            let testGroup = Test.addTestGroup(body, instance.constructor.name);

            for (let child of test.children) {
                let testSection = Test.addTest(testGroup, child.name);

                try {
                    child.func.apply(instance);
                    Test.pass(testSection);
                } catch (e) {
                    Test.fail(testSection, e);
                }                
            }
        }
    }
}

class Assert {   
    public static fail(message?: string): void {
        throw new Error(message);
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