import axios from "axios";
import { getAccessToken, setAccessToken, clearAuth } from "./token";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // HttpOnly 쿠키 포함
});

// ✅ 요청 인터셉터 - Access Token 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ 응답 인터셉터 - Access Token 만료 시 Refresh 요청
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1️⃣ Access Token이 만료되어 401 에러가 발생한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get<{ accessToken: string }>(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/reissue`,
          { withCredentials: true },
        );

        // 새로운 Access Token을 저장
        setAccessToken(data.accessToken);

        // 원래 요청에 새로운 Access Token을 넣어서 재요청
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
