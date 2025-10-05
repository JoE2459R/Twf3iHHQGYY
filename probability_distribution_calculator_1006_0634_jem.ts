// 代码生成时间: 2025-10-06 06:34:27
 * documentation, maintainability, and scalability.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProbabilityDistributionCalculatorService {

  constructor() {}

  /**
   * Calculate the probability distribution of a given data set.
   * @param data The data set to calculate the distribution for.
   * @returns An object containing the distribution data.
   * @throws An error if the data set is invalid or empty.
   */
  calculateDistribution(data: number[]): { probability: number; }[] {
    if (!data || data.length === 0) {
      throw new Error('Data set is empty or invalid.');
    }

    // Calculate the total number of data points
    const total = data.length;

    // Calculate the frequency of each data point (assumed to be integers)
    const frequencyMap = data.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    // Calculate the probability of each data point
    const distribution = Object.keys(frequencyMap).map((key) => {
      const value = Number(key);
      return {
        value,
        probability: frequencyMap[value] / total
      };
    });

    return distribution;
  }
}
