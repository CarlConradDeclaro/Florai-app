export interface DecodedToken {
  full_name: string;
  username: string;
  email: string;
  exp?: number;
}

export interface AuthContextType {
  user: DecodedToken | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    password2: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  error2: string | null;
}
