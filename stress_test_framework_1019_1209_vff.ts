// 代码生成时间: 2025-10-19 12:09:40
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StressTestService {
  constructor(private http: HttpClient) {}

  /*
   * Perform a stress test by sending multiple HTTP requests.
   * @param testConfig The configuration object containing test details.
   * @returns An Observable of test results.
   */
  public performStressTest(testConfig: TestConfig): Observable<TestResult[]> {
    return this.createRequestObservable(testConfig).pipe(
      retry(3), // Retry up to 3 times on failure
      catchError(this.handleError)
    );
  }

  /*
   * Create an observable for sending HTTP requests based on test configuration.
   * @param testConfig The test configuration object.
   * @returns An Observable of HTTP responses.
   */
  private createRequestObservable(testConfig: TestConfig): Observable<HttpResponse<any>> {
    const requests = [];
    for (let i = 0; i < testConfig.numRequests; i++) {
      const req = this.http.request(testConfig.method, testConfig.url) as Observable<HttpResponse<any>>;
      requests.push(req);
    }
    return Observable.forkJoin(requests);
  }

  /*
   * Handle HTTP errors.
   * @param error The error to handle.
   * @returns An Observable of the error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

/*
 * Test configuration interface.
 */
export interface TestConfig {
  numRequests: number;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

/*
 * Test result interface.
 */
export interface TestResult {
  success: boolean;
  responseTime: number;
  status: number;
}
