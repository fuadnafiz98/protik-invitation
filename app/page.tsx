import type { Metadata } from "next"

import InvitationPage from "./invitation-page"

export const metadata: Metadata = {
  title: "Mohian Islam Protik and Lamia Zaman",
  description: "Marriage invitation with schedule, venue details, and maps.",
  openGraph: {
    title: "Mohian Islam Protik and Lamia Zaman",
    description: "Marriage invitation with schedule, venue details, and maps.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mohian Weds Lamia invitation cover image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohian Islam Protik and Lamia Zaman",
    description: "Marriage invitation with schedule, venue details, and maps.",
    images: ["/opengraph-image"],
  },
}

export default function Page() {
  return <InvitationPage />
}
