import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error = '';
  isMedecin = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      role: ['ROLE_MEDECIN'],
      speciality: [''],
      medicalId: [''],
      description: [''],
      yearsOfExperience: [null],
      latitude: [''],
      longitude: [''],
      laboratoryId: [null]
    });

    // Update form validation based on role
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.isMedecin = role === 'ROLE_MEDECIN';
      this.updateValidation();
    });
  }

  ngOnInit(): void {
    this.updateValidation();
  }

  private updateValidation() {
    const medecinControls = ['speciality', 'medicalId', 'description', 'yearsOfExperience', 'latitude', 'longitude'];
    const laboratoryControls = ['laboratoryId'];

    if (this.isMedecin) {
      medecinControls.forEach(control => 
        this.registerForm.get(control)?.setValidators(Validators.required));
      laboratoryControls.forEach(control => 
        this.registerForm.get(control)?.clearValidators());
    } else {
      medecinControls.forEach(control => 
        this.registerForm.get(control)?.clearValidators());
      laboratoryControls.forEach(control => 
        this.registerForm.get(control)?.setValidators(Validators.required));
    }

    this.registerForm.updateValueAndValidity();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = 'Une erreur est survenue lors de l\'inscription';
        this.isLoading = false;
      }
    });
  }
}
