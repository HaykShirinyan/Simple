var Test = (function () {
    function Test() {
    }
    Test.checkErrors = function () {
        for (var _i = 0, _a = Test.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            console.log(error.stack);
        }
    };
    Test.run = function () {
        var body = document.querySelector('body');
        for (var _i = 0, _a = Test.testClasses; _i < _a.length; _i++) {
            var test = _a[_i];
            var instance = Object.create(test.obj);
            instance.constructor.apply(instance);
            for (var _b = 0, _c = test.children; _b < _c.length; _b++) {
                var child = _c[_b];
                var title = document.createElement('h2');
                title.textContent = child.name;
                body.appendChild(title);
                try {
                    child.func.apply(instance);
                    var pass = document.createElement('span');
                    pass.textContent = "Passed";
                    body.appendChild(pass);
                }
                catch (e) {
                    var error = document.createElement('p');
                    error.textContent = e.stack;
                    error.style.color = 'red';
                    body.appendChild(error);
                }
            }
        }
        //Test.checkErrors();
    };
    Test.testClasses = [];
    Test.errors = [];
    return Test;
}());
var Assert = (function () {
    function Assert() {
    }
    Assert.error = function (message) {
        Test.errors.push();
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