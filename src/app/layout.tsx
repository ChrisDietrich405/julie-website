import "./globals.css";
import type {Metadata} from "next";
import {Roboto_Mono} from "next/font/google";
import {ToastContainer} from "react-toastify";
// import { ThemeProvider, createMuiTheme } from 'material-ui/styles';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Providers} from "../components/Providers";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
    {/* <ThemeProvider theme={THEME}> */}
    <body className={robotoMono.className} style={{
      overflowX: 'hidden'
    }}>
    <Providers>
      <ToastContainer/>
      <Navbar/>
      {children}
      <Footer/>
    </Providers>
    </body>
    {/* </ThemeProvider> */}
    </html>
  );
}
