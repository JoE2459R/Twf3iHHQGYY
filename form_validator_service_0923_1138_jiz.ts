// 代码生成时间: 2025-09-23 11:38:37
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  
  // Function to validate the required fields
  private static validateRequired(field: string): ValidatorFn {
    return (control: any): ValidationErrors | null => {
      if (!control.value || control.value.trim() === '') {
        return { 'required': true };
      }
      return null;
    };
  }

  // Function to validate the email format
  private static validateEmail(field: string): ValidatorFn {
    return (control: any): ValidationErrors | null => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!control.value || !regex.test(control.value)) {
        return { 'invalidEmail': true };
      }
      return null;
    };
  }

  // Function to validate the password strength
  private static validatePasswordStrength(field: string): ValidatorFn {
    return (control: any): ValidationErrors | null => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=\S+$).{8,}$/;
      if (!control.value || !regex.test(control.value)) {
        return { 'weakPassword': true };
      }
      return null;
    };
  }

  // Function to add custom validators to a form group
  addValidators(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        // Add required validator
        control.setValidators([FormValidatorService.validateRequired(field)]);

        // Add email validator if field is an email
        if (field === 'email') {
          control.setValidators([...control.validator, FormValidatorService.validateEmail(field)]);
        }

        // Add password strength validator if field is a password
        if (field === 'password') {
          control.setValidators([...control.validator, FormValidatorService.validatePasswordStrength(field)]);
        }

        // Update the validity state of the control
        control.updateValueAndValidity();
      }
    });
  }

  // Function to clear errors from all form controls
  clearErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        control.setErrors(null);
      }
    });
  }
}
