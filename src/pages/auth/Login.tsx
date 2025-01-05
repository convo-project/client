import Logo from "../../assets/image/Logo.svg";
import kakao from "../../assets/icon/KaKaoIcon.svg";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TLoginForm } from "../../types/auth";
import { EMAIL_REGEXP } from "../../constants/regexp";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({ mode: "onBlur" });

  const onSubmit = (data: TLoginForm) => {
    console.log("폼 제출 데이터:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full m-auto px-[100px]">
      <img src={Logo} alt="로고" className="w-[250px] h-[100px]" />

      <form
        className="flex flex-col items-center justify-center flex-1 w-full gap-10"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-5">
          <div className="w-full">
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              register={register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: EMAIL_REGEXP,
                  message: "유효한 이메일 형식을 입력해 주세요.",
                },
              })}
            />
            {errors.email?.message && <span className="ml-1 text-[14px] text-rose-400">{errors.email?.message}</span>}
          </div>
          <div className="relative w-full">
            <Input
              type={isShowPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호"
              register={register("password", {
                required: "비밀번호를 입력해 주세요.",
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
            <span className="ml-1 text-[14px] -mt-5 text-rose-400">{errors.password?.message}</span>
          )}
        </div>

        <div className="flex flex-col items-center w-full gap-5">
          <Button type="submit" variant="filled" addStyle="h-[60px] text-[18px]" disabled={!isValid}>
            <span>로그인하기</span>
          </Button>
          <div className="flex items-center gap-5">
            <p>아직 회원이 아니신가요?</p>
            <Link to="/register" className="font-semibold text-indigo-900 underline">
              회원가입하기
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full gap-10">
          <div className="flex items-center justify-center w-full gap-10">
            <hr className="w-full h-px bg-neutral-400" />
            <span className="text-neutral-400 whitespace-nowrap">또는</span>
            <hr className="w-full h-px bg-neutral-400" />
          </div>
          <Button type="button" variant="filled" addStyle="h-[60px] text-[18px] !bg-[#FFEA00] gap-5 !text-neutral-800">
            <img src={kakao} alt="카카오 로고" />
            <span>카카오톡</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
