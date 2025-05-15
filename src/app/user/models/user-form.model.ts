import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface UserForm {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: string;
  address: string;
  role: string;
  speciality?: string;
  medicalId?: string;
  description?: string;
  yearsOfExperience?: number;
  latitude?: string;
  longitude?: string;
}

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

  return !valid ? { passwordStrength: true } : null;
};
