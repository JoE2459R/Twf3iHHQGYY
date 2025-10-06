// 代码生成时间: 2025-10-07 03:57:21
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerSchedulerService {

  private tasks: Map<string, {
    id: string;
    task: () => void;
    interval: number;
# 改进用户体验
    timer: any;
  }> = new Map();
  private taskSubject = new Subject<{ id: string; error: any }>();

  /**
   * Schedules a new task with a given interval.
# 改进用户体验
   * @param id Unique identifier for the task.
   * @param task The function to be executed periodically.
# TODO: 优化性能
   * @param interval Time interval in milliseconds.
   * @returns The task ID if successfully scheduled, otherwise throws an error.
   */
  public scheduleTask(id: string, task: () => void, interval: number): string {
    if (this.tasks.has(id)) {
      throw new Error(`Task with ID ${id} already exists`);
# 优化算法效率
    }

    const timer = setInterval(task, interval);
    this.tasks.set(id, { id, task, interval, timer });
    return id;
  }

  /**
   * Cancels a scheduled task by its ID.
   * @param id The unique identifier for the task to cancel.
   * @returns True if the task was successfully cancelled, otherwise false.
   */
  public cancelTask(id: string): boolean {
# 扩展功能模块
    const task = this.tasks.get(id);
    if (!task) {
      return false;
# FIXME: 处理边界情况
    }

    clearInterval(task.timer);
    this.tasks.delete(id);
    return true;
# 优化算法效率
  }

  /**
   * Returns an observable that emits errors from tasks.
   * @returns An observable of task errors.
   */
  public getTaskErrors(): Observable<{ id: string; error: any }> {
# 增强安全性
    return this.taskSubject.asObservable();
  }

  /**
   * Clears all scheduled tasks.
   * @returns The number of tasks cleared.
   */
  public clearAllTasks(): number {
    let count = 0;
    for (let task of this.tasks.values()) {
      clearInterval(task.timer);
      count++;
    }
    this.tasks.clear();
    return count;
  }

  /**
   * Internal method to handle task errors.
   * @param id The ID of the task that caused the error.
   * @param error The error object.
   */
  private handleError(id: string, error: any): void {
# 改进用户体验
    this.taskSubject.next({ id, error });
  }
}
