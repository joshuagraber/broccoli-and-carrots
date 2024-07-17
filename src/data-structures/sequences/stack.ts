import { LinkedList } from './linked-list';
import { type TypedEqualityFunction } from '../utils';

class Stack<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor(equalsFunction?: TypedEqualityFunction<T>) {
    this.list = new LinkedList(equalsFunction);
  }

  //  HELPERS
  /**
   * Returns size ~ O(1)
   */
  size(): number {
    return this.list.size();
  }

  /**
   * Returns true if stack is empty ~ O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Appends values to stack from array ~ O(k)
   * @param {T[]} arr array of values from which to create the stack
   * @returns {Queue<T>} Stack composed of values from the passed array
   */
  fromArray(arr: T[]): Stack<T> {
    this.list = this.list.fromArray(arr);
    return this;
  }

  /*
   * Iterator
   */

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }

  // INSERT
  /**
   * Adds new element ~ O(1)
   * @param {T} element value to add to stack
   * @return {boolean}
   */
  push(element: T): boolean {
    return this.list.push(element);
  }

  // ACCESS
  /**
   * Gets the value of element at top of stack ~ O(1)
   * @returns {T | null} value of top element in stack
   */
  peek(): T | null {
    return this.list.peekBack();
  }

  // SEARCH
  /**
   * Checks if value exists in the stack. ~ O(n)
   * @param {T} element value to search for
   * @returns {boolean}
   */
  contains(element: T): boolean {
    return this.list.contains(element);
  }

  // DELETE
  /**
   * Removes element ~ O(1)
   * @return {T | null} value of removed element
   */
  pop(): T | null {
    return this.list.pop();
  }

  /**
   * Deletes all elements ~ O(1)
   */
  clear() {
    this.list.clear();
  }
}

export { Stack };
