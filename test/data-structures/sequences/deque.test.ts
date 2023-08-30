import { Deque } from '../../../src/data-structures/sequences/queues/deque/index.js';

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque();
  });

  describe('empty deque', () => {
    it('returns null when pop() is called on empty stack', () => {
      expect(deque.shift()).toBe(null);
      expect(deque.pop()).toBe(null);
    });

    it('returns null when peek() is called on empty stack', () => {
      expect(deque.peekFront()).toBe(null);
      expect(deque.peekBack()).toBe(null);
    });
  });

  it('is empty', () => {
    expect(deque.isEmpty()).toBe(true);
  });

  describe('enqueues', () => {
    it('pushes front', () => {
      deque.unshift(1);
      expect(deque.size()).toBe(1);

      deque.unshift(2);
      expect(deque.size()).toBe(2);

      deque.unshift(3);
      expect(deque.size()).toBe(3);
    });

    it('pushes back', () => {
      deque.push(1);
      expect(deque.size()).toBe(1);

      deque.push(2);
      expect(deque.size()).toBe(2);

      deque.push(3);
      expect(deque.size()).toBe(3);
    });
  });

  describe('dequeues', () => {
    it('pops front', () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);

      const val1 = deque.shift();
      expect(val1).toBe(1);
      expect(deque.size()).toBe(2);

      const val2 = deque.shift();
      expect(val2).toBe(2);
      expect(deque.size()).toBe(1);

      const val3 = deque.shift();
      expect(val3).toBe(3);
      expect(deque.size()).toBe(0);
    });

    it('pops back', () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);

      const val1 = deque.pop();
      expect(val1).toBe(3);
      expect(deque.size()).toBe(2);

      const val2 = deque.pop();
      expect(val2).toBe(2);
      expect(deque.size()).toBe(1);

      const val3 = deque.pop();
      expect(val3).toBe(1);
      expect(deque.size()).toBe(0);
    });
  });

  it('finds out if list contains element', () => {
    expect(deque.contains(1)).toBe(false);
    deque.push(1);
    deque.push(2);
    deque.push(3);

    expect(deque.contains(1)).toBe(true);
    expect(deque.contains(3)).toBe(true);
    expect(deque.contains(8)).toBe(false);
  });

  it('peeks', () => {
    deque.push(1);
    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(1);

    deque.push(2);
    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(2);
  });

  it('clears the list', () => {
    deque.push(1);
    deque.push(2);
    deque.push(3);
    deque.push(4);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);

    deque.push(1);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);

    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  it('is iterable', () => {
    const nums = [1, 2, 3];

    for (const n of nums) {
      deque.push(n);
    }

    let i = 0;
    for (const n of deque) {
      expect(n).toBe(nums[i]);
      i += 1;
    }
  });

  it('creates Deque from array', () => {
    const nums = [1, 6, 2, 4, 7, 2];
    const newDeque = deque.fromArray(nums);

    expect(Object.is(deque, newDeque)).toBe(true);
    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(2);
  });
});

describe('Queue - complex object', () => {
  class Car {
    id: number;
    topSpeed: number;
    engineSize: number;

    constructor(id: number) {
      this.id = id;
      this.topSpeed = 100;
      this.engineSize = 100;
    }
  }

  let queue: Deque<Car>;

  beforeAll(() => {
    const ferrari = new Car(123);
    const peugeot = new Car(456);
    const honda = new Car(789);

    queue = new Deque();

    queue.push(ferrari);
    queue.push(peugeot);
    queue.push(honda);
  });

  it('checks if queue contains hero', () => {
    const ferrari = new Car(123);
    const peugeot = new Car(789);

    expect(queue.contains(ferrari)).toBe(true);
    expect(queue.contains(peugeot)).toBe(true);
    expect(queue.contains(new Car(246))).toBe(false);
  });
});
