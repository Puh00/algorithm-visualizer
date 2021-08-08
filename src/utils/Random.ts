import { Coord } from '../core/model/Cell';

// inclusive: [min, max]
export const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Produces a random odd coordinate within the bounds of the given paramters
 * @param n Vertical size.
 * @param m Horizontal size.
 * @returns a random odd coordinate.
 */
export const randomOddCoordinates = (n: number, m: number): Coord => {
  const x = randomNumber(2, m);
  const y = randomNumber(2, n);
  return { x: x % 2 === 0 ? x - 1 : x, y: y % 2 === 0 ? y - 1 : y };
};

/**
 * Removes a random element from the set and returns that object as the
 * value of this function
 * @param set the set to pick a random element from.
 * @throws will throw an error if the set is empty.
 * @returns the randomly picked element.
 */
export const popRandomElementFromSet = <T>(set: Set<T>): T => {
  if (set.size === 0) throw new Error('Empty Set');
  const rs = Array.from(set.values())[Math.floor(Math.random() * set.size)];
  set.delete(rs);
  return rs;
};
