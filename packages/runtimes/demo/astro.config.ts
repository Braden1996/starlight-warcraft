import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { starlightWarcraft } from "starlight-warcraft/index.ts";

const repository = "https://github.com/Braden1996/starlight-warcraft";

export default defineConfig({
  site: "https://braden1996.github.io",
  base: "/starlight-warcraft/",
  output: "static",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "starlight-warcraft",
      description: "A fantasy theme for Starlight: gold, stone and framed components.",
      favicon: "/favicon.svg",
      logo: { src: "./src/assets/logo.svg", alt: "" },
      social: [{ icon: "github", label: "GitHub", href: repository }],
      editLink: { baseUrl: `${repository}/edit/main/packages/runtimes/demo/` },
      customCss: ["./src/styles/demo.css"],
      plugins: [starlightWarcraft()],
      sidebar: [
        {
          label: "Start here",
          items: [{ label: "Introduction", link: "/" }, { slug: "guides/getting-started" }],
        },
        {
          label: "Showcase",
          items: [{ slug: "guides/components" }, { slug: "guides/typography" }],
        },
        {
          label: "Project",
          items: [{ slug: "guides/credits" }],
        },
      ],
    }),
    react(),
  ],
});
