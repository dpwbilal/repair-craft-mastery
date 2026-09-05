import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing/LandingPage";

const SITE = "https://repair-craft-mastery.lovable.app";

const TITLE = "Nasir Awan Training | Mobile Repairing Course Lahore";
const DESCRIPTION =
  "Nasir Awan Training — Lahore's top mobile repairing institute. Practical mobile course covering iPhone course, Android course and software course, chip-level.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${SITE}/#organization`,
      name: "Nasir Awan Training",
      alternateName: [
        "NASIRAWAN",
        "NASIR AWAN TRAINING",
        "Nasir Tech Institute",
        "Nasir Awan Mobile Repairing Institute",
      ],
      url: SITE,
      description: DESCRIPTION,
      telephone: ["+92-335-3590008", "+92-301-4692771"],
      email: "bmsaadnasir@gmail.com",
      founder: {
        "@type": "Person",
        name: "Nasir Awan",
        jobTitle: "Master Mobile Repairing Instructor",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Hall Road",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      areaServed: "Lahore, Punjab, Pakistan",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61591323549533",
        "https://www.youtube.com/@mobilereparingcours",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Nasir Awan Training",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#courses`,
      name: "Mobile Repairing Courses at Nasir Awan Training",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Course",
            name: "Complete Mobile Repairing Course",
            description:
              "Full mobile course from basic hardware to chip-level repairing, taught hands-on in Lahore.",
            url: `${SITE}/course/basic`,
            provider: { "@id": `${SITE}/#organization` },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Course",
            name: "iPhone Repairing Course",
            description:
              "iPhone course covering iOS hardware, logic board diagnostics and chip-level micro-soldering.",
            url: `${SITE}/course/master`,
            provider: { "@id": `${SITE}/#organization` },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Course",
            name: "Android Repairing Course",
            description:
              "Android course covering motherboard fault tracing, CPU and UFS handling, and IC reballing.",
            url: `${SITE}/course/advance`,
            provider: { "@id": `${SITE}/#organization` },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Course",
            name: "Mobile Software Course",
            description:
              "Software course covering flashing, unlocking, FRP removal and software diagnostics tools.",
            url: `${SITE}/#lab`,
            provider: { "@id": `${SITE}/#organization` },
          },
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "NASIRAWAN, Nasir Awan Training, mobile repairing, mobile course, iPhone course, Android course, software course, mobile repairing course Lahore",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
