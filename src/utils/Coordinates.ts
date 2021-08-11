import { Coord } from '../core/model/Cell';

// Direction vectors: [Up, Right, Down, Left]
const yDir = [-1, 0, 1, 0];
const xDir = [0, 1, 0, -1];

/**
 * Retrieves adjacent coordinates that shares a border with the given coordinate.
 * @param c the coordinate to evaluate.
 * @param n the height of the grid.
 * @param m the width of the grid.
 * @param offset by default, the function will only give neighbours that are 1 unit away.
 * @returns adjacent coordinates that are within bounds.
 */
export const adjacentCoords = (
  c: Coord,
  n: number,
  m: number,
  offset = 1
): Coord[] => {
  const coords: Coord[] = [];
  for (let i = 0; i < 4; i++) {
    const row = c.y + yDir[i] * offset;
    const col = c.x + xDir[i] * offset;
    if (row >= 0 && col >= 0 && row < n && col < m) {
      coords.push({ x: col, y: row });
    }
  }
  return coords;
};

// Since Typescript compare by references...
export const isSameCoord = (c1: Coord, c2: Coord): boolean =>
  c1.x === c2.x && c1.y === c2.y;

type dir = 'HORIZONTAL' | 'VERTICAL';

/**
 * Calculates the alignement between two coordinates.
 * @param p the first coordinate.
 * @param q the second coordinate.
 * @throws will throw an error if the coordinates are neither vertically or
 * horizontally aligned
 * @returns the alignment between the coordinates.
 */
export const alignmentBetweenCoordinates = (p: Coord, q: Coord): dir => {
  if (Math.max(p.y, q.y) - Math.min(p.y, q.y) === 0) return 'HORIZONTAL';
  else if (Math.max(p.x, q.x) - Math.min(p.x, q.x) === 0) return 'VERTICAL';
  else throw new Error('Neither horizontally or vertically aligned');
};

/**
 * If {p} is not located at odd coordinates, modify it so that the coordinates are odd.
 * @param p the coordinates.
 * @returns odd coordinates.
 */
export const closestOddCoord = (p: Coord): Coord => {
  if (p.x < 0 || p.y < 0) throw new Error('Invalid negative coordinate');
  const x = p.x % 2 !== 0 ? p.x : p.x - 1 < 1 ? p.x + 1 : p.x - 1;
  const y = p.y % 2 !== 0 ? p.y : p.y - 1 < 1 ? p.y + 1 : p.y - 1;
  return { x, y };
};
