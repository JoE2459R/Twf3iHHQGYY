// 代码生成时间: 2025-09-24 01:18:12
export class SortingAlgorithmService {

  /**
   * Sorts an array using the bubble sort algorithm.
   * @param array The array to sort.
   * @returns A sorted array.
   */
  public bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }

    const len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap elements
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /**
   * Sorts an array using the quick sort algorithm.
   * @param array The array to sort.
   * @returns A sorted array.
   */
  public quickSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }
    return this._quickSort(array);
  }

  /**
   * Private helper function for quick sort algorithm.
   * @param array The array to sort.
   * @param low The start index of the subarray.
   * @param high The end index of the subarray.
   * @returns A sorted subarray.
   */
  private _quickSort(array: number[], low: number = 0, high: number = array.length - 1): number[] {
    if (low < high) {
      const pi = this.partition(array, low, high);
      this._quickSort(array, low, pi - 1);
      this._quickSort(array, pi + 1, high);
    }
    return array;
  }

  /**
   * Partitions the array and returns the pivot index.
   * @param array The array to partition.
   * @param low The start index of the subarray.
   * @param high The end index of the subarray.
   * @returns The pivot index.
   */
  private partition(array: number[], low: number, high: number): number {
    const pivot = array[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
  }
}
