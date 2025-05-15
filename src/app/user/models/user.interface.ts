export interface UserUpdateRequest {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: string;
  address: string;
  speciality?: string;
  medicalId?: string;
  description?: string;
  yearsOfExperience?: number;
  latitude?: string;
  longitude?: string;
}

export interface FcmTokenRequest {
  fcmToken: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: string;
  address: string;
  speciality?: string;
  medicalId?: string;
  description?: string;
  yearsOfExperience?: number;
  latitude?: string;
  longitude?: string;
  fcmToken?: string;
  roles: string[];
  accepted: boolean;
}
