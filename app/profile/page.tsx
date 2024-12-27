"use client"

import { PageWrapper } from "@/components/layout/page-wrapper"
import { ProfileView } from "@/components/profile/profile-view"

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto">
        <ProfileView />
      </div>
    </PageWrapper>
  )
} 