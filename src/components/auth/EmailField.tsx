import Input from "../common/Input";
import { EMAIL_REGEXP } from "../../constants/regexp";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import Button from "../common/Button";

const EmailField = ({
  register,
  errors,
  isRegister = false,
}: {
  register: UseFormRegister<TAuthForm>;
  errors: FieldErrors<TAuthForm>;
  isRegister?: Boolean;
}) => {
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
          <Button variant="filled" type="button" addStyle="w-[100px]">
            인증하기
          </Button>
        )}
      </div>
    </>
  );
};

export default EmailField;
