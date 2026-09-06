/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow importing from packages/tokens dist
  transpilePackages: [],
  sassOptions: {
    // Make shared design token SCSS available globally
    includePaths: ['./src/styles'],
  },
  experimental: {
    // Enable typed routes for type-safe Link
    typedRoutes: true,
  },
};

module.exports = nextConfig;
