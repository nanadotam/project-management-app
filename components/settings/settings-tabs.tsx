"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { NotificationSettings } from "./notification-settings"
import { SecuritySettings } from "./security-settings"
import { useMediaQuery } from "@/hooks/use-media-query"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const tabVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full space-y-6"
    >
      <TabsList className={`
        grid w-full 
        ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'} 
        rounded-lg p-1
      `}>
        <TabsTrigger 
          value="profile"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger 
          value="notifications"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger 
          value="security"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Security
        </TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait" custom={activeTab}>
        <motion.div
          key={activeTab}
          custom={activeTab}
          variants={tabVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          <TabsContent value="profile" className="mt-0">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <SecuritySettings />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}

