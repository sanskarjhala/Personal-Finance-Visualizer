import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black dark:bg-zinc-900 border-b px-6 py-4 shadow-sm sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}><div className="text-2xl font-bold text-indigo-600">💸 Finance Tracker</div></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 items-center">
            <Link to={"/"}>
                <Button variant="ghost" className="text-xl">Dashboard</Button>
            </Link>

            <Link to={"/all-transactions"}>
                <Button variant="ghost" className="text-xl">Transactions</Button>
            </Link>

            <Link to={"/budget"}>
                <Button variant="ghost" className="text-xl">Budget</Button>
            </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden mt-2 flex flex-col gap-2 px-4">
           <Link to={"/"}>
            <Button variant="ghost" className="text-xl">Dashboard</Button>
          </Link>

          <Link to={"/all-transactions"}>
            <Button variant="ghost" className="text-xl">Transactions</Button>
          </Link>

          <Link to={"/budget"}>
                <Button variant="ghost" className="text-xl">Budget</Button>
            </Link>
        </nav>
      )}
    </header>
  );
}
