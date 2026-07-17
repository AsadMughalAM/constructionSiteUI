import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('meridian-theme', dark ? 'dark' : 'light')
    } catch {
      /* private mode: theme just won't persist */
    }
  }, [dark])

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setDark((v) => !v)}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
