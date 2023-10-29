import cs from "@/utils/cs";
import { ClassValue } from "clsx";
import React, { PropsWithChildren } from "react";

export default function MaxWidthWrapper({
  children,
  className,
}: PropsWithChildren & { className?: ClassValue | ClassValue[] }) {
  return (
    <div className={cs("max-w-7xl", "mx-auto", "w-full", className)}>
      {children}
    </div>
  );
}
