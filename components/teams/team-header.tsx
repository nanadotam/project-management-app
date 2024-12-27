"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from 'lucide-react'
import { NewTeamDialog } from "./new-team-dialog"

export function TeamHeader() {
  const [isNewTeamDialogOpen, setIsNewTeamDialogOpen] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Teams</h1>
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="Search teams..."
          className="w-64"
        />
        <Button onClick={() => setIsNewTeamDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Team
        </Button>
      </div>
      <NewTeamDialog
        isOpen={isNewTeamDialogOpen}
        onClose={() => setIsNewTeamDialogOpen(false)}
      />
    </div>
  )
}

