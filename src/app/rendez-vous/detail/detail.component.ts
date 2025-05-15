import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingStatus } from '../models/booking.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  booking: any
  loading = true;
  actionSuccess = false;
  actionMessage = '';
  showActionDialog = false;
  currentAction: 'confirm' | 'refuse' | 'cancel' | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadBooking(id);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  translateStatus(status: string): string {
    const statuses: { [key: string]: string } = {
      'PENDING': 'En attente',
      'CONFIRMED': 'Confirmé',
      'REFUSED': 'Refusé',
      'CANCELED': 'Annulé'
    };
    return statuses[status] || status;
  }

  translateType(type: string): string {
    const types: { [key: string]: string } = {
      'AT_LAB': 'Au laboratoire',
      'AT_HOME': 'À domicile',
      'AT_OFFICE': 'Au cabinet',
      'ONLINE': 'En ligne'
    };
    return types[type] || type;
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'REFUSED': 'bg-red-100 text-red-800',
      'CANCELED': 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  handleAction(action: 'confirm' | 'refuse' | 'cancel') {
    this.currentAction = action;
    this.showActionDialog = true;
  }

  confirmAction() {
    if (!this.booking || !this.currentAction) return;

    // TODO: Replace with actual API call
    setTimeout(() => {
      const newStatus: BookingStatus = 
        this.currentAction === 'confirm' ? 'CONFIRMED' :
        this.currentAction === 'refuse' ? 'REFUSED' : 'CANCELED';

      this.booking = { ...this.booking, status: newStatus };
      this.showActionDialog = false;
      this.actionSuccess = true;
      this.actionMessage = `Rendez-vous ${this.translateStatus(newStatus).toLowerCase()} avec succès!`;

      setTimeout(() => {
        this.actionSuccess = false;
        this.actionMessage = '';
      }, 3000);
    }, 1000);
  }

  private loadBooking(id: number) {
    // TODO: Replace with actual service call
    this.loading = false;
  }
  routing(){
    this.router.navigate(['/rendez-vous'])
  }
}
