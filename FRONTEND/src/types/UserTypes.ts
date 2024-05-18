export type UserEntity = {
  _id: string;
  username: string;
  name: string;
  surname: string;
  authentication: {
    password: string;
    sessionToken: string;
    roles: Array<UserRole>;
  };
};

export type User = {
  id: string;
  username: string;
  name: string;
  surname: string;
  roles: Array<UserRole>;
};

export enum UserRole {
  Admin = 0,
  Devops = 1,
  Developer = 2,
}
