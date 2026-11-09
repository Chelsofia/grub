
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "../assets/images/Logo.png";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    queryClient.setQueryData(["currentUser"], null);

    setIsOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Community", path: "/contact" },
  ];

  return (
    <header className="relative bg-[var(--color-background)] px-4 sm:px-6 py-4 sm:py-6">
      <div className="relative flex items-center justify-between max-w-7xl mx-auto min-h-10">

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
         className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#A8B89A] border border-[#A8B89A] text-[#354B35] hover:bg-[#DCE5D5] hover:border-[#DCE5D5] transition"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex flex-1">
          <ul className="flex items-center justify-start gap-4 lg:gap-7 text-[var(--color-text)]">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm lg:text-base font-semibold hover:text-[var(--color-primary)] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Centered logo */}
        <Link
          to="/"
          aria-label="Grub home"
          onClick={closeMobileMenu}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <img
            src={Logo}
            alt="Grub logo"
            className="w-28 sm:w-32 md:w-36 lg:w-40 object-contain"
          />
        </Link>

        {/* User menu */}
        <div className="relative flex-1 flex justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open user menu"
            aria-expanded={isOpen}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A8B89A] border border-[#A8B89A] text-[#354B35] hover:bg-[#DCE5D5] hover:border-[#DCE5D5] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </button>

          {/* User dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-60 max-w-[calc(100vw-2rem)] bg-[#FAF7F0] rounded-xl shadow-xl border border-[#A8B89A] py-2 z-50">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-[#A8B89A]/50">
                    <p className="text-sm font-bold text-[#354B35] truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#555B50] truncate mt-1">
                      {user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[var(--color-background)] hover:text-[var(--color-accent)] transition"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-background)] transition"
                >
                  Sign in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden max-w-7xl mx-auto mt-4 pt-3 border-t border-[#A8B89A]/50">
          <ul className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="block px-3 py-3 rounded-lg text-sm font-semibold text-[var(--color-text)] hover:bg-[#A8B89A]/20 hover:text-[var(--color-primary)] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
