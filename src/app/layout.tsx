import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/state/ReduxProvider";
import { EdgeStoreProvider } from "@/state/EdgeStoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
            <ReduxProvider>
              <EdgeStoreProvider>
                {children}
              </EdgeStoreProvider>
            </ReduxProvider>
      </body>
    </html>
  );
}
