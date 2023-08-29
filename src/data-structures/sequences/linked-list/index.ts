// Imports
// Imports - Sub-types
import LinkedListNode from './linked-list-node/index.js';

// Imports - Utils
import { equals, type TypedEqualityFunction } from '../../utils.js';

// Types
interface List<T> {
  head: LinkedListNode<T>;
  tail: LinkedListNode<T>;
  size: number;
}

// Impl
class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined;

  private equalsImpl: TypedEqualityFunction<T> = equals;

  /**
   * Creates a LinkedList ~ O(1)
   * @param equalityFunction Custom equality function.
   * Optional.
   * Default checks deep equality between two primitive | object values of type T.
   */
  constructor(equalityFunction?: TypedEqualityFunction<T>) {
    this.list = undefined;

    if (typeof equalityFunction === 'function') this.equalsImpl = equalityFunction;
  }

  // HELPERS
  /**
   * Returns size ~ O(1)
   */
  size(): number {
    if (this.list) return this.list.size;
    return 0;
  }

  /**
   * Returns true if list is empty ~ O(1)
   */
  isEmpty(): boolean {
    return typeof this.list === 'undefined';
  }

  /**
   * Appends values to list from array ~ O(k)
   */
  fromArray(arr: T[]): LinkedList<T> {
    for (const val of arr) {
      this.push(val);
    }
    return this;
  }

  /*
   * Iterator
   */
  *[Symbol.iterator](): Iterator<T> {
    if (typeof this.list === 'undefined') return;
    let current: LinkedListNode<T> | null;

    for (current = this.list.head; current != null; current = current.next) {
      yield current.val;
    }
  }

  // INSERT
  /**
   * Adds node to the head  ~ O(1)
   * @param {T} val value to add to head of list
   * @return {boolean}
   */
  unshift(val: T): boolean {
    const newNode = new LinkedListNode(val);

    if (this.list) {
      this.list.head.prev = newNode;
      newNode.next = this.list.head;

      this.list.head = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      };
    }

    return true;
  }

  /**
   * Adds node to the tail ~ O(1)
   * @param {T} val value to add to tail of list
   * @return {boolean}
   */
  push(val: T): boolean {
    const newNode = new LinkedListNode(val);

    if (this.list) {
      this.list.tail.next = newNode;
      newNode.prev = this.list.tail;

      this.list.tail = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      };
    }

    return true;
  }

  /**
   * Adds a node at specified index ~ O(n)
   * @param {number} i index
   * @param {T} val value to add to list
   * @return {boolean}
   */
  addAt(i: number, val: T): boolean {
    if (i === 0) {
      return this.unshift(val);
    }

    if (i === this.size()) {
      return this.push(val);
    }

    if (i < 0 || i >= this.size() || !this.list) return false;

    // If inserting between head and tail, traverse to index
    let current = this.list.head;
    for (let j = 0; j < i - 1; j++) {
      if (current.next) current = current.next;
    }

    const newNode = new LinkedListNode(val);

    if (current.next) current.next.prev = newNode;
    newNode.next = current.next;

    newNode.prev = current;
    current.next = newNode;
    this.list.size++;

    return true;
  }

  // ACCESS
  /**
   * Gets the value of node at head ~ O(1)
   * @returns {T | null} value of head if list is defined
   */
  peekFront(): T | null {
    if (!this.list) return null;
    return this.list.head.val;
  }

  /**
   * Gets the value of node at head ~ O(1)
   * @returns {T | null} value of head if list is defined
   */
  peekBack(): T | null {
    if (!this.list) return null;
    return this.list.tail.val;
  }

  /**
   * Gets the value of node at index i - O(n)
   * @param {number} i index of element
   * @returns {T | null} value of element at index i if list is defined and i exists in list
   */
  get(i: number): T | null {
    if (i < 0 || i >= this.size() || !this.list) {
      return null;
    }

    let j = 0;
    let current = this.list.head;
    while (j < i) {
      if (current.next) {
        current = current.next;
        j++;
      }
    }

    return current.val;
  }

  // SEARCH
  /**
   * Returns the index of the first occurrence of the specified value in the linked list.
   * @param {T} value value to search for
   * @return {number} the index of the first occurrence of the element, and -1 if the element does not exist.
   */
  indexOf(value: T): number {
    // list is empty
    if (!this.list) return -1;

    let i = 0;
    let current = this.list.head;

    while (!this.equalsImpl(current.val, value)) {
      if (!current.next) return -1;
      current = current.next;
      i += 1;
    }

    return i;
  }

  /**
   * Checks if value is a node in linked list.
   * @param {T} value value to search for
   * @returns {boolean}
   */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  // DELETE
  /**
   * Removes node at head ~ O(1)
   * @return {T | null} value of removed head node if list is defined
   */
  shift(): T | null {
    if (!this.list) return null;

    // extract val of head so we can return it later
    const val = this.list.head.val;

    if (this.list.head.next) {
      this.list.head.next.prev = null;

      // move head pointer forwards
      this.list.head = this.list.head.next;

      this.list.size -= 1;
    } else {
      // list is size 1, clear the list
      this.list = undefined;
    }

    return val;
  }

  /**
   * Removes node at tail ~ O(1)
   * @return {T | null} value of removed head
   */
  pop(): T | null {
    if (!this.list) return null;

    // extract the val of tail so we can return it later
    const val = this.list.tail.val;

    if (this.list.tail.prev) {
      this.list.tail.prev.next = null;

      // move tail pointer backwards
      this.list.tail = this.list.tail.prev;

      this.list.size -= 1;
    } else {
      this.list = undefined;
    }

    return val;
  }

  /**
   * Removes node at specified index ~ O(n)
   * @param {number} i index to remove
   * @return {T | null} value of removed node
   */
  removeAt(i: number): T | null {
    if (!this.list) return null;

    if (i === 0) {
      return this.shift();
    } else if (i === this.size() - 1) {
      return this.pop();
    }

    if (i < 0 || i >= this.list.size) return null;

    let j = 0;
    let current = this.list.head;

    // traverse to node to be deleted
    while (j < i) {
      if (current.next) {
        current = current.next;
        j += 1;
      }
    }

    // delete node
    if (current.prev && current.next) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.list.size -= 1;

    return current.val;
  }

  /**
   * Removes first occurrence of node with specified value. Returns value of removed node if
   * removal was successful, and null otherwise. ~ O(n)
   * @param {T} val value to remove
   * @returns {T | null} value of removed node
   */
  remove(val: T): T | null {
    const index = this.indexOf(val); // O(n)
    if (index === -1) return null;

    return this.removeAt(index); // O(n)
  }

  /**
   * Deletes all nodes ~ O(1)
   */
  clear(): void {
    this.list = undefined;
  }
}

export { LinkedList, type List };
