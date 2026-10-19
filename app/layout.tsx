import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streaming Demo",
  description: "Next.js Loading, Suspense, Skeleton, Not Found, Error",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <nav className="flex gap-4 border-b border-gray-200 px-6 py-3 text-blue-700">
          <Link href="/">หน้าแรก</Link>
          <Link href="/students">นักศึกษา</Link>
          <Link href="/blogs">บทความ</Link>
          <Link href="/skeleton">Skeleton</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
