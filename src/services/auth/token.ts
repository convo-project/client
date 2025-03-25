let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const clearAuth = () => {
  accessToken = null;
};
