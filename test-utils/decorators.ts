
/// <reference path="index.ts" />

function testMethod() {
    function getTestClass(target: any) : ITestClass {
        for (let test of Test.testClasses) {
            if (test.obj === target) {
                return test;
            }
        }

        return undefined;
    }

    function setTestClass(target: any): ITestClass {
        let t = getTestClass(target);

        if (!t) {
            let index = Test.testClasses.push({
                obj: target,
                children: []
            }) - 1;

            t = Test.testClasses[index];
        }

        return t;
    }

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let t = setTestClass(target);

        t.children.push({
            name: propertyKey,
            func: target[propertyKey]
        });
    };
} 