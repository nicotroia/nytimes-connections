import React from "react";

import { cx } from "@/helpers";

export type CardProps = {
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export const Card: React.FC<CardProps> = (props) => {
  const { selected, disabled, onClick, className, children } = props;

  return (
    <button onClick={onClick} className={""} disabled={disabled}>
      <div
        className={cx(
          "flex items-center justify-center w-full border border-solid border-slate-300 transition-colors",
          selected && "border-slate-300 bg-slate-300",
          disabled && "opacity-50",
          "p-5 rounded-lg",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
};
