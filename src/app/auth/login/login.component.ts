import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Email et mot de passe sont requis';
      return;
    }
    this.isLoading = true;
    this.error = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        document.cookie = `auth_token=${response.token}; path=/; max-age=86400; secure; samesite=strict`;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = 'Email ou mot de passe invalide';
        this.isLoading = false;
      }
    });
  }
}
