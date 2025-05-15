import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HorairesService } from '../horaires.service';
import { LaboratoryService } from '../../laboratory/laboratory.service';
import { UserService } from '../../user/services/user.service';
import {  Doctor, Laboratory } from '../models/schedule.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
  scheduleForm!: FormGroup;
  doctors: any
  laboratories: Laboratory[] = [];
  loading = true;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private horairesService: HorairesService,
    private laboratoryService: LaboratoryService,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
    const scheduleId = this.route.snapshot.params['id'];
    this.loadData(scheduleId);
  }

  private createForm() {
    this.scheduleForm = this.fb.group({
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      slot: [30, [Validators.required, Validators.min(5), Validators.max(120)]],
      ownerType: ['doctor', Validators.required],
      doctorId: [''],
      laboratoryId: ['']
    }, { validators: this.timeValidator });
  }

  private loadData(scheduleId: number) {
    forkJoin({
      schedule: this.horairesService.getSchedule(scheduleId),
      doctors: this.userService.getUsers(),
      laboratories: this.laboratoryService.getAllLaboratories()
    }).subscribe({
      next: (data) => {
        this.doctors = data;
        this.laboratories = data.laboratories;
        this.patchFormValues(data.schedule);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
      }
    });
  }

  private patchFormValues(schedule: any) {
    this.scheduleForm.patchValue({
      day: schedule.day,
      start: schedule.start,
      end: schedule.end,
      slot: schedule.slot,
      ownerType: schedule.doctor ? 'doctor' : 'laboratory',
      doctorId: schedule.doctor?.id.toString(),
      laboratoryId: schedule.laboratory?.id.toString()
    });
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

  onSubmit() {
    if (this.scheduleForm.valid) {
      const scheduleId = this.route.snapshot.params['id'];
      this.loading = true;

      this.horairesService.updateSchedule(scheduleId, this.scheduleForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/horaires']), 2000);
        },
        error: (error) => {
          console.error('Error updating schedule:', error);
          this.error = 'Erreur lors de la mise à jour';
          this.loading = false;
        }
      });
    }
  }
}
