/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
