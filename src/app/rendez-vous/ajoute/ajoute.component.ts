import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVousService } from '../rendez-vous.service';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-ajoute',
  templateUrl: './ajoute.component.html'
})
export class AjouteComponent implements OnInit {
  bookingForm!: FormGroup;
  loading = false;
  success = false;
  today = new Date().toISOString().split('T')[0];

  patients:any = [/* Add mock data or fetch from service */];
  doctors:any  = [/* Add mock data or fetch from service */];
  laboratories :any= [/* Add mock data or fetch from service */];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookingService: RendezVousService,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

    load() {
    this.userService.getUsers().subscribe(users => {
      this.doctors = users.filter(user => user.roles.includes('ROLE_MEDECIN'));
      this.laboratories = users.filter(user => user.roles.includes('ROLE_LABORATOIRE'));
      this.patients = users.filter(user => user.roles.includes('ROLE_PATIENT'));});
  }
  private createForm() {
    this.bookingForm = this.fb.group({
      patientId: ['', Validators.required],
      type: ['AT_LAB', Validators.required],
      date: [this.today, [Validators.required, this.dateValidator()]],
      startTime: ['09:00', Validators.required],
      endTime: ['09:30', Validators.required],
      doctorId: [''],
      laboratoryId: [''],
      notes: ['']
    }, { validators: this.timeValidator });
  }

  private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today ? null : { pastDate: true };
    };
  }

  private timeValidator(group: FormGroup): ValidationErrors | null {
    const date = group.get('date')?.value;
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;

    if (date && start && end) {
      const startDateTime = new Date(`${date}T${start}:00`);
      const endDateTime = new Date(`${date}T${end}:00`);
      return endDateTime > startDateTime ? null : { timeInvalid: true };
    }
    return null;
  }

  getTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'AT_LAB': 'Au laboratoire',
      'AT_OFFICE': 'Au cabinet médical',
      'AT_HOME': 'À domicile',
      'ONLINE': 'En ligne'
    };
    return types[type] || type;
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.loading = true;
      this.bookingService.createBooking(this.bookingForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/rendez-vous']), 2000);
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.loading = false;
        }
      });
    }
  }
}
