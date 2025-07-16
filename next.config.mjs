/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force all pages to be dynamic to avoid static generation errors
  experimental: {},
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
