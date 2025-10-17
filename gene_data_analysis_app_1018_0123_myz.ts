// 代码生成时间: 2025-10-18 01:23:41
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneDataService } from './gene-data.service';
import { GeneData } from './models/gene-data.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Component({
  selector: 'app-gene-data-analysis',
  templateUrl: './gene-data-analysis.component.html',
  styleUrls: ['./gene-data-analysis.component.css']
})
export class GeneDataAnalysisComponent implements OnInit {
  // Gene data form
  geneDataForm: FormGroup;

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private geneDataService: GeneDataService,
    public dialog: MatDialog
  ) {}

  // Initialize form on component initialization
  ngOnInit(): void {
    this.geneDataForm = this.formBuilder.group({
      geneSequence: ['', [Validators.required, Validators.minLength(10)]] // Example validation
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.geneDataForm.valid) {
      const geneData: GeneData = {
        geneSequence: this.geneDataForm.get('geneSequence')!.value
      };

      this.geneDataService.analyzeGeneData(geneData)
        .subscribe({
          next: (result) => {
            // Handle successful analysis result
            console.log('Analysis result:', result);
          },
          error: (error) => {
            // Handle error case, show error dialog
            this.showErrorDialog(error);
          }
        });
    } else {
      // Handle invalid form
      this.showErrorDialog('Invalid gene data input');
    }
  }

  // Show error dialog
  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message }
    });
  }
}

/*
 * Gene Data Service
 * Provides methods to analyze gene data
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GeneData } from './models/gene-data.model';

@Injectable({
  providedIn: 'root'
})
export class GeneDataService {
  private geneDataAnalysisUrl = 'api/gene-data-analysis';

  constructor(private http: HttpClient) {}

  // Method to analyze gene data
  analyzeGeneData(geneData: GeneData): Observable<GeneData> {
    return this.http.post<GeneData>(this.geneDataAnalysisUrl, geneData).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred: ';
    errorMessage += error.message ? error.message : 'Server returned an error.';
    return throwError(errorMessage);
  }
}

/*
 * Gene Data Model
 * Represents the structure of gene data
 */

export interface GeneData {
  geneSequence: string;
}

/*
 * Error Dialog Component
 * Displays error messages to users
 */

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `<div class="error-dialog">
  <h2>Error</h2>
  <p>{{ message }}</p>
  <button (click)="closeDialog()">Close</button>
</div>`
})
export class ErrorDialogComponent {
  message: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
