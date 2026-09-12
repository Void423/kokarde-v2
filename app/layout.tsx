import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
      template: "%s | SDN 14 ATTS",
      default: "Web App SDN 14 ATTS",
   },
   // title: {
   //   template: "%s | SDN 14 ATTS",
   //   default: "Web App SDN 14 ATTS",
   // },
   description: "Web App SDN 14 ATTS",
   openGraph: {
      title: "SDN 14 ATTS",
      description: "Web App SDN 14 ATTS",
      url: "https://example.com/blog/my-blog-post",
      siteName: "Example Blog",
      images: [
         {
            url: "https://example.com/images/blog-post.jpg",
            width: 800,
            height: 600,
            alt: "SDN 14 ATTS",
         },
      ],
      locale: "id_ID",
      type: "website",
   },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
      <html
         lang="en"
         className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
         <body className="min-h-full flex flex-col">{children}</body>
      </html>
   );
}
