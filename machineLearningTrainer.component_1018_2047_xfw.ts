// 代码生成时间: 2025-10-18 20:47:15
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MachineLearningService } from './machineLearning.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from './error-dialog.component'; // Assuming an error dialog component

@Component({
  selector: 'app-machine-learning-trainer',
  templateUrl: './machine-learning-trainer.component.html',
  styleUrls: ['./machine-learning-trainer.component.css']
})
export class MachineLearningTrainerComponent implements OnInit {
  // Input property for passing configurations
  @Input() configurations: any;

  // Form group for handling model training data
  modelTrainingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private machineLearningService: MachineLearningService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  // Create the form for model training
  createForm(): void {
    this.modelTrainingForm = this.formBuilder.group({
      // Assuming 'dataPath' and 'modelName' are required fields
      dataPath: ['', [Validators.required]],
      modelName: ['', [Validators.required]]
    });
  }

  // Method to train the model
  trainModel(): void {
    if (this.modelTrainingForm.valid) {
      const formData = this.modelTrainingForm.value;
      this.machineLearningService.train(formData)
        .pipe(
          catchError(error => {
            this.openErrorDialog(error);
            return throwError(error);
          })
        )
        .subscribe({
          next: (response) => {
            this.snackBar.open('Model trained successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackBar.open('Error training model', 'Close', {
              duration: 3000,
            });
          }
        });
    } else {
      this.modelTrainingForm.markAllAsTouched(); // Mark form as touched to show validation errors
    }
  }

  // Opens a dialog to display error messages
  openErrorDialog(error: any): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message: error.message }
    });
  }
}

/* Machine Learning Service */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MachineLearningService {
  constructor(private http: HttpClient) {}

  // Method to train the machine learning model
  train(formData: any): Observable<any> {
    const url = '/api/train-model'; // Assuming API endpoint for model training
    return this.http.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP error
  private handleError(error: any): Observable<never> {
    // Log error or perform additional error handling
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}

/* Error Dialog Component */
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  template: `<h1 mat-dialog-title>Error</h1>
               <p mat-dialog-content>{{ data.message }}</p>
               <button mat-dialog-close>Close</button>`,
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {}
}