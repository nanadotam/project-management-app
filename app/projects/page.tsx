"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectDetails } from "@/components/projects/project-details"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  
  return (
    <PageWrapper>
      <ProjectHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectList setSelectedProject={setSelectedProject} />
        <ProjectDetails selectedProject={selectedProject} />
      </div>
    </PageWrapper>
  )
}

