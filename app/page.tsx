import type { Metadata } from "next"

import InvitationPage from "./invitation-page"

export const metadata: Metadata = {
  title: "Mohian Weds Lamia",
  description: "Marriage invitation with schedule, venue details, and maps.",
}

export default function Page() {
  return <InvitationPage />
}
