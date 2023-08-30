import { Queue } from '../../../src/data-structures/sequences/queues/queue/index.js';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue();
  });

  describe('empty queue', () => {
    it('returns null when pop() is called on empty stack', () => {
      expect(queue.dequeue()).toBe(null);
    });

    it('returns null when peek() is called on empty stack', () => {
      expect(queue.peekFront()).toBe(null);
      expect(queue.peekBack()).toBe(null);
    });

    it('is empty', () => {
      expect(queue.isEmpty()).toBe(true);
    });
  });

  it('enqueues', () => {
    queue.enqueue(1);
    expect(queue.size()).toBe(1);

    queue.enqueue(2);
    expect(queue.size()).toBe(2);

    queue.enqueue(3);
    expect(queue.size()).toBe(3);
  });

  it('dequeues', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const val1 = queue.dequeue();
    expect(val1).toBe(1);
    expect(queue.size()).toBe(2);

    const val2 = queue.dequeue();
    expect(val2).toBe(2);
    expect(queue.size()).toBe(1);

    const val3 = queue.dequeue();
    expect(val3).toBe(3);
    expect(queue.size()).toBe(0);
  });

  it('finds out if list contains element', () => {
    expect(queue.contains(1)).toBe(false);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.contains(1)).toBe(true);
    expect(queue.contains(3)).toBe(true);
    expect(queue.contains(8)).toBe(false);
  });

  it('peeks', () => {
    queue.enqueue(1);
    expect(queue.peekFront()).toBe(1);
    expect(queue.peekBack()).toBe(1);

    queue.enqueue(2);
    expect(queue.peekFront()).toBe(1);
    expect(queue.peekBack()).toBe(2);
  });

  it('clears the list', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);

    queue.clear();
    expect(queue.isEmpty()).toBe(true);
  });

  it('is iterable', () => {
    const nums = [1, 2, 3];

    for (const n of nums) {
      queue.enqueue(n);
    }

    let i = 0;
    for (const n of queue) {
      expect(n).toBe(nums[i]);
      i += 1;
    }
  });

  it('creates Queue from array', () => {
    const nums = [1, 6, 2, 4, 7, 2];
    const newQueue = queue.fromArray(nums);

    expect(Object.is(queue, newQueue)).toBe(true);
    expect(queue.peekFront()).toBe(1);
    expect(queue.peekBack()).toBe(2);
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

  let queue: Queue<Car>;

  beforeAll(() => {
    const ferrari = new Car(123);
    const peugeot = new Car(456);
    const honda = new Car(789);

    queue = new Queue();

    queue.enqueue(ferrari);
    queue.enqueue(peugeot);
    queue.enqueue(honda);
  });

  it('checks if queue contains hero', () => {
    const ferrari = new Car(123);
    const peugeot = new Car(789);

    expect(queue.contains(ferrari)).toBe(true);
    expect(queue.contains(peugeot)).toBe(true);
    expect(queue.contains(new Car(246))).toBe(false);
  });
});
