// next.config.mjs

import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('./'); // Alias '@' to the root directory
    return config;
  },
};

export default nextConfig;
