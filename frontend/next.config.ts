import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.235.251.230"],
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:8080";
    return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  },
};

export default nextConfig;
