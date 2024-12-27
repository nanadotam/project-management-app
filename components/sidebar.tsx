"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Briefcase, Calendar, Settings, Users, ChevronLeft, ChevronRight, User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/useAuth"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { signOut } = useAuth()

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "64px" },
    mobileExpanded: { x: 0 },
    mobileCollapsed: { x: "-100%" }
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: Users, label: "Teams", href: "/teams" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      <motion.div
        className={cn(
          "bg-background border-r h-screen flex flex-col rounded-r-xl",
          "fixed lg:relative z-50",
          "w-[240px] lg:w-auto"
        )}
        initial={false}
        animate={
          isMobile
            ? isMobileOpen ? "mobileExpanded" : "mobileCollapsed"
            : isCollapsed ? "collapsed" : "expanded"
        }
        variants={sidebarVariants}
      >
        <div className="p-4 flex justify-between items-center">
          {(!isCollapsed || isMobile) && <h1 className="text-xl font-bold">PM App</h1>}
          <button 
            onClick={isMobile ? toggleMobile : toggleSidebar} 
            className="p-2"
          >
            {(isCollapsed && !isMobile) ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && toggleMobile()}
                    className={cn(
                      "flex items-center p-4 hover:bg-accent rounded-lg mx-2",
                      isCollapsed && !isMobile ? "justify-center" : "justify-start",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      (!isCollapsed || isMobile) && "mr-4"
                    )} />
                    {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(
                "w-full",
                isCollapsed && !isMobile ? "justify-center" : "justify-start"
              )}>
                <Avatar className={cn(
                  "h-8 w-8",
                  (!isCollapsed || isMobile) && "mr-2"
                )}>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {(!isCollapsed || isMobile) && <span>John Doe</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Switch Team</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </>
  )
}
