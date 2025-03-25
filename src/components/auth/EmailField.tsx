import Input from "../common/Input";
import { EMAIL_REGEXP } from "../../constants/regexp";
import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import Button from "../common/Button";
import { useEffect, useReducer, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { sendVerificationCode } from "../../services/auth/register";
import { initialState, verificationReducer } from "../../utils/verificationReducer";

const EmailField = ({
  register,
  errors,
  isRegister = false,
}: {
  register: UseFormRegister<TAuthForm>;
  errors: FieldErrors<TAuthForm>;
  isRegister?: Boolean;
}) => {
  const [isVerificationRequested, setIsVerificationRequested] = useState<boolean>(false);
  const [state, dispatch] = useReducer(verificationReducer, initialState);
  const { minutes, remainingSeconds, isFinished, start } = useTimer(10 * 60);
  const { getValues } = useFormContext<TAuthForm>();

  const { verificationError, verificationSuccess } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setIsVerificationRequested(false);
    }
  }, [isFinished]);

  const handleSendVerificationCode = async () => {
    const email = getValues("email");
    setIsLoading(true);
    try {
      const response = await sendVerificationCode(email);

      if (response?.status === 200) {
        dispatch({ type: "SET_SUCCESS", payload: "인증 코드가 성공적으로 발송되었습니다." });
        start();
        setIsVerificationRequested(true);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data?.message || "이미 존재하는 이메일입니다.";
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        setIsVerificationRequested(false);
      } else {
        dispatch({ type: "SET_ERROR", payload: "인증 코드를 보내는 중에 오류가 발생했습니다." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`w-full ${isRegister && "flex flex-col w-full"}`}>
        <div className="flex gap-10">
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            register={register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: EMAIL_REGEXP,
                message: "유효한 이메일 형식으로 입력해 주세요.",
              },
            })}
            autoComplete="username"
          />
          {isRegister && (
            <Button
              variant="filled"
              type="button"
              addStyle="w-[100px]"
              onClick={handleSendVerificationCode}
              disabled={!EMAIL_REGEXP.test(getValues("email")) || (isVerificationRequested && !isFinished)}>
              {isVerificationRequested ? "재전송" : "인증 요청"}
            </Button>
          )}
        </div>
        {(errors.email?.message || verificationError || isLoading) && (
          <span className={`ml-2 text-[14px]  ${isLoading ? "text-indigo-900" : "text-rose-400"}`}>
            {errors.email?.message || verificationError || verificationSuccess || (isLoading && "인증코드 전송 중...")}
          </span>
        )}
      </div>
      {isVerificationRequested && (
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex gap-10">
            <Input
              type="text"
              name="verifyCode"
              placeholder="인증 코드를 입력해 주세요."
              register={register("verifyCode", {
                required: true,
              })}
            />
          </div>
          <div className="flex justify-between text-[12px]">
            <p className="ml-2 text-gray-400">이메일이 수신되지 않았다면 스팸 메일함을 확인해 주세요.</p>
            <p className="font-medium text-indigo-900">
              {isFinished
                ? "00:00"
                : `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailField;
