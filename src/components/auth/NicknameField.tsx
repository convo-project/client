import Input from "../common/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";

const EmailField = ({ register, errors }: { register: UseFormRegister<TAuthForm>; errors: FieldErrors<TAuthForm> }) => {
  return (
    <div className="w-full">
      <Input
        type="text"
        name="nickname"
        placeholder="닉네임"
        register={register("nickname", {
          required: "닉네임을 입력해 주세요.",
          maxLength: {
            value: 10,
            message: "닉네임은 최대 10자입니다.",
          },
        })}
        autoComplete="nickname"
      />
      {errors.nickname?.message && <span className="ml-2 text-[14px] text-rose-400">{errors.nickname?.message}</span>}
    </div>
  );
};

export default EmailField;
