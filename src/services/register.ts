import axios from "axios";
import { TAuthForm, TEmailVerification } from "../types/auth";

export const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification?email=${email}`,
    );
    return response;
  } catch (error) {
    console.error("API 요청 실패", error);
    throw error;
  }
};

export const confirmVerificationCode = async (data: TEmailVerification) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification/confirm`, data);
    return response;
  } catch (error) {
    console.error("유효한 인증 코드가 아님", error);
    throw error;
  }
};

export const registerUser = async (data: TAuthForm) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, data);
    return response;
  } catch (error) {
    console.error("회원가입 실패", error);
    throw error;
  }
};
