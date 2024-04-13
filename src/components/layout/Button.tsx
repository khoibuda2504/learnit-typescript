import React from "react";
const mappedClass = {
  primary: "px-3 bg-[#56cc9d] border-[#56cc9d] hover:bg-[#3ac18c]",
  secondary: "px-1 bg-[#6cc3d5] hover:bg-[#4eb7cd] sm:text-sm sm:leading-6",
  red: "px-2 bg-red-500 hover:bg-red-600 sm:text-sm sm:leading-6 flex items-center",
};

type VariantType = "primary" | "secondary" | "red";
type Props = {
  variant: VariantType;
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
};
const Button = ({
  children,
  variant,
  className = "",
  type = "button",
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      className={`text-white py-1 rounded-md ${mappedClass[variant]} ${className} ${disabled ? 'cursor-not-allowed' : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
