/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.jp",//TODO ここで読み込める外部サイトのURLを指定
        pathname: "/**"
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
        pathname: "/**"
      },
      {
        protocol:"https",
        hostname:"cdn.discordapp.com",
        pathname: "/**"
      },
    ],
  }
};

export default nextConfig;
