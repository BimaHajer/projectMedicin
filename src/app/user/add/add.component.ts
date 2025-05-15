import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  userForm!: FormGroup;
  activeTab = 'info';
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      birthdate: [''],
      address: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required],
      speciality: [''],
      medicalId: [''],
      description: [''],
      yearsOfExperience: [''],
      latitude: [''],
      longitude: ['']
    });

    this.userForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'ROLE_MEDECIN') {
        this.userForm.get('speciality')?.setValidators([Validators.required]);
        this.userForm.get('medicalId')?.setValidators([Validators.required]);
      } else {
        this.userForm.get('speciality')?.clearValidators();
        this.userForm.get('medicalId')?.clearValidators();
      }
      this.userForm.get('speciality')?.updateValueAndValidity();
      this.userForm.get('medicalId')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      this.userService.registerFcmToken(this.userForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/user/list']), 2000);
        },
        error: (error:any) => {
          console.error('Error creating user:', error);
          this.loading = false;
        }
      });
    }
  }
}
