import { AuthUser } from './auth-user';

export interface User extends AuthUser{
  name: string;
  city: string;
  zipCode: string;
  street: string;
  id?: number;
}
