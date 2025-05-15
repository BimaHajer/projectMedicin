import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AnalysisService } from '../analysis.service';
import { Analysis, Patient } from '../models/analysis.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  patient: Patient | undefined;
  analysis: Analysis | undefined;
  abnormalCount = 0;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: AnalysisService
  ) {}

  ngOnInit() {
    const patientId = this.route.snapshot.params['id'];
    const analysisId = this.route.snapshot.params['analysisId'];
    
    forkJoin({
      patient: this.analysisService.getPatient(patientId),
      analysis: this.analysisService.getAnalysis(patientId, analysisId)
    }).subscribe({
      next: (data) => {
        this.patient = data.patient;
        this.analysis = data.analysis;
        this.abnormalCount = this.calculateAbnormalCount();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading analysis details:', error);
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  translateStatus(status: string): string {
    const statuses: { [key: string]: string } = {
      'pending': 'En attente',
      'completed': 'Terminé',
      'cancelled': 'Annulé'
    };
    return statuses[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  calculateAbnormalCount(): number {
    return this.analysis?.results?.filter(r => r.isAbnormal).length || 0;
  }

  goBack() {
    const patientId = this.patient?.id || this.route.snapshot.params['id'];
    this.router.navigate(['/patients', patientId, 'analyses']);
  }
}
