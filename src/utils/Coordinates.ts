import { Coord } from '../core/model/Cell';

// Direction vectors: [Up, Right, Down, Left]
const yDir = [-1, 0, 1, 0];
const xDir = [0, 1, 0, -1];

// Returns adjacent coordinates that are within bounds
export const adjacentCoords = (c: Coord, n: number, m: number): Coord[] => {
  const coords: Coord[] = [];
  for (let i = 0; i < 4; i++) {
    const row = c.y + yDir[i];
    const col = c.x + xDir[i];
    if (row >= 0 && col >= 0 && row < n && col < m) {
      coords.push({ x: col, y: row });
    }
  }
  return coords;
};

// Since Typescript compare by references...
export const isSameCoord = (c1: Coord, c2: Coord): boolean =>
  c1.x === c2.x && c1.y === c2.y;
