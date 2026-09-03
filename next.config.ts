import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/*.png"),
    ],
  },
  // Allows all local devices access to the Next Dev Server
  allowedDevOrigins: ["192.168.0.*:3000", "192.168.0.*", "0.0.0.0", "0.0.0.0:3000"],
};

export default nextConfig;
