import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { passwordValidator } from '../models/user-form.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  success = false;
  error = '';
  activeTab = 'info';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
   this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [passwordValidator]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      birthdate: [''],
      address: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required],
      speciality: [''],
      medicalId: [''],
      description: [''],
      yearsOfExperience: [''],
      latitude: [''],
      longitude: ['']
    });

    this.userForm.get('role')?.valueChanges.subscribe(role => {
      this.updateValidators(role);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadUser(id);
  }


  private updateValidators(role: string) {
    const medecinControls = ['speciality', 'medicalId', 'description', 'yearsOfExperience', 'latitude', 'longitude'];
    
    if (role === 'ROLE_MEDECIN') {
      medecinControls.forEach(control => {
        this.userForm.get(control)?.setValidators(Validators.required);
      });
    } else {
      medecinControls.forEach(control => {
        this.userForm.get(control)?.clearValidators();
      });
    }
    
    this.userForm.updateValueAndValidity();
  }

  private loadUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (user:any) => {
        delete user.password; // Don't fill password field
        this.userForm.patchValue(user);
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement de l\'utilisateur';
        this.router.navigate(['/user/list']);
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.loading = true;
    this.error = '';

    const id = this.route.snapshot.params['id'];
    this.userService.updateUser(id, this.userForm.value).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/user/list']), 2000);
      },
      error: (error) => {
        this.error = 'Erreur lors de la mise à jour';
        this.loading = false;
      }
    });
  }
}
