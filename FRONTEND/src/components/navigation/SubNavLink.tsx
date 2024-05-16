import { Link, To } from "react-router-dom";

export default function SubNavLink({ to, label }: { to: To; label: string }) {
  return (
    <>
      <Link className="p-2 hover:bg-red-700 transition-colors" to={to}>
        {label}
      </Link>
    </>
  );
}
