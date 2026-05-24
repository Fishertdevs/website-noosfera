import { useState } from "react"
import { Link, useLocation } from "wouter"
import { Menu, X, Brain } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DarkNavProps {
  activeLink?: "home" | "company" | "pricing" | "docs"
}

export function DarkNav({ activeLink }: DarkNavProps) {
  const [, navigate] = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: "/", label: "Inicio", key: "home" },
    { href: "/company", label: "Acerca de", key: "company" },
    { href: "/pricing", label: "Planes", key: "pricing" },
    { href: "/docs", label: "Documentación", key: "docs" },
  ] as const

  return (
    <header className="w-full px-4 py-4 z-50 sticky top-0 bg-white dark:bg-[#08000f] border-b border-gray-100 dark:border-purple-950 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/"
          className="flex items-center gap-1.5 text-xl font-black text-gray-900 dark:text-white tracking-tight"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Brain className="h-5 w-5 text-purple-600" />
          Noosfera
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label, key }) => (
            <Link key={key} href={href}
              className={`text-sm font-medium transition-colors ${
                activeLink === key
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => navigate("/auth/login")}
            className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#7c3aed" }}>
            Iniciar Sesión
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-950 transition-colors"
            aria-label="Abrir menú">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0d0118] border-b border-gray-100 dark:border-purple-950 shadow-lg z-50 transition-colors duration-300">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map(({ href, label, key }) => (
              <Link key={key} href={href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeLink === key
                    ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-purple-950/50"
                }`}>
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-100 dark:border-purple-950 mt-2 pt-3 pb-1 flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => { setIsOpen(false); navigate("/auth/login") }}
                className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#7c3aed" }}>
                Iniciar Sesión
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
