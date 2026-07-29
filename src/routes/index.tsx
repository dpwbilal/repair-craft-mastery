import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nasir Tech Institute — Mobile Repair Course" },
      { name: "description", content: "Learn mobile repairing in Lahore with Sir Nasir Awan through practical Basic, Advance, and Master level training." },
      { property: "og:title", content: "Nasir Tech Institute — Mobile Repair Course" },
      { property: "og:description", content: "Learn mobile repairing in Lahore with Sir Nasir Awan through practical Basic, Advance, and Master level training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nasir Tech Institute — Mobile Repair Course" },
      { name: "twitter:description", content: "Learn mobile repairing in Lahore with Sir Nasir Awan through practical Basic, Advance, and Master level training." },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
