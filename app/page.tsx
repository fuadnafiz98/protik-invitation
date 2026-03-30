import type { Metadata } from "next"

import InvitationPage from "./invitation-page"

export const metadata: Metadata = {
  title: "Mohian Islam Protik and Lamia Zaman",
  description: "Marriage invitation with schedule, venue details, and maps.",
}

export default function Page() {
  return <InvitationPage />
}
