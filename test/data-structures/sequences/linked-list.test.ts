import { LinkedList } from '../../../src/data-structures/sequences/linked-list';

describe('Linked List - simple number', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList();
  });

  it('creates a new LinkedList with a custom equality func', () => {
    function equals<T>(a: T, b: T) {
      return a === b;
    }

    list = new LinkedList(equals);

    list.unshift(1);

    expect(list.size()).toBe(1);
    expect(list.indexOf(1)).toBe(0);
  });

  it('is empty when list has no nodes', () => {
    expect(list.isEmpty()).toBe(true);
  });

  describe('empty lists', () => {
    it('Accessing and removal methods return null on empty lists', () => {
      expect(list.peekFront()).toBe(null);
      expect(list.peekBack()).toBe(null);
      expect(list.shift()).toBe(null);
      expect(list.pop()).toBe(null);
      expect(list.remove(3)).toBe(null);
      expect(list.removeAt(3)).toBe(null);
      expect(list.removeAt(-1)).toBe(null);
      expect(list.get(1)).toBe(null);
    });
  });

  describe('Adding nodes', () => {
    it('adds node to head of list', () => {
      list.unshift(8);
      expect(list.size()).toBe(1);
      expect(list.indexOf(8)).toBe(0);

      list.unshift(3);
      expect(list.size()).toBe(2);
      expect(list.indexOf(3)).toBe(0);
    });

    it('adds to tail of list', () => {
      list.push(8);
      expect(list.size()).toBe(1);
      expect(list.indexOf(8)).toBe(0);

      list.push(3);
      expect(list.size()).toBe(2);
      expect(list.indexOf(3)).toBe(list.size() - 1);
    });

    it('adds at specific index', () => {
      list.addAt(0, 1);
      expect(list.size()).toBe(1);
      expect(list.indexOf(1)).toBe(0);

      list.addAt(1, 2);
      expect(list.size()).toBe(2);
      expect(list.indexOf(2)).toBe(1);

      list.addAt(1, 3);
      expect(list.size()).toBe(3);
      expect(list.indexOf(3)).toBe(1);

      list.addAt(2, 4);
      expect(list.size()).toBe(4);
      expect(list.indexOf(4)).toBe(2);

      list.addAt(1, 5);
      expect(list.size()).toBe(5);
      expect(list.indexOf(5)).toBe(1);
    });

    it('returns false when adding at index out of bounds', () => {
      list.unshift(1);
      expect(list.addAt(3, 2)).toBe(false);
    });
  });

  describe('Finding nodes', () => {
    it('gets nodes', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });

    it('gets index of nodes', () => {
      expect(list.indexOf(1)).toBe(-1);

      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.indexOf(1)).toBe(0);
      expect(list.indexOf(2)).toBe(1);
      expect(list.indexOf(3)).toBe(2);
      expect(list.indexOf(4)).toBe(-1);
    });

    it('finds out if list contains node', () => {
      expect(list.contains(1)).toBe(false);
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.contains(1)).toBe(true);
      expect(list.contains(3)).toBe(true);
      expect(list.contains(8)).toBe(false);
    });

    it('peeks head', () => {
      list.unshift(1);
      expect(list.peekFront()).toBe(1);

      list.unshift(2);
      expect(list.peekFront()).toBe(2);
    });

    it('peeks tail', () => {
      list.push(1);
      expect(list.peekBack()).toBe(1);

      list.push(2);
      expect(list.peekBack()).toBe(2);
    });
  });

  describe('Removing nodes', () => {
    it('removes from head', () => {
      list.push(8);
      list.push(3);

      list.shift();
      expect(list.size()).toBe(1);
      expect(list.peekFront()).toBe(3);

      list.shift();
      expect(list.size()).toBe(0);
    });

    it('removes from tail', () => {
      list.push(8);
      list.push(3);

      list.pop();
      expect(list.size()).toBe(1);
      expect(list.peekFront()).toBe(8);

      list.pop();
      expect(list.size()).toBe(0);
    });

    it('removes at specific index', () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.push(5);
      list.push(6);

      const val = list.removeAt(0);
      expect(val).toBe(1);
      expect(list.size()).toBe(5);

      const val2 = list.removeAt(4);
      expect(val2).toBe(6);
      expect(list.size()).toBe(4);

      const val3 = list.removeAt(1);
      expect(val3).toBe(3);
      expect(list.size()).toBe(3);

      const val4 = list.removeAt(1);
      expect(val4).toBe(4);
      expect(list.size()).toBe(2);

      const val5 = list.removeAt(1);
      expect(val5).toBe(5);
      expect(list.size()).toBe(1);

      const val6 = list.removeAt(0);
      expect(val6).toBe(2);
      expect(list.size()).toBe(0);
    });

    it('returns null when attempting to remove out of bounds node', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const val1 = list.removeAt(4);
      expect(val1).toBe(null);
      expect(list.size()).toBe(3);

      const val2 = list.removeAt(-1);
      expect(val2).toBe(null);
      expect(list.size()).toBe(3);
    });

    it('removes node with specific value', () => {
      list.push(1);
      list.push(2);
      list.push(3);

      const val1 = list.remove(1);
      expect(val1).toBe(1);
      expect(list.size()).toBe(2);

      const val2 = list.remove(2);
      expect(val2).toBe(2);
      expect(list.size()).toBe(1);

      const val3 = list.remove(3);
      expect(val3).toBe(3);
      expect(list.size()).toBe(0);
    });

    it('clears the list', () => {
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);
      list.clear();
      expect(list.isEmpty()).toBe(true);

      list.unshift(1);
      list.clear();
      expect(list.isEmpty()).toBe(true);

      list.clear();
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('helpers', () => {
    it('creates list from array', () => {
      const array = [1, 2, 3];
      list.fromArray(array);
      expect(Array.from(list)).toEqual([1, 2, 3]);
    });
  });

  describe('iterator', () => {
    it('is iterable', () => {
      const array = [1, 2, 3];
      list.fromArray(array);

      let i = 0;
      for (const n of list) {
        expect(n).toBe(array[i]);
        i += 1;
      }
    });

    it('does not iterate over an empty list', () => {
      let count = 0;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const n of list) {
        count += 1;
      }

      expect(count).toBe(0);
    });
  });
});

describe('Linked list - complex object', () => {
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

  let list: LinkedList<Car>;

  beforeAll(() => {
    const honda = new Car(789);
    const ferrari = new Car(456);
    const peugeot = new Car(123);

    list = new LinkedList();

    list.push(peugeot);
    list.push(ferrari);
    list.push(honda);
  });

  it('gets the index of a particular car', () => {
    const ferrari = new Car(123);
    const peugeot = new Car(789);

    expect(list.indexOf(ferrari)).toBe(0);
    expect(list.indexOf(peugeot)).toBe(2);
  });

  it('checks if list contains hero', () => {
    const ferrari = new Car(123);
    const peugeot = new Car(789);

    expect(list.contains(ferrari)).toBe(true);
    expect(list.contains(peugeot)).toBe(true);
    expect(list.contains(new Car(246))).toBe(false);
  });
});
