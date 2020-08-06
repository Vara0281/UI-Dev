export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  cnfPassword?: string;
  isAdmin?: boolean;
}
