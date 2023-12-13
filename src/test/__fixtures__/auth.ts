import { JwtResponse, LoginInput, SignupInput } from '../../types/auth';
import { UserType } from '../../types/users';

export const passingUser: LoginInput = {
  email: 'successfull@login.com',
  password: 'dolphins123',
};

export const failingUser: LoginInput = {
  email: 'failed@login.com',
  password: 'dolphins123',
};

export const jwtFixture: JwtResponse = {
  accessToken: 'test-token',
};

export const adminFixture: UserType = {
  _id: '6570bbfd61ff0a15b6ac9142',
  role: 'ADMIN',
  firstName: 'Egor',
  lastName: 'Bulgakov',
  email: 'pleasedont@egorushque.com',
  image:
    'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702385599/referencelib-avatars/ntvplplbybrearru9ag4.png',
  borrowedBooks: [],
};

export const newUserFixture: SignupInput = {
  firstName: 'Egor',
  lastName: 'Bulgakov',
  email: 'egor@egorushque.com',
  image:
    'http://res.cloudinary.com/dzq4iaveg/image/upload/v1702385599/referencelib-avatars/ntvplplbybrearru9ag4.png',
  password: 'dolphins123',
};
