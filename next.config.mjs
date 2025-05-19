/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'candidastorage.s3.ap-southeast-2.amazonaws.com',
      'candidaaquaa.s3.ap-south-1.amazonaws.com',
    ],
  },
};

export default nextConfig;
