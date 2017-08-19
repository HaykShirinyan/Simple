declare class Test {
    static testClasses: ITestClass[];
    static errors: Error[];
    private static checkErrors();
    static run(): void;
}
declare class Assert {
    private static error(message?);
    static areEqual(expected: any, actual: any, message?: string): void;
    static areNotEqual(expected: any, actual: any, message?: string): void;
    static isTrue(value: boolean, message?: string): void;
    static isFalse(value: boolean, message?: string): void;
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
