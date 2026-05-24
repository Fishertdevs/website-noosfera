import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="w-[68px] h-8" />

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Cambiar tema"
      className="relative flex items-center h-8 w-[68px] rounded-full p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      style={{
        backgroundColor: isDark ? "#3b0764" : "#f3f4f6",
        border: isDark ? "1px solid #6d28d9" : "1px solid #e5e7eb",
      }}>
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 shadow-sm"
        style={{
          transform: isDark ? "translateX(36px)" : "translateX(0px)",
          backgroundColor: isDark ? "#7c3aed" : "#ffffff",
        }}>
        {isDark
          ? <Moon className="h-3.5 w-3.5 text-purple-200" />
          : <Sun className="h-3.5 w-3.5 text-amber-500" />}
      </span>
    </button>
  )
}
