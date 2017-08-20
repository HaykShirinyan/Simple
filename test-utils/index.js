var Test = (function () {
    function Test() {
    }
    Test.addClass = function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    };
    Test.addTestGroup = function (body, name) {
        var testGroup = document.createElement('section');
        var testTitle = document.createElement('h1');
        Test.addClass(testGroup, 'test-group');
        Test.addClass(testTitle, 'title');
        testTitle.textContent = name;
        testGroup.appendChild(testTitle);
        body.appendChild(testGroup);
        return testGroup;
    };
    Test.addTest = function (testGroup, name) {
        var testSection = document.createElement('section');
        var title = document.createElement('h2');
        Test.addClass(testSection, 'test');
        Test.addClass(title, 'title');
        title.textContent = name;
        testSection.appendChild(title);
        testGroup.appendChild(testSection);
        return testSection;
    };
    Test.pass = function (testSection) {
        var pass = document.createElement('span');
        Test.addClass(pass, 'passed');
        pass.textContent = "Passed";
        testSection.appendChild(pass);
    };
    Test.fail = function (testSection, e) {
        var fail = document.createElement('span');
        var error = document.createElement('p');
        Test.addClass(fail, 'failed');
        Test.addClass(error, 'error');
        fail.textContent = "Failed";
        error.textContent = e.stack;
        testSection.appendChild(fail);
        testSection.appendChild(error);
    };
    Test.run = function () {
        var body = document.querySelector('body');
        for (var _i = 0, _a = Test.testClasses; _i < _a.length; _i++) {
            var test = _a[_i];
            var instance = Object.create(test.obj);
            instance.constructor.apply(instance);
            var testGroup = Test.addTestGroup(body, instance.constructor.name);
            for (var _b = 0, _c = test.children; _b < _c.length; _b++) {
                var child = _c[_b];
                var testSection = Test.addTest(testGroup, child.name);
                try {
                    child.func.apply(instance);
                    Test.pass(testSection);
                }
                catch (e) {
                    Test.fail(testSection, e);
                }
            }
        }
    };
    Test.testClasses = [];
    return Test;
}());
var Assert = (function () {
    function Assert() {
    }
    Assert.fail = function (message) {
        throw new Error(message);
    };
    Assert.areEqual = function (expected, actual, message) {
        if (expected !== actual) {
            throw new Error(message);
        }
    };
    Assert.areNotEqual = function (expected, actual, message) {
        if (expected === actual) {
            throw new Error(message);
        }
    };
    Assert.isTrue = function (value, message) {
        if (!value) {
            throw new Error(message);
        }
    };
    Assert.isFalse = function (value, message) {
        if (value) {
            throw new Error(message);
        }
    };
    return Assert;
}());
/// <reference path="index.ts" />
function testMethod() {
    function getTestClass(target) {
        for (var _i = 0, _a = Test.testClasses; _i < _a.length; _i++) {
            var test = _a[_i];
            if (test.obj === target) {
                return test;
            }
        }
        return undefined;
    }
    function setTestClass(target) {
        var t = getTestClass(target);
        if (!t) {
            var index = Test.testClasses.push({
                obj: target,
                children: []
            }) - 1;
            t = Test.testClasses[index];
        }
        return t;
    }
    return function (target, propertyKey, descriptor) {
        var t = setTestClass(target);
        t.children.push({
            name: propertyKey,
            func: target[propertyKey]
        });
    };
}
//# sourceMappingURL=index.js.map