import Input from "../common/Input";
import { EMAIL_REGEXP } from "../../constants/regexp";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import Button from "../common/Button";
import { useState } from "react";
import useTimer from "../../hooks/useTimer";

const EmailField = ({
  register,
  errors,
  isRegister = false,
}: {
  register: UseFormRegister<TAuthForm>;
  errors: FieldErrors<TAuthForm>;
  isRegister?: Boolean;
}) => {
  const [click, setClick] = useState<boolean>(false); // 수정할 예정
  const { minutes, remainingSeconds, isFinished, start } = useTimer(30 * 60);

  return (
    <>
      <div className={`w-full ${isRegister && "flex gap-10"}`}>
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
        />
        {errors.email?.message && <span className="ml-2 text-[14px] text-rose-400">{errors.email?.message}</span>}
        {isRegister && (
          <Button
            variant="filled"
            type="button"
            addStyle="w-[100px]"
            onClick={() => {
              setClick(true);
              start();
            }}>
            {"인증 요청"}
          </Button>
        )}
      </div>
      {click && (
        <div className="flex flex-col gap-1 mb-5">
          <Input
            type="text"
            name="emailVerification"
            placeholder="인증 코드를 입력해 주세요."
            register={register("emailVerification", {
              required: true,
            })}
          />
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
