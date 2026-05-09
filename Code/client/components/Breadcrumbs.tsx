import Link from "next/link";

export const Breadcrumbs = ({ currentPage }: { currentPage: string }) => (
  <nav aria-label="Breadcrumb" className="mb-3">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <li>
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Home
        </Link>
      </li>
      <li aria-hidden="true" className="text-border">
        /
      </li>
      <li className="font-medium text-foreground">{currentPage}</li>
    </ol>
  </nav>
);
