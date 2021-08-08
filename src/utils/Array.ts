export const swap = <T>(
  arr: T[],
  x: number,
  y: number,
  setState?: React.Dispatch<React.SetStateAction<T[]>>
): void => {
  [arr[y], arr[x]] = [arr[x], arr[y]];
  if (setState) setState([...arr]);
};
