import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0E0E12] antialiased" suppressHydrationWarning>
        <PlanProvider>
          <Navbar />
          {children}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}