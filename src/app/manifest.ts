import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jadagam Likhith — Full Stack Developer & Product UI/UX Designer",
    short_name: "Jadagam Likhith",
    description:
      "Personal portfolio of Jadagam Likhith: Computer Science Engineer & Product Designer building resilient backend systems and refined Material Design 3 interfaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070B",
    theme_color: "#06070B",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "300x80",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
