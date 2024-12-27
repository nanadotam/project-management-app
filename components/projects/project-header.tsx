"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from 'lucide-react'
import { NewProjectDialog } from "./new-project-dialog"

export function ProjectHeader() {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search projects..."
          className="w-64"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsNewProjectDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <NewProjectDialog
        isOpen={isNewProjectDialogOpen}
        onClose={() => setIsNewProjectDialogOpen(false)}
      />
    </div>
  )
}

