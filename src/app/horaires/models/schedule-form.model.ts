export interface Doctor {
  id: number;
  name: string;
  speciality?: string;
}

export interface Laboratory {
  id: number;
  name: string;
}

export interface ScheduleForm {
  day: string;
  start: string;
  end: string;
  slot: number;
  ownerType: 'doctor' | 'laboratory';
  doctorId?: string;
  laboratoryId?: string;
}
