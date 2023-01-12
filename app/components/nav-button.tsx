"use client";

import type { PropsWithChildren } from "react";
import { Link } from "@remix-run/react";

export function NavButton({
  className,
  to: href,
  children,
}: PropsWithChildren<{ className?: string; to: string }>) {
  const segment = "todo";
  const currentPage =
    `/${segment}` === href || (segment === null && href === "/");
  const activeClass = currentPage ? "btn-outline" : "btn-ghost";
  return (
    <Link to={href} className={`btn ${activeClass} ${className}`}>
      {children}
    </Link>
  );
}
