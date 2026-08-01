import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Existe um package-lock.json solto em C:\Users\faker. Sem fixar a raiz, o
  // Turbopack elege a pasta do usuário como workspace e o file watching para
  // de funcionar.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
