import { PageWrapper } from "@/components/layout/page-wrapper"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <SettingsTabs />
    </PageWrapper>
  )
}

