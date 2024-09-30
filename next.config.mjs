/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
        },
      ],
    },
  };
  
  export default nextConfig;