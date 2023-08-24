// Imports
// Imports - packages
import { isEqual as _isEqual } from 'lodash';

// eslint-disable-next-line no-unused-vars
export type TypedEqualityFunction<T> = (a: T, b: T) => boolean;

// eslint-disable-next-line no-unused-vars
export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * Tests equality between data of the same type.
 * @function
 */
export function equals<T>(a: T, b: T): boolean {
  return _isEqual(a, b);
}

/**
 * Tests comparison between data of the same type.
 * @function
 */
export function compare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else {
    return 1;
  }
}
