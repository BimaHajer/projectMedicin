import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  userName = '';
  email = '';
  specialty = 'Cardiologie';
  medicalId = 'MED-12345678';
  experience = 10;
  phone = '+21650123456';
  address = '12 Avenue Habib Bourguiba, Tunis, Tunisie';
  about = 'Cardiologue avec 10 ans d\'expérience en cardiologie interventionnelle.';

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    const email = localStorage.getItem('userEmail') || 'dr.sophie@example.com';
    this.email = email;
    
    const name = email.split('@')[0];
    this.userName = 'Dr. ' + name
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
