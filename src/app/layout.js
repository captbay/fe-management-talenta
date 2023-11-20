import { Outfit } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const outfitOutfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Management Talenta",
  description: "Management Talenta",
  keywords: "Management Talenta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="dark">
      <body className={outfitOutfit.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
