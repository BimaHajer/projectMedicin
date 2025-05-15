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

export interface Analysis {
  id: string;
  patientId: string;
  type: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  laboratory: string;
  requestedBy: string;
  results?: AnalysisResult[];
}

export interface AnalysisResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
}
