import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: Patient[] = [];
  searchTerm = '';
  genderFilter = 'all';

  constructor(
    private patientsService: PatientsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientsService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.applyFilters();
      }
    });
  }

  applyFilters() {
    this.filteredPatients = this.patients.filter(patient => {
      const matchesSearch = 
        patient.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.insuranceNumber.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesGender = this.genderFilter === 'all' || patient.gender === this.genderFilter;

      return matchesSearch && matchesGender;
    });
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.applyFilters();
  }

  onGenderFilterChange(value: string) {
    this.genderFilter = value;
    this.applyFilters();
  }

  viewAnalyses(patientId: string) {
    this.router.navigate(['/patients', patientId, 'analyses']);
  }
}