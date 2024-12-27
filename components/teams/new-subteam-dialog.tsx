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

interface NewSubteamDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (subteamName: string) => void
}

export function NewSubteamDialog({ isOpen, onClose, onSubmit }: NewSubteamDialogProps) {
  const [subteamName, setSubteamName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(subteamName)
    setSubteamName("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Sub-team</DialogTitle>
          <DialogDescription>
            Enter the name for your new sub-team. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subteam-name" className="text-right">
                Name
              </Label>
              <Input
                id="subteam-name"
                value={subteamName}
                onChange={(e) => setSubteamName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Sub-team</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

