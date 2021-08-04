export interface Coord {
  x: number;
  y: number;
}

export interface Cell {
  coord: Coord;
  isActive: boolean;
  isFinish: boolean;
  isPath: boolean;
  isStart: boolean;
  isWall: boolean;
}
