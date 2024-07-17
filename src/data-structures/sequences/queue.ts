import { LinkedList } from './linked-list';
import { type TypedEqualityFunction } from '../utils';

class Queue<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor(equalsFunction?: TypedEqualityFunction<T>) {
    this.list = new LinkedList(equalsFunction);
  }

  // HELPERS
  /**
   * Returns size ~ O(1)
   */
  size(): number {
    return this.list.size();
  }

  /**
   * Returns true if list is empty ~ O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Appends values to queue from array ~ O(k)
   * @param {T[]} arr array of values from which to create the queue
   * @returns {Queue<T>} Queue composed of values from the passed array
   */
  fromArray(arr: T[]): Queue<T> {
    this.list = this.list.fromArray(arr);
    return this;
  }

  /**
   * Iterator
   */
  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }

  // INSERT
  /**
   * Enqueues element into rear of queue - O(1)
   * @param {T} element - element to be enqueued
   */
  enqueue(element: T): void {
    this.list.push(element);
  }

  // ACCESS
  /**
   * Peeks element at the front of the queue - O(1)
   * @returns {T} - front element if it exists
   */
  peekFront(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekFront();
  }

  /**
   * Peeks element at the back of the queue - O(1)
   * @returns {T | null} - back element if it exists
   */
  peekBack(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekBack();
  }

  // SEARCH
  /**
   * Checks if value is in queue - O(n)
   * @param {T} element  - element to search for
   * @returns {boolean}
   */
  contains(element: T): boolean {
    return this.list.contains(element);
  }

  // DELETE
  /**
   * Deletes all nodes ~ O(1)
   */
  clear(): void {
    this.list.clear();
  }

  /**
   * Dequeues element from queue - O(1)
   * @returns {T}
   */
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    return this.list.shift();
  }
}

export { Queue };
