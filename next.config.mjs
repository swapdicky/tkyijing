// Local 開發用空字串；部署到 Tai Kwun 時改返 "/bookofchanges_basilpao"
const basePath = "";

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