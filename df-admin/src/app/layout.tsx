import type { Metadata, Viewport } from "next";
import "@/index.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#401C0C",
};

export const metadata: Metadata = {
  title: "Dhara Divine Awards Admin & Portal",
  description: "An annual celebration honouring selfless individuals in the path of spiritual and social service.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body className="bg-[#FDFBF8] dark:bg-[#121310] text-[#1B1C19] dark:text-[#E5E7EB] antialiased selection:bg-[#401C0C] selection:text-[#FFD27F]" suppressHydrationWarning>
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
