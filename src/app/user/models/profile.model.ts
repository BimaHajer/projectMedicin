export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  speciality?: string;
  medicalId?: string;
  bio?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  newPatientNotification: boolean;
  appointmentReminders: boolean;
  systemUpdates: boolean;
}
