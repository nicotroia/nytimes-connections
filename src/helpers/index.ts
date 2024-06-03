import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = (...val: ClassValue[]) => twMerge(clsx(...val));
