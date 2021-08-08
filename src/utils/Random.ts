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
