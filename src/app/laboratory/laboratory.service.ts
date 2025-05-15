import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratoryRequest, LaboratoryResponse } from './models/laboratory.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private readonly API_URL = 'http://localhost:8080/api/laboratories';

  constructor(private http: HttpClient) { }

  getAllLaboratories(): Observable<LaboratoryResponse[]> {
    return this.http.get<LaboratoryResponse[]>(this.API_URL);
  }

  getLaboratoryById(id: number): Observable<LaboratoryResponse> {
    return this.http.get<LaboratoryResponse>(`${this.API_URL}/${id}`);
  }

  createLaboratory(data: LaboratoryRequest): Observable<LaboratoryResponse> {
    return this.http.post<LaboratoryResponse>(this.API_URL, data);
  }

  updateLaboratory(id: number, data: LaboratoryRequest): Observable<LaboratoryResponse> {
    return this.http.put<LaboratoryResponse>(`${this.API_URL}/${id}`, data);
  }

  deleteLaboratory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
