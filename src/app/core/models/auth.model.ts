export interface IAuthModel {
  email: string;
  message: string;
  token: string;
  isAuthenticated: boolean;
  expiresOn: Date;
  errors: string[];
  roles: string[];
}
