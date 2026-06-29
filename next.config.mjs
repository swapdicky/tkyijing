const basePath = "/bookofchanges_basilpao";

/** @type {import('next').NextConfig} */
const nextConfig = {

  output: "export",

  basePath: basePath,

  assetPrefix: basePath,

  env: {

    NEXT_PUBLIC_BASE_PATH: basePath,

  },

  images: {

    unoptimized: true,

  },

  eslint: {

    ignoreDuringBuilds: true,

  },

};

export default nextConfig;