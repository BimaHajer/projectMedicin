import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleRequest, ScheduleResponse } from './models/schedule.model';
import { Doctor, Laboratory } from './models/schedule-form.model';

@Injectable({
  providedIn: 'root'
})
export class HorairesService {
  getAllSchedules() {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  geSchedules() {
      return this.http.get<ScheduleResponse>(`${this.API_URL}/schedules`);
  }

  createSchedule(data: ScheduleRequest): Observable<ScheduleResponse> {
    return this.http.post<ScheduleResponse>(`${this.API_URL}/schedules`, data);
  }

  updateSchedule(id: number, data: ScheduleRequest): Observable<ScheduleResponse> {
    return this.http.put<ScheduleResponse>(`${this.API_URL}/schedules/${id}`, data);
  }

  getSchedule(id: number): Observable<ScheduleResponse> {
    return this.http.get<ScheduleResponse>(`${this.API_URL}/schedules/${id}`);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/schedules/${id}`);
  }

  getDoctorSchedules(doctorId: number): Observable<ScheduleResponse[]> {
    return this.http.get<ScheduleResponse[]>(`${this.API_URL}/schedules/by-doctor/${doctorId}`);
  }

  getLaboratorySchedules(laboratoryId: number): Observable<ScheduleResponse[]> {
    return this.http.get<ScheduleResponse[]>(`${this.API_URL}/schedules/by-laboratory/${laboratoryId}`);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API_URL}/users/doctors`);
  }

  getLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(`${this.API_URL}/laboratories`);
  }
}
