import Logo from "../../assets/image/Logo.svg";
import Button from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { TAuthForm } from "../../types/auth";
import EmailField from "../../components/auth/EmailField";
import NicknameField from "../../components/auth/NicknameField";
import PasswordField from "../../components/auth/PasswordField";
import PasswordCheckField from "../../components/auth/PasswordCheckField";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TAuthForm>({ mode: "onBlur" });

  const onSubmit = (data: TAuthForm) => {
    const { passwordCheck, ...filteredData } = data;
    console.log("폼 제출 데이터:", filteredData);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[100px] w-full m-auto px-[100px]">
      <img src={Logo} alt="로고" className="w-[250px] h-[100px]" />
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
    </div>
  );
}
