import Logo from "../../assets/image/Logo.svg";
import Button from "../../components/common/Button";
import { FormProvider, useForm } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import EmailField from "../../components/auth/EmailField";
import NicknameField from "../../components/auth/NicknameField";
import PasswordField from "../../components/auth/PasswordField";
import PasswordCheckField from "../../components/auth/PasswordCheckField";
import { confirmVerificationCode, registerUser } from "../../services/register";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const methods = useForm<TAuthForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      verifyCode: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data: TAuthForm) => {
    const { email, passwordCheck, verifyCode, nickname, password } = data;

    if (verifyCode) {
      try {
        const confirmResponse = await confirmVerificationCode({ email, verifyCode });

        if (confirmResponse?.status === 200) {
          const registerData = {
            email,
            password,
            passwordCheck,
            nickname,
            isVerified: true,
          };

          const registerResponse = await registerUser(registerData);
          if (registerResponse?.status === 200 || registerResponse?.status === 201) {
            alert("회원가입이 완료되었습니다.");
            navigate("/");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        } else {
          alert("인증 코드가 유효하지 않습니다.");
        }
      } catch (err) {
        alert("인증 확인 중 오류가 발생했습니다.");
      }
    } else {
      alert("인증 코드가 필요합니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[80px] w-full m-auto px-[100px]">
      <img src={Logo} alt="로고" className="w-[250px] h-[100px]" />
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center justify-center flex-1 w-full gap-20"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-5">
            <EmailField register={register} errors={errors} isRegister />
            <NicknameField register={register} errors={errors} />
            <PasswordField register={register} errors={errors} isRegister />
            <PasswordCheckField register={register} errors={errors} watch={watch} />
          </div>

          <Button type="submit" variant="filled" addStyle="h-[60px] text-[18px]" disabled={!isValid}>
            <span>회원가입</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
