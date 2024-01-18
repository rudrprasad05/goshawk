"use server";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";

type PaginationProps = {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
};

export const Pagination = (props: PaginationProps) => {
  const { page = 1, totalPages, hasNextPage } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pages = getPagesToShow();

  return (
    <div className="flex mt-auto items-center justify-center space-x-6 py-10">
      <Card
        className={cn(
          "px-3 py-2 ",
          currentPage == 1 ? "text-sm cursor-not-allowed opacity-50" : ""
        )}
      >
        <Link
          className={clsx(
            "text-sm",
            currentPage == 1 ? "cursor-not-allowed opacity-50" : ""
          )}
          href={
            currentPage != 1
              ? `?page=${currentPage - 1}`
              : `?page=${currentPage}`
          }
        >
          Previous
        </Link>
      </Card>

      <nav
        aria-label="Pagination"
        className="relative z-0 inline-flex -space-x-px rounded-md"
      >
        {pages.map((p, i) => (
          <Link
            key={p}
            className={cn(
              "relative inline-flex items-center border px-4 py-2 text-sm font-medium hover:bg-muted",
              p === currentPage ? "pointer-events-none bg-muted" : "",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : ""
            )}
            href={`?page=${p}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Card
        className={cn(
          "px-3 py-2 text-sm",
          !hasNextPage ? "cursor-not-allowed opacity-50" : ""
        )}
      >
        <Link
          className={clsx(
            "text-sm",
            !hasNextPage ? "cursor-not-allowed opacity-50" : ""
          )}
          href={
            hasNextPage ? `?page=${currentPage + 1}` : `?page=${currentPage}`
          }
        >
          Next
        </Link>
      </Card>
    </div>
  );
};
