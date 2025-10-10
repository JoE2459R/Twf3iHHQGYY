// 代码生成时间: 2025-10-11 03:42:20
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
# 扩展功能模块
import { catchError } from 'rxjs/operators';

// Interface to model the data received from the server
interface TrainingStatus {
# 添加错误处理
  modelId: string;
  status: 'training' | 'completed' | 'failed';
  progress: number; // Progress in percentage
  error?: string; // Error message if the status is 'failed'
}
# 扩展功能模块

// Component for monitoring model training status
@Component({
  selector: 'app-training-monitor',
  templateUrl: './training-monitor.component.html',
  styleUrls: ['./training-monitor.component.css']
})
export class TrainingMonitorComponent implements OnInit {

  // Properties to hold the training status data and error messages
  trainingStatus: TrainingStatus = {
# TODO: 优化性能
    modelId: '',
    status: 'training',
    progress: 0
  };
  error: string | null = null;

  // Inject the HttpClient from Angular's dependency injection system
# 扩展功能模块
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
# 添加错误处理
    // Call the method to fetch the training status when the component initializes
    this.fetchTrainingStatus();
  }

  // Method to fetch the training status from the server
  private fetchTrainingStatus(): void {
    const url = '/api/training/status'; // URL to fetch the training status

    // Use HttpClient to make a GET request and pipe the result through catchError
    this.http.get<TrainingStatus>(url).pipe(
# 改进用户体验
      catchError(this.handleError) // Handle any potential errors
# NOTE: 重要实现细节
    ).subscribe({
      next: (response) => {
# TODO: 优化性能
        // Update the training status with the response from the server
        this.trainingStatus = response;
      },
# NOTE: 重要实现细节
      error: (err) => {
        // Set the error message if there is an error
        this.error = err.message;
      }
    });
# 改进用户体验
  }

  // Method to handle errors that may occur during HTTP requests
  private handleError(error: HttpErrorResponse) {
# TODO: 优化性能
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return throwError('An error occurred: ' + error.error.message);
# FIXME: 处理边界情况
    } else {
      // The backend returned an unsuccessful response code
      return throwError(`Backend returned code ${error.status}. Body was: ${error.error}`);
    }
# 添加错误处理
  }
}
# 添加错误处理