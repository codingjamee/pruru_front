/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['loremflickr.com', 'localhost'],
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/api/:path((?!auth).*)',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
      {
        source: '/custom/:path*',
        destination: `${process.env.NEXT_PUBLIC_CLOVA_REQUEST_URL}/custom/:path*`,
      },
    ],
  }),
};

export default nextConfig;
