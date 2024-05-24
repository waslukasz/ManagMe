export default interface TokenJWT {
  id: string;
  username: string;
  roles: [string];
  iat: number;
}
