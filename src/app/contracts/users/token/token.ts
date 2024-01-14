export class Token {
  accessToken: string;
  expiration: Date;
}

export class TokenResponse {
  token: Token
}
