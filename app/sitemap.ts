import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/beer", "/kitchen", "/to-go", "/events", "/visit", "/private-events", "/mug-club", "/about"];
  return routes.map((path) => ({ url: `${site.url}${path}/`, lastModified }));
}
