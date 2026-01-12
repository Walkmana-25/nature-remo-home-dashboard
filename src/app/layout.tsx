import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature Remo ホームダッシュボード",
  description: "Nature Remo APIを使用した温度・湿度・照度モニタリングシステム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
