export interface Patient {
  id: number;
  name: string;
}

export interface Doctor {
  id: number;
  name: string;
  speciality?: string;
}

export interface Laboratory {
  id: number;
  name: string;
}

export interface BookingForm {
  patientId: string;
  type: 'AT_LAB' | 'AT_HOME' | 'AT_OFFICE' | 'ONLINE';
  date: string;
  startTime: string;
  endTime: string;
  doctorId?: string;
  laboratoryId?: string;
  notes?: string;
}
