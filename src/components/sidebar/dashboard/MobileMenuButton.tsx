'use client'

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function MobileMenuButton() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-open')
  }

  if (!isMobile) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 left-4 z-50 md:hidden"
      onClick={toggleSidebar}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
}