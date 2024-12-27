"use client"

import { PageWrapper } from "@/components/layout/page-wrapper"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarView } from "@/components/calendar/calendar-view"

export default function CalendarPage() {
  return (
    <PageWrapper>
      <CalendarHeader />
      <CalendarView />
    </PageWrapper>
  )
}

