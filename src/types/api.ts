export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  displayName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UpdateProfilePayload {
  displayName: string;
  phone: string;
  avatarUrl?: string;
}

export interface ApiErrorData {
  message?: string;
}
