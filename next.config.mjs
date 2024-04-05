/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['loremflickr.com', 'localhost', 'shopping-phinf.pstatic.net'],
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
      {
        source: '/search/:path*',
        destination: `${process.env.NEXT_PUBLIC_NAVER_SEARCH_URL}/search/:path*`,
      },
    ],
  }),
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  output: 'standalone',
};

export default nextConfig;
