import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequest, BookingResponse } from './models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private readonly API_URL = 'http://localhost:8080/api/booking';

  constructor(private http: HttpClient) {}

  createBooking(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.API_URL, request);
  }

  getBookingsByDoctorId(doctorId: number): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.API_URL}/doctor/${doctorId}`);
  }

  getBookingsByLaboratoryId(laboratoryId: number): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.API_URL}/lab/${laboratoryId}`);
  }

  getBookingsForCurrentPatient(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.API_URL}/patient`);
  }

  cancelBooking(id: number): Observable<BookingResponse> {
    return this.http.put<BookingResponse>(`${this.API_URL}/cancel/${id}`, {});
  }

  refuseBooking(id: number): Observable<BookingResponse> {
    return this.http.put<BookingResponse>(`${this.API_URL}/refuse/${id}`, {});
  }
}
