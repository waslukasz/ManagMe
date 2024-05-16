import { UserProfile } from "./UserType";

export type Auth = {
  user: UserProfile;
  token: string;
  refreshToken: string;
};

export default Auth;
