import React, { ButtonHTMLAttributes } from "react";

import { cx } from "@/helpers";

export type ButtonProps = {
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  const { border, children, className, disabled, ...rest } = props;

  return (
    <button role="button" disabled={disabled} {...rest}>
      <div
        className={cx(
          "border border-solid border-slate-500 truncate",
          "px-5 py-2 rounded-full",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:bg-slate-300",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
};
