import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { getPageNumbers } from "@/utils/getPageNumbers";

export default function PaginationButtons({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  const pages = getPageNumbers(page, totalPages, 3);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(page - 1, 1))}
            // isDisabled={page === 1}
            className="hover:cursor-pointer"
          />
        </PaginationItem>

        {pages.map((p, i) =>
          typeof p === "number" ? (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setPage(p)}
                className={cn(
                  "hover:cursor-pointer",
                  buttonVariants({
                    variant: p === page ? "default" : "outline",
                    size: "icon",
                  })
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <span key={i} className="px-2 select-none">
              {p}
            </span>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            // disabled={page === totalPages}
                        className="hover:cursor-pointer"

          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
