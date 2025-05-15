export interface LaboratoryRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  openingHours?: string;
  latitude?: string;
  longitude?: string;
}

export interface LaboratoryResponse extends LaboratoryRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Laboratory {
  id: number;
  name: string;
  phone: string;
  address: string;
  description?: string;
  latitude?: string;
  longitude?: string;
}
