import axios from "axios";
import { TAuthForm, TEmailVerification } from "../../types/auth";

export const sendVerificationCode = async (email: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification?email=${email}`);
  return response;
};

export const confirmVerificationCode = async (data: TEmailVerification) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/email-verification/confirm`, data);
  return response;
};

export const registerUser = async (data: TAuthForm) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, data);
  return response;
};
