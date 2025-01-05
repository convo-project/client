import { UseFormRegisterReturn } from "react-hook-form";

type TInputProps = React.ComponentProps<"input"> & {
  title?: string;
  name: string;
  addStyle?: string;
  register?: UseFormRegisterReturn;
  children?: React.ReactNode;
};

const Input = ({ title, name, addStyle, register, children, ...restProps }: TInputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {title && (
        <label htmlFor={name} className="text-[16px] font-medium">
          {title}
        </label>
      )}
      <input
        {...register}
        className={`${addStyle} h-[50px] rounded-[10px] px-4 py-3 border border-gray-400 focus:border-indigo-900`}
        {...restProps}>
        {children}
      </input>
    </div>
  );
};

export default Input;
