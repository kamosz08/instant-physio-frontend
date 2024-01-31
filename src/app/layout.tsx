import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer";
import { getAuthServerSession } from "@/utils/getAuthServerSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instant Physio",
  description:
    "Physical activities online from anywhere. Personal training supervised by variety of professional coaches",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthServerSession();

  return (
    <html lang="en" data-theme="lofi">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between py-24">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
