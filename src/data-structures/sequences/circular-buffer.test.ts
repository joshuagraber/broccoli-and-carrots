import { CircularBuffer } from './circular-buffer';
import { Car } from '../test-utils';

describe('Circular Buffer', () => {
  let buffer: CircularBuffer<number>;

  beforeEach(() => {
    buffer = new CircularBuffer(4);
  });

  describe('empty', () => {
    it('returns null when dequeue is called on empty buffer', () => {
      expect(buffer.dequeue()).toBe(null);
    });

    it('returns null when peek() is called on empty buffer', () => {
      expect(buffer.peekFront()).toBe(null);
      expect(buffer.peekBack()).toBe(null);
    });

    it('is empty', () => {
      expect(buffer.isEmpty()).toBe(true);
    });
  });

  describe('insert and delete', () => {
    it('enqueues', () => {
      buffer.enqueue(1);
      expect(buffer.size()).toBe(1);

      buffer.enqueue(2);
      expect(buffer.size()).toBe(2);

      buffer.enqueue(3);
      expect(buffer.size()).toBe(3);
    });

    it('dequeues', () => {
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);

      expect(buffer.size()).toBe(3);

      buffer.dequeue();
      expect(buffer.size()).toBe(2);

      buffer.dequeue();
      expect(buffer.size()).toBe(1);

      buffer.dequeue();
      expect(buffer.size()).toBe(0);
    });

    it('overwrites nodes', () => {
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);
      buffer.enqueue(4);
      buffer.enqueue(5);
      expect(buffer.contains(1)).toBe(false);
      expect(buffer.peekFront()).toBe(2);
      expect(buffer.peekBack()).toBe(5);
      buffer.enqueue(6);
      expect(buffer.contains(2)).toBe(false);
      expect(buffer.peekFront()).toBe(3);
      expect(buffer.peekBack()).toBe(6);
    });

    it('clears the buffer', () => {
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);
      buffer.enqueue(4);
      buffer.clear();
      expect(buffer.isEmpty()).toBe(true);

      buffer.enqueue(1);
      buffer.clear();
      expect(buffer.isEmpty()).toBe(true);

      buffer.clear();
      expect(buffer.isEmpty()).toBe(true);
    });
  });

  describe('Accessing', () => {
    it('peeks front', () => {
      buffer.enqueue(1);
      expect(buffer.peekFront()).toBe(1);
      expect(buffer.peekBack()).toBe(1);

      buffer.enqueue(2);
      expect(buffer.peekFront()).toBe(1);
      expect(buffer.peekBack()).toBe(2);
    });

    it('peeks back', () => {
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);
      buffer.enqueue(4);
      expect(buffer.peekBack()).toBe(4);
    });
  });

  describe('searching', () => {
    it('finds out if buffer contains element', () => {
      expect(buffer.contains(1)).toBe(false);
      buffer.enqueue(1);
      buffer.enqueue(2);
      buffer.enqueue(3);

      expect(buffer.contains(1)).toBe(true);
      expect(buffer.contains(3)).toBe(true);
      expect(buffer.contains(8)).toBe(false);
    });
  });
});

describe('Circular Buffer - complex object', () => {
  let buffer: CircularBuffer<Car>;

  beforeAll(() => {
    const ferrari = new Car(123);
    const peugeot = new Car(456);
    const honda = new Car(789);

    buffer = new CircularBuffer(3);

    buffer.enqueue(ferrari);
    buffer.enqueue(peugeot);
    buffer.enqueue(honda);
  });

  it('checks if queue contains vehicle', () => {
    const ferrari = new Car(123);
    const honda = new Car(789);

    expect(buffer.contains(ferrari)).toBe(true);
    expect(buffer.contains(honda)).toBe(true);
    expect(buffer.contains(new Car(246))).toBe(false);
  });
});

describe('Circular Buffer - custom equality func', () => {
  const buffer = new CircularBuffer(4, (a, b) => a === b);
  buffer.enqueue(0);
  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.enqueue(3);

  it('checks if queue contains elements', () => {
    expect(buffer.contains(0)).toBe(true);
    expect(buffer.contains(1)).toBe(true);
    expect(buffer.contains(2)).toBe(true);
    expect(buffer.contains(3)).toBe(true);
    expect(buffer.size()).toBe(4);
    expect(buffer.contains(5)).toBe(false);
  });
});
