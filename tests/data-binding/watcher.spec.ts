/// <reference path="../../test-utils/index.d.ts" />
/// <reference path="../../dist/simple.d.ts" />

class WatcherSpec {
    @testMethod()
    public watch_wasCalled_simpleProps() {
        let view: any = {
            model: {
                firstName: 'First Name',
                lastName: 'Last Name',
                number: 1
            }
        },
            firstNameCalled = 0,
            lastNameCalled = 0,
            numberCalled = 0
        ;

        let watcher = new Simple.Watcher(view, 'model');

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
        let view: any = {
            model: {
                firstName: 'First Name',
                lastName: 'Last Name',
                number: 1
            }
        };

        let watcher = new Simple.Watcher(view, 'model');

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
        let view: any = {
            model: {
                first: {
                    second: {
                        third: 'first.second.third'
                    }
                },
                second: {
                    third: 'second.third'
                }
            }
        },
            firstSecondThirdCalled = 0,
            secondThirdCalled = 0            
        ;

        let watcher = new Simple.Watcher(view, 'model');

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
        let view: any = {
            model: {
                first: {
                    second: {
                        third: 'first.second.third'
                    }
                },
                second: {
                    third: 'second.third'
                }
            }
        },
            firstSecondThirdCalled = 0,
            secondThirdCalled = 0            
        ;

        let watcher = new Simple.Watcher(view, 'model');

        watcher.watch('model.first.second.third', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        watcher.watch('model.second', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
        });

        view.model.first.second.third += ' changed';
        view.model.second = 'changed'; 
    }

    @testMethod()
    public async watch_propAdded(): Promise<void> {
        let view: any = {
            model: {}
        }, newValueCalled = 0
        ;

        let watcher = new Simple.Watcher(view, 'model');

        watcher.watch('model.first', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
            newValueCalled++;
        });

        view.model.first = new Date();

        Assert.delay(() => Assert.areNotEqual(0, newValueCalled), 10);
    }

    @testMethod()
    public watch_array_childChanges(): void {
        let view = {
            model: {
                items: [
                    {
                        name: 'Name',
                        age: 20
                    }
                ]
            }
        },
            nameCalled = 0,
            ageCalled = 0
        ;

        let watcher = new Simple.Watcher(view, 'model');

        watcher.watch('model.items[0].name', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
            nameCalled++;
        });

        watcher.watch('model.items[0].age', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
            ageCalled++;
        });

        view.model.items[0].name += ' changed';
        view.model.items[0].age += 5;

        Assert.areNotEqual(0, nameCalled);
        Assert.areNotEqual(0, ageCalled);
    }

    @testMethod()
    public watch_array_methodCalled(): void {
        let view = {
            model: {
                items: [
                    {
                        key: 1
                    },
                    {
                        key: 2
                    },
                    {
                        key: 3
                    }
                ]
            }
        },
            methodCalled = 0
        ;

        let watcher = new Simple.Watcher(view, 'model');

        watcher.watch('model.items', (oldValue, newValue) => {
            Assert.areNotEqual(oldValue, newValue);
            methodCalled++;
        });

        view.model.items.push({
            key: 4
        });
        view.model.items.pop();
        view.model.items.shift();
        view.model.items.unshift({
            key: 5
        });
        view.model.items.splice(0, 1);
        view.model.items.sort();
        view.model.items.reverse();

        Assert.areEqual(7, methodCalled);
    }
}