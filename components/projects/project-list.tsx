"use client"

import { useState } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { Badge } from "@/components/ui/badge"

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    dueDate: "2024-03-30",
    progress: 65
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Planning",
    dueDate: "2024-04-15",
    progress: 25
  },
  {
    id: 3,
    name: "Database Migration",
    status: "On Hold",
    dueDate: "2024-03-25",
    progress: 40
  }
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500/10 text-green-500"
    case "in progress":
      return "bg-blue-500/10 text-blue-500"
    case "on hold":
      return "bg-yellow-500/10 text-yellow-500"
    case "planning":
      return "bg-purple-500/10 text-purple-500"
    default:
      return "bg-gray-500/10 text-gray-500"
  }
}

export function ProjectList({ setSelectedProject }: { setSelectedProject: (project: any) => void }) {
  const [projects, setProjects] = useState(initialProjects)

  const handleDragEnd = (
    projectId: number,
    info: PanInfo
  ) => {
    const swipeThreshold = 50
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        console.log('Archive project:', projectId)
      } else {
        console.log('Delete project:', projectId)
      }
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => handleDragEnd(project.id, info)}
          >
            <InteractiveCard
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Due: {project.dueDate}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

