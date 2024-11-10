/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.jp",//TODO ここで読み込める外部サイトのURLを指定
        pathname: "/**"
      }
    ],
  }
};

export default nextConfig;
