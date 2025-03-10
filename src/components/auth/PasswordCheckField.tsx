import Input from "../common/Input";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TAuthForm } from "../../types/auth";

const PasswordField = ({
  register,
  errors,
  watch,
}: {
  register: UseFormRegister<TAuthForm>;
  errors: FieldErrors<TAuthForm>;
  watch: UseFormWatch<TAuthForm>;
}) => {
  const [isShowPasswordCheck, setIsShowPasswordCheck] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <Input
          type={isShowPasswordCheck ? "text" : "password"}
          name="passwordCheck"
          placeholder="비밀번호 확인"
          register={register("passwordCheck", {
            required: "비밀번호 확인은 필수입니다.",
            validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setIsShowPasswordCheck((prev) => !prev)}
          className="absolute text-[20px] text-gray-500 transform -translate-y-1/2 right-4 top-1/2">
          {isShowPasswordCheck ? <IoMdEyeOff /> : <IoMdEye />}
        </button>
      </div>
      {errors.passwordCheck?.message && (
        <span className="ml-2 text-[14px] -mt-5 text-rose-400">{errors.passwordCheck?.message}</span>
      )}
    </>
  );
};

export default PasswordField;
