'use client'

import { dashboardMenuOpts } from "@/constants/dashboard"
import Image from "next/image"
import {
  Cable,
  Contact,
  Globe,
  LayoutDashboard,
  Mail,
  MessageCircleMore,
  Receipt,
  Settings,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const iconMap: Record<string, React.ComponentType> = {
    LayoutDashboard,
    MessageCircleMore,
    Receipt,
    Cable,
    Settings,
    Contact,
    Mail,
    Globe,
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setOpen(!mobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', !open)
    document.body.classList.toggle('sidebar-expanded', open)
  }, [open])

  const toggleSidebar = () => {
    setOpen(prev => !prev)
  }

  return (
    <>
      <div 
        className={`fixed top-0 left-0 h-screen ${
          open ? "w-72" : "w-20"
        } bg-orange dark:bg-black dark:text-white p-5 pt-8 transition-all duration-300 ease-in-out z-50 ${
          isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <div className="flex gap-x-4 w-fit p-1 items-center cursor-pointer" onClick={toggleSidebar}>
          <Image
            src="/images/corinna-logo.png"
            alt="Corinna AI logo"
            width={40}
            height={40}
            className={`transition-transform duration-500 bg-white rounded-lg p-1 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-extrabold translate-x-4 text-2xl transition-all duration-500 ease-in-out ${
              !open ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            Corinna AI
          </h1>
        </div>
        <div className="mt-10">
          <Tabs defaultValue="dashboard">
            <TabsList className="flex flex-col justify-center items-center h-fit bg-transparent text-white rounded-xl gap-5">
              {dashboardMenuOpts.map(({ icon, name, value }) => {
                const IconComponent = iconMap[icon]
                return (
                  <TabsTrigger
                    key={name}
                    onClick={() => {
                      router.push(`/${value}`)
                      if (isMobile) setOpen(false)
                    }}
                    value={value}
                    className="gap-4 flex justify-start items-center w-full rounded-xl hover:shadow-lg hover:bg-white hover:text-black font-bold text-xl"
                  >
                    <span>
                      <IconComponent />
                    </span>
                    <span className={`transition-all duration-100 ${
                      open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}>
                      {name}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      {isMobile && !open && (
        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-4 z-50 p-2 bg-orange text-white rounded-md"
          aria-label="Open sidebar"
        >
          <Image
            src="/images/corinna-logo.png"
            alt="Corinna AI logo"
            width={12}
            height={12}
          />
        </button>
      )}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}