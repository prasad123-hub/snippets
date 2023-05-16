/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/vercel/next.js/discussions/49432
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    ];

    return config;
  },
};

module.exports = nextConfig;
