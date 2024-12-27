"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface NewTeamDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTeamDialog({ isOpen, onClose }: NewTeamDialogProps) {
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new team data to your backend
    console.log("New team:", { teamName, teamDescription })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Enter the details for your new team. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team-name" className="text-right">
                Name
              </Label>
              <Input
                id="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="team-description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Team</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

