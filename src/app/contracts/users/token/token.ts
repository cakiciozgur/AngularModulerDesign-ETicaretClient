export class Token {
  accessToken: string;
  expiration: Date;
  refreshToken: string;
}

export class TokenResponse {
  token: Token
}
