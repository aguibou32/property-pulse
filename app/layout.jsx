import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
import 'photoswipe/dist/photoswipe.css'


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real state",
  description: "Find the perfect rental property"
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  )
}

export default MainLayout;
