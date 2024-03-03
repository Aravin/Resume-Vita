import Link from "next/link";

export const Breadcrumbs = ({ currentPage }: { currentPage: string }) => (
  <div className="text-sm breadcrumbs">
    <ul>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>{currentPage}</li>
    </ul>
  </div>
);
