var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var body, _i, _a, test, instance, testGroup, _b, _c, child, testSection, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        body = document.querySelector('body');
                        _i = 0, _a = Test.testClasses;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        test = _a[_i];
                        instance = Object.create(test.obj);
                        instance.constructor.apply(instance);
                        testGroup = Test.addTestGroup(body, instance.constructor.name);
                        _b = 0, _c = test.children;
                        _d.label = 2;
                    case 2:
                        if (!(_b < _c.length)) return [3 /*break*/, 7];
                        child = _c[_b];
                        testSection = Test.addTest(testGroup, child.name);
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, child.func.apply(instance)];
                    case 4:
                        _d.sent();
                        Test.pass(testSection);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _d.sent();
                        Test.fail(testSection, e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        _b++;
                        return [3 /*break*/, 2];
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
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
        if (value !== true) {
            throw new Error(message);
        }
    };
    Assert.isFalse = function (value, message) {
        if (value !== false) {
            throw new Error(message);
        }
    };
    Assert.isTruthy = function (value, message) {
        if (!value) {
            throw new Error(message);
        }
    };
    Assert.isFalsy = function (value, message) {
        if (value) {
            throw new Error(message);
        }
    };
    Assert.delay = function (callBack, milliseconds) {
        return new Promise(function (resolve, reject) {
            var handle = window.setTimeout(function (args) {
                try {
                    callBack(args);
                    window.clearTimeout(handle);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }, milliseconds);
        });
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