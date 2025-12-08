import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real state",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
