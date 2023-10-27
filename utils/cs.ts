import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cs(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}