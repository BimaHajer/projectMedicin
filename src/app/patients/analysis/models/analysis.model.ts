export interface AnalysisRequest {
  type: string;
  description: string;
  date: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  results?: string;
  remarks?: string;
  laboratoryId: number;
}

export interface AnalysisResponse extends AnalysisRequest {
  id: number;
  patientId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "M" | "F";
  phone: string;
  email: string;
  bloodType?: string;
}

export interface AnalysisResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
}

export interface Analysis {
  id: string;
  patientId: string;
  type: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  laboratory: string;
  requestedBy: string;
  results?: AnalysisResult[];
  comments?: string;
}
