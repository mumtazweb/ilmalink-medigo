"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { counsellingEventName } from "../data/exploreLinks";

type CounsellingActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function CounsellingActionButton({
  children,
  className = "",
  onClick,
  ...props
}: CounsellingActionButtonProps) {
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          window.dispatchEvent(new Event(counsellingEventName));
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
}
