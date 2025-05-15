export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REFUSED' | 'CANCELED';
export type BookingType = 'AT_LAB' | 'AT_HOME' | 'AT_OFFICE' | 'ONLINE';

export interface Booking {
  id: number;
  start: string;
  end: string;
  status: BookingStatus;
  type: BookingType;
  patient: {
    id: number;
    name: string;
  };
  laboratory?: {
    id: number;
    name: string;
  };
  doctor?: {
    id: number;
    name: string;
  };
  notes?: string;
}

export interface BookingRequest {
  patientId: number;
  doctorId?: number;
  laboratoryId?: number;
  startTime: string;
  endTime: string;
  type: 'AT_LAB' | 'AT_HOME' | 'AT_OFFICE' | 'ONLINE';
  notes?: string;
}

export interface BookingResponse {
  id: number;
  startTime: string;
  endTime: string;
  type: 'AT_LAB' | 'AT_HOME' | 'AT_OFFICE' | 'ONLINE';
  status: 'PENDING' | 'CONFIRMED' | 'REFUSED' | 'CANCELED';
  patient: {
    id: number;
    name: string;
  };
  doctor?: {
    id: number;
    name: string;
  };
  laboratory?: {
    id: number;
    name: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
