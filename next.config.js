/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/macrame-by-jacob.appspot.com/o/**',
         },
      ],
   },
}

module.exports = nextConfig
