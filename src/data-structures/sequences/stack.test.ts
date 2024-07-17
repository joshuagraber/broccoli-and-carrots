import { describe, it, expect } from '@jest/globals';

import { Stack } from './stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('empty stack', () => {
    it('returns null when pop() is called on empty stack', () => {
      expect(stack.pop()).toBe(null);
    });

    it('returns null when peek() is called on empty stack', () => {
      expect(stack.peek()).toBe(null);
    });
  });

  it('is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('pushes', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);

    stack.push(2);
    expect(stack.size()).toBe(2);

    stack.push(3);
    expect(stack.size()).toBe(3);
  });

  it('finds out if list contains element', () => {
    expect(stack.contains(1)).toBe(false);
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.contains(1)).toBe(true);
    expect(stack.contains(3)).toBe(true);
    expect(stack.contains(8)).toBe(false);
  });

  it('pops', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    expect(stack.size()).toBe(2);

    stack.pop();
    expect(stack.size()).toBe(1);

    stack.pop();
    expect(stack.size()).toBe(0);
  });

  it('peeks', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);

    stack.push(2);
    expect(stack.peek()).toBe(2);
  });

  it('clears the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);

    stack.push(1);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);

    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });

  it('fills a new stack from an array', () => {
    stack.fromArray([1, 3, 7, 6]);

    expect(stack.size()).toBe(4);
    expect(stack.pop()).toBe(6);
  });

  it('is iterable', () => {
    const nums = [1, 2, 3];

    for (const n of nums) {
      stack.push(n);
    }

    let i = 0;
    for (const n of stack) {
      expect(n).toBe(nums[i]);
      i += 1;
    }
  });
});

describe('Stack - complex object', () => {
  class Car {
    carId: number;
    topSpeed: number;
    engineSize: number;

    constructor(id: number) {
      this.carId = id;
      this.topSpeed = 100;
      this.engineSize = 100;
    }
  }

  const sameHeroF = (a: Car, b: Car) => a.carId === b.carId;

  let stack: Stack<Car>;

  beforeAll(() => {
    const ferrari = new Car(123);
    const peugeot = new Car(456);
    const honda = new Car(789);

    stack = new Stack(sameHeroF);

    stack.push(ferrari);
    stack.push(peugeot);
    stack.push(honda);
  });

  it('checks if stack contains hero', () => {
    const ferrari = new Car(123);
    const peugeot = new Car(789);

    expect(stack.contains(ferrari)).toBe(true);
    expect(stack.contains(peugeot)).toBe(true);
    expect(stack.contains(new Car(246))).toBe(false);
  });
});
