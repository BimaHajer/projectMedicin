import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HorairesService } from '../horaires.service';
import { Doctor, Laboratory } from '../models/schedule-form.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  scheduleForm!: FormGroup;
  success = false;
  loading = false;
  doctors: Doctor[] = [];
  laboratories: Laboratory[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private horairesService: HorairesService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadDoctorsAndLabs();
  }

  private createForm() {
    this.scheduleForm = this.fb.group({
      day: ['', Validators.required],
      start: ['09:00', Validators.required],
      end: ['17:00', Validators.required],
      slot: [30, [Validators.required, Validators.min(5), Validators.max(120)]],
      ownerType: ['doctor', Validators.required],
      doctorId: [''],
      laboratoryId: ['']
    }, { validators: this.timeValidator });
  }

  private timeValidator(group: FormGroup) {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    
    if (start && end) {
      const startTime = new Date(`2000-01-01T${start}`);
      const endTime = new Date(`2000-01-01T${end}`);
      return endTime > startTime ? null : { timeInvalid: true };
    }
    return null;
  }

  private loadDoctorsAndLabs() {
    this.horairesService.getDoctors().subscribe({
      next: (doctors) => this.doctors = doctors,
      error: (error) => console.error('Error loading doctors:', error)
    });

    this.horairesService.getLaboratories().subscribe({
      next: (labs) => this.laboratories = labs,
      error: (error) => console.error('Error loading laboratories:', error)
    });
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      this.loading = true;
      this.horairesService.createSchedule(this.scheduleForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/horaires']), 2000);
        },
        error: (error) => {
          console.error('Error creating schedule:', error);
          this.loading = false;
        }
      });
    }
  }
}
