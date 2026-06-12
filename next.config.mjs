/** @type {import('next').NextConfig} */
const nextConfig = {

  output: "export",

  //basePath: "/clients/yijing",

  //assetPrefix: "/clients/yijing",

  images: {

    unoptimized: true,

  },

  eslint: {

    ignoreDuringBuilds: true,

  },

};

export default nextConfig;