import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Try-Chat",
  description: "Try-Chat, a Q&A site for developers",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="jp">
      <body>
        {/* クライアントサイドでsessionを読み込むためのもの */}
        <SessionProvider>
          {/* ヘッダー */}
          <Header />
          {/* メイン */}
          <main className="container bg-white">
            {children}
          </main>
          {/* フッター */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
