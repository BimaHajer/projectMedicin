export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthdate: string;
    address: string;
    role: 'ROLE_MEDECIN' | 'ROLE_LABORANT';
    speciality?: string;
    medicalId?: string;
    description?: string;
    yearsOfExperience?: number;
    latitude?: string;
    longitude?: string;
    laboratoryId?: number;
}
