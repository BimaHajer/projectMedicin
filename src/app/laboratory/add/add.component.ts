import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaboratoryService } from '../laboratory.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  laboratoryForm: FormGroup;
  isLoading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private laboratoryService: LaboratoryService
  ) {
    this.laboratoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.laboratoryForm.valid) {
      this.isLoading = true;
      this.laboratoryService.createLaboratory(this.laboratoryForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/laboratory/list']), 2000);
        },
        error: (error) => {
          console.error('Error creating laboratory:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
