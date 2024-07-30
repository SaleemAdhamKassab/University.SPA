export enum userType {
  Student,
  Employee,
}

export class RegisterDto {
  //   user
  firstName!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  password!: string;
  userType!: number;
}

export class LoginDto {
  userName!: string;
  password!: string;
}

export interface IAuthModel {
  email: string;
  message: string;
  token: string;
  isAuthenticated: boolean;
  expiresOn: Date;
  errors: string[];
  roles: string[];
}
