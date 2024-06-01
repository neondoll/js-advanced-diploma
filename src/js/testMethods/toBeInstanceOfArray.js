function toBeInstanceOfArray(actual, classArray) {
  const pass = classArray.some((classItem) => actual instanceof classItem);

  if (pass) {
    return {
      message: () => `expect(${this.utils.printReceived('received')}).not.toBeInstanceOf(${this.utils.printExpected('expected')})
      
      Expected ${this.utils.printReceived(actual.constructor.name)} not to be one of the classes ${this.utils.printExpected(classArray.map((classItem) => classItem.name))}
      Received value: ${this.utils.printReceived(actual)}`,
      pass: true,
    };
  }
  return {
    message: () => `expect(${this.utils.printReceived('received')}).toBeInstanceOf(${this.utils.printExpected('expected')})
    
    Expected ${this.utils.printReceived(actual.constructor.name)} to be one of the classes ${this.utils.printExpected(classArray.map((classItem) => classItem.name))}
    Received value: ${this.utils.printReceived(actual)}`,
    pass: false,
  };
}

expect.extend({ toBeInstanceOfArray });
