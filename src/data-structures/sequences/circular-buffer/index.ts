// Imports - util
import { equals, type TypedEqualityFunction } from '../../utils.js';

class CircularBuffer<T> {
  private list: T[];
  private bufferSize: number;
  private capacity: number;

  private head: number;
  private tail: number;

  private equalsImpl: TypedEqualityFunction<T>;

  constructor(capacity: number, equalsFunction?: TypedEqualityFunction<T>) {
    this.list = new Array(capacity);
    this.bufferSize = 0;
    this.capacity = capacity;

    this.head = 0;
    this.tail = 0;

    this.equalsImpl = equalsFunction ?? equals;
  }

  // HELPERS
  /**
   * Returns size of circular buffer - O(1)
   */
  size(): number {
    return this.bufferSize;
  }

  /**
   * Returns true if buffer is empty, false otherwise - O(1)
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // INSERT
  /**
   * Enqueues element into queue - O(1)
   * @param {T} element - element to be enqueued
   */
  enqueue(element: T): void {
    this.list[this.tail] = element;

    const isOverwritten = this.bufferSize !== 0 && this.tail === this.head;
    if (isOverwritten) {
      this.head = (this.head + 1) % this.capacity;
    }

    this.tail = (this.tail + 1) % this.capacity;

    this.bufferSize += 1;
  }

  // ACCESS
  /**
   * Peeks the element at the front of the buffer - O(1)
   * @returns {T} - Frontmost element
   */
  peekFront(): T | null {
    if (this.isEmpty()) return null;

    return this.list[this.head];
  }

  /**
   * Peeks the element at the back of the buffer - O(1)
   * @returns {T} - Backmost element
   */
  peekBack(): T | null {
    if (this.isEmpty()) return null;

    let i = this.tail - 1;
    if (i < 0) i = this.capacity - 1;

    return this.list[i];
  }

  // SEARCH
  /**
   * Checks if element is in buffer - O(n)
   * @param {T} element  - element to search for
   * @returns {boolean}
   */
  contains(element: T): boolean {
    return this.list.some((val: T) => {
      return this.equalsImpl(val, element);
    });
  }

  // DELETE
  /**
   * Dequeues element from queue - O(1)
   * @returns {T}
   */
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const removedVal = this.list[this.head];
    this.head = (this.head + 1) % this.capacity;

    this.bufferSize -= 1;

    return removedVal;
  }

  /**
   * Deletes all elements in buffer - O(capacity)
   */
  clear(): void {
    this.list = new Array(this.capacity);
    this.bufferSize = 0;
  }
}

export { CircularBuffer };
