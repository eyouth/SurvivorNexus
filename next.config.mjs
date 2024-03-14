/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/report',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
