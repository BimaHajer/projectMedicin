import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProfileFormData, NotificationSettings } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  notificationsForm!: FormGroup;
  activeTab = 'profile';
  isLoading = false;
  success = false;
  userName = '';
  userRole = '';

  mockUserData = {
    firstName: "Sophie",
    lastName: "Martin",
    email: "dr.sophie@example.com",
    phone: "+21650123456",
    address: "12 Avenue Habib Bourguiba, Tunis, Tunisie",
    speciality: "Cardiologie",
    medicalId: "MED-12345678",
    bio: "Cardiologue avec 10 ans d'expérience",
    role: "ROLE_MEDECIN",
    createdAt: "2022-05-15",
    lastLogin: "2023-11-05T08:30:45"
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadProfile();
  }

  private initializeForms() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      speciality: [''],
      medicalId: [''],
      bio: ['']
    });

    this.notificationsForm = this.fb.group({
      emailNotifications: [true],
      pushNotifications: [true],
      smsNotifications: [false],
      newPatientNotification: [true],
      appointmentReminders: [true],
      systemUpdates: [false]
    });
  }

  private loadProfile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.mockUserData = data;
        this.profileForm.patchValue(data);
        this.setUserInfo();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  private setUserInfo() {
    const email = this.mockUserData.email;
    const name = email.split('@')[0];
    this.userName = 'Dr. ' + name
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    this.userRole = this.translateRole(this.mockUserData.role);
  }

  translateRole(role: string): string {
    const roles: { [key: string]: string } = {
      'ROLE_ADMIN': 'Administrateur',
      'ROLE_MEDECIN': 'Médecin',
      'ROLE_LABORANT': 'Laborantin'
    };
    return roles[role] || role;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR');
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.success = false, 3000);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  onNotificationsSubmit() {
    if (this.notificationsForm.valid) {
      this.isLoading = true;
      this.userService.updateNotifications(this.notificationsForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.success = false, 3000);
        },
        error: (error) => {
          console.error('Error updating notifications:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/auth/login']);
  }
}
