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

export class User {
  id: string;
  username: string;
  name: string;
  surname: string;
  fullname: string;
  roles: Array<string>;

  constructor(entity?: UserEntity) {
    if (entity) {
      this.id = entity._id;
      this.username = entity.username;
      this.name = entity.name;
      this.surname = entity.surname;
      this.fullname = `${entity.name} ${entity.surname}`;
      this.roles = entity.authentication.roles.map((role) => role.toString());
    } else {
      this.id = "";
      this.username = "";
      this.name = "";
      this.surname = "";
      this.fullname = "";
      this.roles = [];
    }
  }
}

export class UserDtoLogin {
  username: string;
  password: string;

  constructor() {
    this.username = "";
    this.password = "";
  }
}

export enum UserRole {
  Admin = 0,
  Devops = 1,
  Developer = 2,
}
