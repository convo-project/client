import axios from "axios";
import { TEmailVerification } from "../types/auth";

export const sendVerificationCode = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification?email=${email}`,
    );
    return response;
  } catch (error) {
    alert("인증 코드 전송을 실패했습니다.");
  }
};

export const confirmVerificationCode = async (data: TEmailVerification) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification/confirm`, data);
    return response;
  } catch (error) {
    alert("유효한 인증 코드가 아닙니다.");
  }
};
