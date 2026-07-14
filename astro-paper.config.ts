import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://k1f0.dev",
    title: "k1f0.dev",
    description: "Programmer & Volunteering EMT-B",
    author: "k1f0",
    profile: "https://k1f0.dev",
    ogImage: "",
    lang: "en",
    timezone: "Europe/Vienna",
    dir: "ltr",
  },
  posts: {
    perPage: 5,
    perIndex: 3,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/0xk1f0" },
    { name: "x",        url: "https://x.com/atk1f0" },
    { name: "linkedin", url: "https://www.linkedin.com/in/fabian-k1" },
    { name: "matrix",   url: "https://matrix.to/#/@k1f0:whispershack.com" },
    { name: "mail",     url: "mailto:0xk1f0@pm.me" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
