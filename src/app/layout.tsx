import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
  title: "Try-Chat",
  description: "Try-Chat, a Q&A site for developers",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="jp">
      {/* クライアントサイドでsessionを読み込むためのもの */}
      <SessionProvider>
        <body className="bg-white">
            {/* ヘッダー */}
            <Header />
            <div className="container-fluid row">
              {/* サイドバー */}
              <div className="col-2">
                <div className="sticky-top">
                  <div className="pt-5 ms-3">
                    <Sidebar />
                  </div>
                </div>
              </div>
              {/* メイン */}
              <div className="col-8">
                <main className="container">
                  {children}
                </main>
              </div>  
            </div>
            {/* フッター */}
            <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
