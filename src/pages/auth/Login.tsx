import Logo from "../../assets/image/Logo.svg";
import kakao from "../../assets/icon/KaKaoIcon.svg";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import EmailField from "../../components/auth/EmailField";
import PasswordField from "../../components/auth/PasswordField";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAuthForm>({ mode: "onBlur" });

  const methods = useForm<TAuthForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: TAuthForm) => {
    try {
      await login(data.email, data.password);
      navigate("/main");
    } catch (error) {
      alert("올바르지 않은 이메일 또는 비밀번호입니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[80px] w-full m-auto px-[100px]">
      <img src={Logo} alt="로고" className="w-[250px] h-[100px]" />
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center justify-center flex-1 w-full gap-10"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-5">
            <EmailField register={register} errors={errors} />
            <PasswordField register={register} errors={errors} />
          </div>

          <div className="flex flex-col items-center w-full gap-10">
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
            <Button
              type="button"
              variant="filled"
              addStyle="h-[60px] text-[18px] !bg-[#FFEA00] gap-5 !text-neutral-800">
              <img src={kakao} alt="카카오 로고" />
              <span>카카오톡</span>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
