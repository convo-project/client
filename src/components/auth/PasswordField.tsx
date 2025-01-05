import Input from "../common/Input";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { PASSWORD_REGEXP } from "../../constants/regexp";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TAuthForm } from "../../types/auth";

const PasswordField = ({
  register,
  errors,
  isRegister = false,
}: {
  register: UseFormRegister<TAuthForm>;
  errors: FieldErrors<TAuthForm>;
  isRegister?: Boolean;
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <Input
          type={isShowPassword ? "text" : "password"}
          name="password"
          placeholder="비밀번호"
          register={register("password", {
            required: "비밀번호를 입력해 주세요.",
            pattern: isRegister && {
              value: PASSWORD_REGEXP,
              message: "영어, 숫자, 특수문자를 조합하여 8자리 이상 입력해주세요.",
            },
          })}
        />
        <button
          type="button"
          onClick={() => setIsShowPassword((prev) => !prev)}
          className="absolute text-[20px] text-gray-500 transform -translate-y-1/2 right-4 top-1/2">
          {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
        </button>
      </div>
      {errors.password?.message && (
        <span className="ml-2 text-[14px] -mt-5 text-rose-400">{errors.password?.message}</span>
      )}
    </>
  );
};

export default PasswordField;
