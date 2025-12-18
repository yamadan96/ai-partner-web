import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Partner - あなただけのAI彼女",
  description: "LINE風のUIで会話できるAIパートナーアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
