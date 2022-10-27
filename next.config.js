/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "wedding-vendor-bucket.s3.us-west-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
