import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  patientForm!: FormGroup;
  activeTab = 'personal';
  loading = false;
  success = false;
  today = new Date().toISOString().split('T')[0];

  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientsService: PatientsService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      insuranceNumber: ['', Validators.required],
      bloodType: [''],
      allergies: [''],
      chronicDiseases: [''],
      currentMedications: [''],
      familyHistory: [''],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.loading = true;
      this.patientsService.registerFcmToken(this.patientForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/patients']), 2000);
        },
        error: (error) => {
          console.error('Error creating patient:', error);
          this.loading = false;
        }
      });
    }
  }
}
