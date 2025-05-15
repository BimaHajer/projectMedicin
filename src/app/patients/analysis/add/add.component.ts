import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from '../analysis.service';
import { Patient } from '../models/analysis.models';
import { AnalysisForm } from '../models/analysis-form.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  analysisForm!: FormGroup;
  patient: Patient | undefined;
  success = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: AnalysisService
  ) {
    this.createForm();
  }

  ngOnInit() {
    const patientId = this.route.snapshot.params['id'];
    this.loadPatient(patientId);
  }

  private createForm() {
    this.analysisForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(2)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      laboratory: ['', [Validators.required, Validators.minLength(2)]],
      requestedBy: ['', [Validators.required, Validators.minLength(2)]],
      status: ['pending', Validators.required],
      comments: [''],
      results: this.fb.array([])
    });

    this.analysisForm.get('status')?.valueChanges.subscribe(status => {
      if (status === 'completed' && this.results.length === 0) {
        this.addResult();
      }
    });
  }

  get results() {
    return this.analysisForm.get('results') as FormArray;
  }

  addResult() {
    const resultGroup = this.fb.group({
      parameter: ['', Validators.required],
      value: [''],
      unit: [''],
      referenceRange: [''],
      isAbnormal: [false]
    });
    this.results.push(resultGroup);
  }

  removeResult(index: number) {
    this.results.removeAt(index);
  }

  private loadPatient(patientId: string) {
    this.analysisService.getPatient(patientId).subscribe({
      next: (patient) => this.patient = patient,
      error: () => this.router.navigate(['/patients'])
    });
  }

  onSubmit() {
    if (this.analysisForm.valid) {
      this.loading = true;
      const patientId = this.route.snapshot.params['id'];
      
      this.analysisService.createAnalysis(patientId, this.analysisForm.value).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/patients', patientId, 'analyses']), 2000);
        },
        error: (error) => {
          console.error('Error creating analysis:', error);
          this.loading = false;
        }
      });
    }
  }
}
