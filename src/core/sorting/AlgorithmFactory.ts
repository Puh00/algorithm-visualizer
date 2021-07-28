import { Sorter } from "./Sorter";
import { InsertionSort } from "./InsertionSort";
import { SelectionSort } from "./SelectionSort";
import { BubbleSort } from "./BubbleSort";
import { QuickSort } from "./QuickSort";
import { MergeSort } from "./MergeSort";

export const getAlgorithm = (algorithmType: string): Sorter => {
  var sorter: Sorter;
  if (algorithmType === "selection") sorter = SelectionSort.getInstance();
  else if (algorithmType === "insertion") sorter = InsertionSort.getInstance();
  else if (algorithmType === "bubble") sorter = BubbleSort.getInstance();
  else if (algorithmType === "quick") sorter = QuickSort.getInstance();
  else if (algorithmType === "merge") sorter = MergeSort.getInstance();
  else throw new Error("Incorrect type for sorting algorithm");
  return sorter;
};
