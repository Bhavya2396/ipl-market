export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "IPL Market",
  description:
    "A marketplace for IPL players and teams built with Next.js and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Players",
      href: "/players",
    },
    {
      title: "Teams",
      href: "/teams",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
  },
} 