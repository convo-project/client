type TButtonProps = React.ComponentProps<"button"> & {
  variant: "filled" | "ghost" | "circle";
  addStyle: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({ variant, addStyle, children, ...restProps }: TButtonProps) => {
  const baseClasses = "flex justify-center items-center w-full text-center";
  const variantClasses = {
    filled:
      "rounded-[5px] bg-indigo-100 text-indigo-900 font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed hover:opacity-80",
    ghost:
      "rounded-[5px] border border-indigo-200 text-indigo-900 font-semibold disabled:text-gray-400 disabled:border-gray-300",
    circle: "rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed",
  };

  return (
    <button className={`${baseClasses} ${addStyle} ${variant && variantClasses[variant]}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
