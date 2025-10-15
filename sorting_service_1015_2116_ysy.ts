// 代码生成时间: 2025-10-15 21:16:34
 * @description This service provides a simple interface to perform sorting
 * on an array of numbers. It currently supports bubble sort and insertion sort.
 * @author Your Name
 * @version 1.0
# 扩展功能模块
 */

import { Injectable } from '@angular/core';
# 扩展功能模块

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  /**
   * Sorts an array of numbers using the Bubble Sort algorithm.
   * @param arr The array of numbers to sort.
   * @returns The sorted array.
# 扩展功能模块
   */
  bubbleSort(arr: number[]): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Invalid input: input must be a non-empty array of numbers.');
    }

    // Bubble Sort algorithm implementation
    let swapped: boolean;
    do {
# 增强安全性
      swapped = false;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
          // Swap elements
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
# 改进用户体验
          swapped = true;
        }
      }
    } while (swapped);
# 添加错误处理

    return arr;
# 优化算法效率
  }

  /**
   * Sorts an array of numbers using the Insertion Sort algorithm.
   * @param arr The array of numbers to sort.
# TODO: 优化性能
   * @returns The sorted array.
# FIXME: 处理边界情况
   */
  insertionSort(arr: number[]): number[] {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Invalid input: input must be a non-empty array of numbers.');
    }

    // Insertion Sort algorithm implementation
# 添加错误处理
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      /* Move elements of arr[0..i-1], that are greater than key,
         to one position ahead of their current position */
# FIXME: 处理边界情况
      while (j >= 0 && arr[j] > key) {
# 添加错误处理
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }

    return arr;
  }
}
