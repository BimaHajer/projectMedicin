import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisRequest, AnalysisResponse, Analysis, Patient } from './models/analysis.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllAnalyses(): Observable<AnalysisResponse[]> {
    return this.http.get<AnalysisResponse[]>(`${this.API_URL}/analysis`);
  }

  getAnalysisById(id: number): Observable<AnalysisResponse> {
    return this.http.get<AnalysisResponse>(`${this.API_URL}/analysis/${id}`);
  }

  createAnalysis(patientId: number, data: AnalysisRequest): Observable<AnalysisResponse> {
    return this.http.post<AnalysisResponse>(`${this.API_URL}/analysis/${patientId}`, data);
  }

  updateAnalysis(id: number, data: AnalysisRequest): Observable<AnalysisResponse> {
    return this.http.put<AnalysisResponse>(`${this.API_URL}/analysis/${id}`, data);
  }

  deleteAnalysis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/analysis/${id}`);
  }

  getPatient(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.API_URL}/patients/${patientId}`);
  }

  getPatientAnalyses(patientId: string): Observable<Analysis[]> {
    return this.http.get<Analysis[]>(`${this.API_URL}/patients/${patientId}/analyses`);
  }

  getAnalysis(patientId: string, analysisId: string): Observable<Analysis> {
    return this.http.get<Analysis>(
      `${this.API_URL}/patients/${patientId}/analyses/${analysisId}`
    );
  }
}
