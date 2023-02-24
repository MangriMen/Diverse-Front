import { ServerUserResponse } from 'dtos/user';

export interface AuthState {
  userId: ServerUserResponse | null;
  isInit: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}
