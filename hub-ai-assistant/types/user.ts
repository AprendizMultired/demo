export interface UserData {
  fullName: string;
  document: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  document: string;
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
