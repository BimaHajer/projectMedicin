import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRequest, PatientResponse, AdminApprovalRequest } from './models/patient.model';
import { FcmTokenRequest, UserResponse } from '../user/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private readonly API_URL = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(this.API_URL);
  } 
   registerFcmToken(token: string): Observable<UserResponse> {
      const request: FcmTokenRequest = { fcmToken: token };
      return this.http.post<UserResponse>(`${this.API_URL}/fcm-token`, request);
    }

  updatePatient(id: number, data: PatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.API_URL}/${id}`, data);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  approvePatient(id: number, data: AdminApprovalRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.API_URL}/${id}/approval`, data);
  }

  // Filter methods
  getAcceptedPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.API_URL}?accepted=true`);
  }

  getPendingPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.API_URL}?accepted=false`);
  }
}
