import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { UserUpdateRequest, FcmTokenRequest, UserResponse } from '../models/user.interface';
import { ProfileFormData, NotificationSettings } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly API_URL = 'http://localhost:8080/api/users'; // Updated base URL
  private users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/${id}`);
  }

  updateUser(id: number, data: UserUpdateRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, data);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${userId}`);
  }

  approveUser(userId: number, approvalData: { accepted: boolean }): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${userId}/approval`, approvalData);
  }

  registerFcmToken(token: string): Observable<UserResponse> {
    const request: FcmTokenRequest = { fcmToken: token };
    return this.http.post<UserResponse>(`${this.API_URL}/fcm-token`, request);
  }

  getUserProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/profile`);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`);
  }

  updateProfile(data: ProfileFormData): Observable<any> {
    return this.http.put(`${this.API_URL}/profile`, data);
  }

  updateNotifications(settings: NotificationSettings): Observable<any> {
    return this.http.put(`${this.API_URL}/notifications`, settings);
  }

  // Translate roles (optional helper)
  translateRole(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN': return 'Administrateur';
      case 'ROLE_MEDECIN': return 'Médecin';
      case 'ROLE_LABORANT': return 'Laborantin';
      default: return role;
    }
  }
}