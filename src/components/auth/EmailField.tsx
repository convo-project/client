import Input from "../common/Input";
import { EMAIL_REGEXP } from "../../constants/regexp";
import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import Button from "../common/Button";
import { useReducer, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { confirmVerificationCode, sendVerificationCode } from "../../services/register";
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

  const handleSendVerificationCode = async () => {
    const email = getValues("email");
    try {
      const response = await sendVerificationCode(email);

      if (response?.status === 200) {
        dispatch({ type: "SET_SUCCESS", payload: "인증 코드가 성공적으로 발송되었습니다." });
        start();
        setIsVerificationRequested(true);
      } else {
        dispatch({ type: "SET_ERROR", payload: "인증 코드를 보내는 데 실패했습니다." });
        setIsVerificationRequested(false);
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "인증 코드를 보내는 중에 오류가 발생했습니다." });
    }
  };

  const handleConfirmVerificationCode = async () => {
    const { email, verifyCode } = getValues();

    if (!email || !verifyCode) {
      dispatch({ type: "SET_ERROR", payload: "이메일 또는 인증 코드가 입력되지 않았습니다." });
      return;
    }

    try {
      const response = await confirmVerificationCode({ email, verifyCode });
      if (response?.status === 200) {
        dispatch({ type: "SET_SUCCESS", payload: "인증이 성공적으로 완료되었습니다." });
      } else {
        dispatch({ type: "SET_ERROR", payload: "인증 코드가 유효하지 않습니다." });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "인증 확인 중 오류가 발생했습니다." });
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
            <Button variant="filled" type="button" addStyle="w-[100px]" onClick={handleSendVerificationCode}>
              {isVerificationRequested ? "재전송" : "인증 요청"}
            </Button>
          )}
        </div>
        {(errors.email?.message || verificationError) && (
          <span className="ml-2 text-[14px] text-rose-400">
            {errors.email?.message || verificationError || verificationSuccess}
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
            <Button variant="filled" type="button" addStyle="w-[100px]" onClick={handleConfirmVerificationCode}>
              확인
            </Button>
          </div>
          <div className="flex justify-between text-[12px]">
            <p className="ml-2 text-gray-400 ">이메일이 수신되지 않았다면 스팸 메일함을 확인해 주세요.</p>
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
