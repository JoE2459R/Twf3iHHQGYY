// 代码生成时间: 2025-10-25 14:21:35
 * Provides functionality for sharding data into portions
 *
 * @author Your Name
 * @date Today's date
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataShardingService {

  private readonly SHARD_SIZE: number = 100; // Default shard size

  constructor() {}

  /**
   * Shards the data into smaller parts based on the shard size
   *
   * @param data Array<any> Data to be sharded
   * @returns Observable<Array<Array<any>>> Sharded data
   */
  shardData(data: Array<any>): Observable<Array<Array<any>>> {
    // Check if data is null or undefined
    if (!data) {
      return throwError('Data is null or undefined');
    }

    // Calculate the number of shards required
    const numberOfShards = Math.ceil(data.length / this.SHARD_SIZE);

    // Create an array to hold the shards
    const shards: Array<Array<any>> = [];

    // Shard the data
    for (let i = 0; i < numberOfShards; i++) {
      const shardStartIndex = i * this.SHARD_SIZE;
      const shardEndIndex = shardStartIndex + this.SHARD_SIZE;
      shards.push(data.slice(shardStartIndex, shardEndIndex));
    }

    // Return the shards as an observable
    return of(shards);
  }

  /**
   * Updates the shard size
   *
   * @param size number New shard size
   */
  updateShardSize(size: number): void {
    this.SHARD_SIZE = size;
  }

  /**
   * Retrieves the current shard size
   *
   * @returns number Current shard size
   */
  getShardSize(): number {
    return this.SHARD_SIZE;
  }
}
