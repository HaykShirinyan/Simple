/// <reference path="../../test-utils/index.d.ts" />
/// <reference path="../../dist/simple.d.ts" />

class WatcherSpec {
    @testMethod()
    public watch_wasCalled_simpleProps() {
        let view: any = {},
            firstNameCalled = 0,
            lastNameCalled = 0,
            numberCalled = 0
        ;

        let watcher = new Simple.Watcher(view, 'model');

        view.model = {
            firstName: 'First Name',
            lastName: 'Last Name',
            number: 1
        };

        watcher.watch('model.firstName', (oldValue, newValue) => {
            firstNameCalled++;
        });

        watcher.watch('model.lastName', (oldValue, newValue) => {
            lastNameCalled++;
        });

        watcher.watch('model.number', (oldValue, newValue) => {
            numberCalled++;
        });

        view.model.firstName += ' changed';
        view.model.lastName += ' changed';
        view.model.number = 2;

        Assert.areEqual(1, firstNameCalled);
        Assert.areEqual(1, lastNameCalled);
        Assert.areEqual(1, numberCalled);

        view.model.firstName = String(view.model.firstName) // stays the same
        view.model.lastName += ' changed again';
        view.model.number = 3;

        Assert.areEqual(1, firstNameCalled);
        Assert.areEqual(2, lastNameCalled);
        Assert.areEqual(2, numberCalled);
    }

    @testMethod()
    public watch_simpleProps() {
        let view: any = {};

        let watcher = new Simple.Watcher(view, 'model');

        view.model = {
            firstName: 'First Name',
            lastName: 'Last Name',
            number: 1
        };

        watcher.watch('model.firstName', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        watcher.watch('model.lastName', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        watcher.watch('model.number', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        view.model.firstName += ' changed';
        view.model.lastName += ' changed';
        view.model.number = 2;
    }

    @testMethod()
    public watch_wasCalled_object() {
        let view: any = {},
            firstSecondThirdCalled = 0,
            secondThirdCalled = 0            
        ;

        let watcher = new Simple.Watcher(view, 'model');

        view.model = {
            first: {
                second: {
                    third: 'first.second.third'
                }
            },
            second: {
                third: 'second.third'
            }
        };

        watcher.watch('model.first.second.third', (oldValue, newValue) => {
            firstSecondThirdCalled++;
        });

        watcher.watch('model.second', (oldValue, newValue) => {
            secondThirdCalled++;
        });

        view.model.first.second.third += ' changed';
        view.model.second = 'changed'; 

        Assert.areEqual(1, firstSecondThirdCalled);
        Assert.areEqual(1, secondThirdCalled);

        view.model.first.second.third += ' changed again';

        Assert.areEqual(2, firstSecondThirdCalled);

        view.model.first.second.third = String(view.model.first.second.third);

        Assert.areEqual(2, firstSecondThirdCalled);
    }

    @testMethod()
    public watch_object() {
        let view: any = {},
            firstSecondThirdCalled = 0,
            secondThirdCalled = 0            
        ;

        let watcher = new Simple.Watcher(view, 'model');

        view.model = {
            first: {
                second: {
                    third: 'first.second.third'
                }
            },
            second: {
                third: 'second.third'
            }
        };

        watcher.watch('model.first.second.third', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        watcher.watch('model.second', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        view.model.first.second.third += ' changed';
        view.model.second = 'changed'; 
    }
}