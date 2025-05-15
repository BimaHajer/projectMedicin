import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Booking {
  id: number;
  start: string;
  end: string;
  status: "PENDING" | "CONFIRMED" | "REFUSED" | "CANCELED";
  type: "AT_LAB" | "AT_HOME" | "AT_OFFICE" | "ONLINE";
  patient: {
    id: number;
    name: string;
  };
  laboratory?: {
    id: number;
    name: string;
  };
  doctor?: {
    id: number;
    name: string;
  };
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm = '';
  statusFilter = 'all';
  typeFilter = 'all';
  selectedTab = 'all';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBookings();
  }

  private loadBookings() {
    // TODO: Replace with actual service call
    // For now using mock data
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

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'REFUSED': 'bg-red-100 text-red-800',
      'CANCELED': 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  applyFilters() {
    this.filteredBookings = this.bookings.filter(booking => {
      const matchesSearch = 
        booking.patient.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (booking.doctor?.name.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (booking.laboratory?.name.toLowerCase() || '').includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.statusFilter === 'all' || booking.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || booking.type === this.typeFilter;
      const matchesTab = this.matchesSelectedTab(booking);

      return matchesSearch && matchesStatus && matchesType && matchesTab;
    });
  }

  private matchesSelectedTab(booking: Booking): boolean {
    const bookingDate = new Date(booking.start);
    switch (this.selectedTab) {
      case 'today': return this.isToday(bookingDate);
      case 'upcoming': return this.isFuture(bookingDate);
      case 'past': return this.isPast(bookingDate);
      default: return true;
    }
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private isFuture(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today && !this.isToday(date);
  }

  private isPast(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }
  routernavigator(id: number) {
   this.router.navigate(['/rendez-vous', id])
  } 
}
