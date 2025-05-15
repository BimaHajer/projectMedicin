import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm = '';
  genderFilter = 'all';

  constructor(private router: Router) {}

  ngOnInit() {
    // TODO: Replace with actual service call
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

  viewAnalyses(patientId: string) {
    this.router.navigate(['/patients', patientId, 'analyses']);
  }
}
