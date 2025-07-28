import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"
import { useState, useRef, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themes = [
    { name: 'Light', value: 'light', icon: Sun },
    { name: 'Dark', value: 'dark', icon: Moon },
    { name: 'System', value: 'system', icon: Monitor },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    setIsOpen(false)
    console.log('Theme changed to:', newTheme) // Debug log
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setIsOpen(!isOpen)
          console.log('Theme toggle clicked, isOpen:', !isOpen) // Debug log
        }}
        className="relative h-9 w-9 rounded-lg border-input/50 bg-background/50 hover:bg-accent/50 hover:border-input transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="relative w-4 h-4">
          <Sun className="h-4 w-4 absolute inset-0 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="h-4 w-4 absolute inset-0 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border bg-popover/95 backdrop-blur-sm shadow-lg z-50 animate-in slide-in-from-top-2 fade-in-0 duration-200">
          <div className="p-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isActive = theme === themeOption.value
              
              return (
                <button
                  key={themeOption.value}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleThemeChange(themeOption.value as 'light' | 'dark' | 'system')
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{themeOption.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
