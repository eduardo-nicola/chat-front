import React from "react";
import { cn } from "@/lib/utils"; // Ajuste conforme sua estrutura de utils

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-300 dark:bg-gray-700 rounded",
        className
      )}
      {...props}
    />
  );
}
