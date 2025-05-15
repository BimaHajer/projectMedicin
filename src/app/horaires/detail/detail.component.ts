import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorairesService } from '../horaires.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  schedule: any | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horairesService: HorairesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadSchedule(id);
  }

  private loadSchedule(id: number) {
    this.horairesService.getSchedule(id).subscribe({
      next: (data) => {
        this.schedule = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading schedule:', error);
        this.error = 'Erreur lors du chargement des détails';
        this.loading = false;
      }
    });
  }

  translateDay(day: string): string {
    const days: { [key: string]: string } = {
      'MONDAY': 'Lundi',
      'TUESDAY': 'Mardi',
      'WEDNESDAY': 'Mercredi',
      'THURSDAY': 'Jeudi',
      'FRIDAY': 'Vendredi',
      'SATURDAY': 'Samedi',
      'SUNDAY': 'Dimanche'
    };
    return days[day] || day;
  }

  deleteSchedule() {
    if (this.schedule) {
      this.horairesService.deleteSchedule(this.schedule.id).subscribe({
        next: () => this.router.navigate(['/horaires']),
        error: (error) => console.error('Error deleting schedule:', error)
      });
    }
  }
}
