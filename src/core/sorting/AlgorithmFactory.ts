import { InsertionSort } from "./InsertionSort";
import { SelectionSort } from "./SelectionSort";
import { Sorter } from "./Sorter";

// TODO: Create a type for algorithms (i.e type algo = "insertion" | "selection" ...)
export const getAlgorithm = (algorithmType: string): Sorter => {
  var sorter: Sorter;
  if (algorithmType === "selection") sorter = SelectionSort.getInstance();
  else if (algorithmType === "insertion") sorter = InsertionSort.getInstance();
  else throw new Error("Incorrect type for sorting algorithm");
  return sorter;
};
