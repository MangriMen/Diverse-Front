export interface AuthState {
  userId: string | null;
  isInit: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface FetchValues {
  token: string;
}
