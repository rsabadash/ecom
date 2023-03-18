export type AuthContextValue = {
  signIn: (data: SignInDataExtended) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SignInDataExtended = SignInData & {
  isPersistUser: boolean;
};

export type SignInResponse = Tokens;

export type RefreshTokenData = Pick<Tokens, 'refreshToken'>;

export type RefreshTokenResponse = Tokens;
