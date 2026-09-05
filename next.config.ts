import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shakelumiinezn.com.br" }],
        destination: "https://shakelumiinezn.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
