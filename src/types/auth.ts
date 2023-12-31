export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export type JwtResponse = {
  accessToken: string;
};
