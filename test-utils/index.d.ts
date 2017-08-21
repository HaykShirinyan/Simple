declare class Test {
    static testClasses: ITestClass[];
    private static addClass(el, className);
    private static addTestGroup(body, name);
    private static addTest(testGroup, name);
    private static pass(testSection);
    private static fail(testSection, e);
    static run(): void;
}
declare class Assert {
    static fail(message?: string): void;
    static areEqual(expected: any, actual: any, message?: string): void;
    static areNotEqual(expected: any, actual: any, message?: string): void;
    static isTrue(value: boolean, message?: string): void;
    static isFalse(value: boolean, message?: string): void;
    static isTruthy(value: any, message?: string): void;
    static isFalsy(value: any, message?: string): void;
}
interface ITestClass {
    obj: Function;
    children?: ITestMethod[];
}
interface ITestMethod {
    name: string;
    func: () => void;
}
declare function testMethod(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
