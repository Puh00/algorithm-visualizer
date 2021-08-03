export interface Coord {
  x: number;
  y: number;
}

export interface Cell {
  coord: Coord;
  isActive: boolean;
  isPath: boolean;
  isWall: boolean;
}
