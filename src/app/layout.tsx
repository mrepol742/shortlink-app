import type { Metadata } from "next";
import { Source_Code_Pro, Maven_Pro } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Shortlink App",
  description: "Get your link, shorteeeeeen!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${mavenPro.variable}`}
    >
      <head>
        <meta name="hostname" content="go.melvinjonesrepol.com" />
        <link rel="canonical" href="https://go.melvinjonesrepol.com" />
      </head>
      <body className="antialiased">
        <Nav />
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
          {children}
        </ReCaptchaProvider>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
