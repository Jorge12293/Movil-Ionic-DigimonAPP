import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorFormService {

  constructor() { }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim() === '') {
        return { 'whitespace': true };
      }
      return null;
    };
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('new_password');
    const confirmPassword = control.get('confirm_password');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordsMismatch': true };
    }
    return null;
  }


}
