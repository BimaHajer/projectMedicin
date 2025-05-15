export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface ScheduleRequest {
  day: DayOfWeek;
  start: string;
  end: string;
  slot: number;
  doctorId?: number;
  laboratoryId?: number;
}

export interface Doctor {
  id: number;
  name: string;
}

export interface Laboratory {
  id: number;
  name: string;
}

export interface ScheduleResponse {
  id: number;
  day: DayOfWeek;
  start: string;
  end: string;
  slot: number;
  doctor?: Doctor;
  laboratory?: Laboratory;
}
