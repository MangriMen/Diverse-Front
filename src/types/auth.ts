export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
}

export interface ServerAuthResponse {
  error: boolean;
  user: User;
  token: string;
  message: string;
}
