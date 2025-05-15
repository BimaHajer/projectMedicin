import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaboratoryService } from '../laboratory.service';
import { Laboratory } from '../models/laboratory.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  laboratories: Laboratory[] = [];
  loading = false;
  error = '';

  constructor(
    private laboratoryService: LaboratoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadLaboratories();
  }

  loadLaboratories() {
    this.loading = true;
    this.laboratoryService.getAllLaboratories().subscribe({
      next: (data) => {
        this.laboratories = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des laboratoires';
        this.loading = false;
      }
    });
  }

  editLaboratory(id: number) {
    this.router.navigate(['/laboratory/update', id]);
  }

  deleteLaboratory(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce laboratoire ?')) {
      this.laboratoryService.deleteLaboratory(id).subscribe({
        next: () => {
          this.loadLaboratories();
        },
        error: (error) => {
          this.error = 'Erreur lors de la suppression';
        }
      });
    }
  }
}
