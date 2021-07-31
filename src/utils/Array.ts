export const swap = <T>(
  arr: T[],
  x: number,
  y: number,
  setState?: React.Dispatch<React.SetStateAction<T[]>>
): void => {
  const temp: T = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
  if (setState) setState([...arr]);
};
