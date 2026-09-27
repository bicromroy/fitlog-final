import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/fitlog/:path*",
        destination: "https://api.abcz.workers.dev/api/fitlog/:path*",
      },
      {
        source: "/api/fitlog-alt/:path*",
        destination: "https://api.api-store.workers.dev/api/fitlog/:path*",
      },
    ];
  },
};

export default nextConfig;