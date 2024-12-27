"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { PageTransition } from "@/components/layout/page-transition"

interface PageWrapperProps {
  children: React.ReactNode
  showHeader?: boolean
}

export function PageWrapper({ children, showHeader = true }: PageWrapperProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {showHeader && <Header />}
        <main className="flex-1 overflow-y-auto">
          <PageTransition>
            <div className="container mx-auto py-6">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  )
} 