import { useEffect, useState } from "react"
import { useTheme } from "@/hooks/useTheme"

export function useThemeMode() {
  const { theme, setTheme } = useTheme()
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : (theme as "light" | "dark")

  return {
    mode: currentTheme, // always 'light' | 'dark'
    setMode: setTheme,  // can call setMode("light" | "dark" | "system")
  }
}
