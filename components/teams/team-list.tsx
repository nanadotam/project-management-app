"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PlusCircle, MoreHorizontal, Edit, Trash, UserPlus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewSubteamDialog } from "./new-subteam-dialog"

// Mock data for teams
const initialTeams = [
  {
    id: 1,
    name: "Design Team",
    description: "Responsible for UI/UX design",
    members: [
      { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    subTeams: [
      { id: 1, name: "UI Team" },
      { id: 2, name: "UX Team" },
    ],
  },
  {
    id: 2,
    name: "Development Team",
    description: "Responsible for software development",
    members: [
      { id: 4, name: "David Lee", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Eva Garcia", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 6, name: "Frank Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    subTeams: [
      { id: 3, name: "Frontend Team" },
      { id: 4, name: "Backend Team" },
    ],
  },
]

export function TeamList() {
  const [teams, setTeams] = useState(initialTeams)
  const [isNewSubteamDialogOpen, setIsNewSubteamDialogOpen] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)

  const deleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id))
  }

  const openNewSubteamDialog = (teamId: number) => {
    setSelectedTeamId(teamId)
    setIsNewSubteamDialogOpen(true)
  }

  const addSubteam = (teamId: number, subteamName: string) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          subTeams: [...team.subTeams, { id: Date.now(), name: subteamName }]
        }
      }
      return team
    }))
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <Card key={team.id} className="rounded-xl">
          <CardHeader>
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>{team.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Members:</h4>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member) => (
                    <Avatar key={member.id} className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Sub-teams:</h4>
                <ul className="space-y-1">
                  {team.subTeams.map((subTeam) => (
                    <li key={subTeam.id} className="flex items-center justify-between">
                      <span>{subTeam.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => openNewSubteamDialog(team.id)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Sub-team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <NewSubteamDialog
        isOpen={isNewSubteamDialogOpen}
        onClose={() => setIsNewSubteamDialogOpen(false)}
        onSubmit={(subteamName) => {
          if (selectedTeamId) {
            addSubteam(selectedTeamId, subteamName)
          }
        }}
      />
    </div>
  )
}

