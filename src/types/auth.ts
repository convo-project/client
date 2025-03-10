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
