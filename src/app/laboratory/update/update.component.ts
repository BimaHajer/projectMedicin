import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryService } from '../laboratory.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
  laboratoryForm: FormGroup;
  isLoading = false;
  initialLoading = true;
  success = false;
  labId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private laboratoryService: LaboratoryService
  ) {
    this.labId = this.route.snapshot.params['id'];
    this.laboratoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit() {
    this.loadLaboratory();
  }

  private loadLaboratory() {
    this.laboratoryService.getLaboratoryById(this.labId).subscribe({
      next: (lab) => {
        this.laboratoryForm.patchValue(lab);
        this.initialLoading = false;
      },
      error: () => {
        this.router.navigate(['/laboratory/list']);
      }
    });
  }

  onSubmit() {
    if (this.laboratoryForm.valid) {
      this.isLoading = true;
      this.laboratoryService.updateLaboratory(this.labId, this.laboratoryForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/laboratory/list']), 2000);
        },
        error: (error) => {
          console.error('Error updating laboratory:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
