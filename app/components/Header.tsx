"use client";

import { useEffect, useState, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react"; // Using Lucide Icons for cleaner hamburger

interface HeaderProps {
  onBookCallClick?: () => void;
}

function Header({ onBookCallClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const overflow = mobileMenuOpen ? "hidden" : "unset";
    document.body.style.overflow = overflow;
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const getNavLinkClasses = (href: string) => {
    const isActive =
      pathname === href || (href === "#services" && pathname === "/"); // Treat root as active for services too
    const base =
      "relative group transition-all duration-300 cursor-pointer text-base font-medium";
    const activeStyle =
      "text-cyan-400 font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]";
    const inactiveStyle = "text-gray-300 hover:text-white";

    return `${base} ${isActive ? activeStyle : inactiveStyle}`;
  };

  const NavLinkUnderline = ({ href }: { href: string }) => {
    const isActive = pathname === href;
    return (
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full ${
          isActive
            ? "w-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            : "w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        }`}
      />
    );
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05101a]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3"
          : "bg-[#05101a]/80 backdrop-blur-md py-4 border-b border-gray-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-all">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider text-white cursor-pointer relative z-50 flex items-center gap-1"
        >
          <Zap className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
          <span className="ml-1">
            Phy<span className="text-cyan-400">team</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getNavLinkClasses(link.href)}
            >
              {link.label}
              <NavLinkUnderline href={link.href} />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          {onBookCallClick ? (
            <button
              onClick={onBookCallClick}
              className="relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/50 active:scale-95 overflow-hidden border border-cyan-400/80"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Book a Call</span>
            </button>
          ) : (
            <Link
              href="/contact"
              className="relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/50 active:scale-95 overflow-hidden border border-cyan-400/80 inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Get Started</span>
            </Link>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center cursor-pointer group rounded-full bg-white/5 hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-cyan-400" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto z-40"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-[#0f172a] border-l border-cyan-400/50 shadow-2xl shadow-cyan-500/30 transform transition-transform duration-500 ease-in-out md:hidden z-50 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#0f172a", opacity: 1 }}
        >
            {/* Humberger menu's background color */}
          <nav className="flex flex-col pt-24 px-6 space-y-3 relative bg-[#13243a]">  
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`relative group py-4 px-4 rounded-xl transition-all duration-300 cursor-pointer text-lg ${
                  pathname === link.href
                    ? "bg-cyan-500/20 text-white font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400/50"
                    : "text-gray-200 hover:bg-white/10 hover:text-white border border-transparent hover:border-gray-600/30"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {pathname === link.href && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-xl shadow-lg shadow-cyan-400/50" />
                )}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-10 mt-8 border-t border-cyan-400/30">
              {onBookCallClick ? (
                <button
                  onClick={() => {
                    onBookCallClick();
                    closeMobileMenu();
                  }}
                  className="w-full relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-[1.02] active:scale-95 border-2 border-cyan-400/60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>📞</span> Book a Call
                  </span>
                </button>
              ) : (
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="w-full block text-center relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-[1.02] active:scale-95 border-2 border-cyan-400/60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>🚀</span> Get Started
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
