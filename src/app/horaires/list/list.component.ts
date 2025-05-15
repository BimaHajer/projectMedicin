import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorairesService } from '../horaires.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
editrouter(id: any) {
this.router.navigate(['/horaires/edit',id])}
detailrouter(id: number) {
this.router.navigate(['/horaires', id])}
  schedules: any[] = [];
  filteredSchedules: any[] = [];
  searchTerm = '';
  typeFilter = 'all';
  dayFilter = 'all';
  deleteScheduleId: number | null = null;
  showDeleteDialog = false;

  constructor(
    private router: Router,
    private horairesService: HorairesService
  ) {}

  ngOnInit() {
    this.loadSchedules();
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

  getScheduleType(schedule: any): string {
    if (schedule.doctor) return 'doctor';
    if (schedule.laboratory) return 'laboratory';
    return 'unknown';
  }

  getScheduleOwner(schedule: any): string {
    if (schedule.doctor) return schedule.doctor.name;
    if (schedule.laboratory) return schedule.laboratory.name;
    return 'N/A';
  }

  applyFilters() {
    this.filteredSchedules = this.schedules.filter(schedule => {
      const owner = this.getScheduleOwner(schedule);
      const matchesSearch = owner.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = 
        this.typeFilter === 'all' ||
        (this.typeFilter === 'doctor' && schedule.doctor) ||
        (this.typeFilter === 'laboratory' && schedule.laboratory);
      const matchesDay = this.dayFilter === 'all' || schedule.day === this.dayFilter;

      return matchesSearch && matchesType && matchesDay;
    });
  }

  handleDeleteClick(id: number) {
    this.deleteScheduleId = id;
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    if (this.deleteScheduleId) {
      this.horairesService.deleteSchedule(this.deleteScheduleId).subscribe({
        next: () => {
          this.loadSchedules();
          this.showDeleteDialog = false;
          this.deleteScheduleId = null;
        }
      });
    }
  }

  private loadSchedules() {
    this.horairesService.geSchedules().subscribe({
      next: (data:any) => {
        this.schedules = data;
        this.applyFilters();
      }
    });
  }
}
