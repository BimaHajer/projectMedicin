export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "M" | "F";
  phone: string;
  email: string;
  address: string;
  insuranceNumber: string;
  bloodType?: string;
}

export interface PatientRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthdate: string;
}

export interface AdminApprovalRequest {
  accepted: boolean;
  remarks?: string;
}

export interface PatientResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthdate: string;
  accepted: boolean;
  createdAt: string;
  updatedAt: string;
}
