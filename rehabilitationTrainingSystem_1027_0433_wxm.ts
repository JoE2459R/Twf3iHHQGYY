// 代码生成时间: 2025-10-27 04:33:09
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RehabilitationTrainingSystemService {

  private baseUrl = 'http://api.rehabilitation-system.com';

  constructor(private http: HttpClient) { }

  /**
   * Fetches all rehabilitation training programs
   * @returns An Observable of the training programs
   */
  getTrainingPrograms(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/programs`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves a specific training program by ID
   * @param programId The ID of the training program
   * @returns An Observable of the training program
   */
  getTrainingProgram(programId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/programs/${programId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new training program
   * @param program The training program data
   * @returns An Observable of the created program
   */
  createTrainingProgram(program: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/programs`, program)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing training program
   * @param programId The ID of the training program to update
   * @param program The updated training program data
   * @returns An Observable of the updated program
   */
  updateTrainingProgram(programId: number, program: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/programs/${programId}`, program)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a training program
   * @param programId The ID of the training program to delete
   * @returns An Observable of the deletion result
   */
  deleteTrainingProgram(programId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/programs/${programId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
