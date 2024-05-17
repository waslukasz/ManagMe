import { useContext } from "react";
import { Role, User, UserProfile } from "../types/UserType";
import AuthContext from "../contexts/AuthProvider";

const URL: string = "http://localhost:3000";

export type AuthType = {
  user: UserProfile;
  token: string;
  refreshToken: string;
};

export default class AuthApi {
  DbName: string = "users";
  DbSet: Array<User> = this.GetDbSet();
  authContext = useContext(AuthContext);

  async SignIn(username: string, password: string): Promise<AuthType | null> {
    const user = this.GetByUsername(username);
    if (user == undefined || user.password != password) return null;
    const tokens: { token: string; refreshToken: string } = await getToken();

    const result: AuthType = {
      user: {
        ...user,
      },
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    };

    localStorage.setItem("_auth", JSON.stringify(result));
    return result;
  }

  async SignOut(): Promise<void> {
    localStorage.removeItem("_auth");
  }

  async RefreshToken(refreshToken: string) {
    let auth = await this.GetCurrentAuth();
    const newTokens = await getRefreshedToken(refreshToken);
    auth = {
      ...auth,
      token: newTokens.token,
      refreshToken: newTokens.refreshToken,
    };
    localStorage.setItem("_auth", JSON.stringify(auth));
  }

  async GetCurrentAuth(): Promise<AuthType> {
    return JSON.parse("_auth") as AuthType;
  }

  private GetByUsername(username: string): User | undefined {
    return this.DbSet.find((p) => p.username == username);
  }

  async GetById(id: string): Promise<User> {
    return this.DbSet.find((p) => p.id == id)!;
  }

  async GetAll(): Promise<Array<User>> {
    return this.DbSet;
  }

  private GetDbSet(): Array<User> {
    let users: Array<User> = [];

    let admin: User = {
      id: "abde511c-8888-49ab-bca7-3126da94c8b0",
      name: "John",
      surname: "Kowalski",
      roles: [Role.Admin],
      username: "johnk",
      password: "Admin123",
    };

    let devops: User = {
      id: "a5e12bc0-4b6c-48bb-9a6c-f1c4b7e16b95",
      name: "Paul",
      surname: "Doe",
      roles: [Role.DevOps],
      username: "pauld",
      password: "Admin123",
    };

    let developer: User = {
      id: "ab53e57b-79dc-466b-9083-63208f472c2d",
      name: "Adam",
      surname: "Nowak",
      roles: [Role.Developer],
      username: "adamn",
      password: "Admin123",
    };

    users.push(admin, devops, developer);
    return users;
  }

  private UpdateApi(): void {
    localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
  }
}

async function getToken(): Promise<{ token: string; refreshToken: string }> {
  const response = await fetch(`${URL}/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      exp: "6000",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch token.");
  return await response.json();
}

async function getRefreshedToken(
  refreshToken: string
): Promise<{ token: string; refreshToken: string }> {
  const response = await fetch(`${URL}/refreshtoken`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      exp: "6000",
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  });
  if (!response.ok) throw new Error("Failed to fetch token.");
  return await response.json();
}
