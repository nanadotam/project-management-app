import { TeamList } from "@/components/teams/team-list"
import { TeamHeader } from "@/components/teams/team-header"
import { Sidebar } from "@/components/sidebar"

export default function TeamsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6">
          <TeamHeader />
          <TeamList />
        </div>
      </div>
    </div>
  )
}

