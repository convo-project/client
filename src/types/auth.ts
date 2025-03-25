export type TAuthForm = {
  email: string;
  password: string;
  nickname?: string;
  passwordCheck?: string;
  verifyCode?: string;
  isVerified?: boolean;
};

export type TEmailVerification = {
  email: string;
  verifyCode: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TAuthContext = {
  // user: TUser | null; 추후 구현
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  // logout?: () => Promise<void>; 추후 구현
};
