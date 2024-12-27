"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GanttChart } from "./charts/gantt-chart"
import { PieChart } from "./charts/pie-chart"
import { TimelineView } from "./charts/timeline-view"
import { CalendarView } from "./charts/calendar-view"
import { CustomizableTable } from "./customizable-table"

export function ProjectDetails({ selectedProject }: { selectedProject: any }) {
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Reset to overview tab when a new project is selected
    setActiveTab("overview")
  }, [selectedProject])

  if (!selectedProject) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Select a project to view its details</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedProject.name}</CardTitle>
        <CardDescription>Comprehensive view of the selected project</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex flex-wrap gap-2 w-full md:flex-nowrap overflow-x-auto">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="gantt" className="flex-1">Gantt</TabsTrigger>
            <TabsTrigger value="pie" className="flex-1">Pie Chart</TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1">Calendar</TabsTrigger>
            <TabsTrigger value="table" className="flex-1">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="space-y-2">
              <p><strong>Status:</strong> {selectedProject.status}</p>
              <p><strong>Due Date:</strong> {selectedProject.dueDate}</p>
              <p><strong>Team Size:</strong> {selectedProject.teamSize}</p>
              <p><strong>Progress:</strong> {selectedProject.progress}%</p>
            </div>
          </TabsContent>
          <TabsContent value="gantt">
            <GanttChart projectId={selectedProject.id} />
          </TabsContent>
          <TabsContent value="pie">
            <PieChart projectId={selectedProject.id} />
          </TabsContent>
          <TabsContent value="timeline">
            <TimelineView projectId={selectedProject.id} />
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarView projectId={selectedProject.id} />
          </TabsContent>
          <TabsContent value="table">
            <CustomizableTable projectId={selectedProject.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

