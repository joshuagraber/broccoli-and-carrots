import { compare, equals } from '../../src/data-structures/utils.js';

describe('utils', () => {
  it('equals', () => {
    expect(equals(1, 8)).toBe(false);
    expect(equals(8, 8)).toBe(true);
  });
  it('compare', () => {
    expect(compare(1, 8)).toBe(-1);
    expect(compare(8, 8)).toBe(0);
    expect(compare(8, 1)).toBe(1);
  });
});
