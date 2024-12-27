"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Bell, Mail, Calendar, Projector } from "lucide-react"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)
  const [projectUpdates, setProjectUpdates] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated notification settings to your backend
    console.log("Updated notification settings:", {
      emailNotifications,
      pushNotifications,
      taskReminders,
      projectUpdates,
    })
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit} 
      className="space-y-6 p-6 rounded-lg bg-card shadow-sm"
    >
      <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
      
      {[
        { id: "email-notifications", label: "Email Notifications", state: emailNotifications, setState: setEmailNotifications, icon: <Mail className="h-5 w-5" /> },
        { id: "push-notifications", label: "Push Notifications", state: pushNotifications, setState: setPushNotifications, icon: <Bell className="h-5 w-5" /> },
        { id: "task-reminders", label: "Task Reminders", state: taskReminders, setState: setTaskReminders, icon: <Calendar className="h-5 w-5" /> },
        { id: "project-updates", label: "Project Updates", state: projectUpdates, setState: setProjectUpdates, icon: <Projector className="h-5 w-5" /> },
      ].map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 rounded-md hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <Label htmlFor={item.id} className="cursor-pointer">
              {item.label}
            </Label>
          </div>
          <Switch
            id={item.id}
            checked={item.state}
            onCheckedChange={item.setState}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
      ))}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          className="w-full"
        >
          Save Changes
        </Button>
      </motion.div>
    </motion.form>
  )
}

