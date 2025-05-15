export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthdate: Date;
  address: string;
  speciality?: string;
  medicalId?: string;
  description?: string;
  yearsOfExperience?: number;
  latitude?: string;
  longitude?: string;
  fcmToken?: string;
  roles: string[];
  laboratoryId?: number;
  accepted: boolean;
}
