import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "易經：鮑皓昕攝影藝術 | Book of Changes: The Art of Basil Pao",
  description: "《易經》無疑是中國文化遺產之精髓。儒家與道家思想同樣根植於此。是次展覽呈獻香港攝影藝術家鮑皓昕兩個系列作品：《中國牆城》和《觀靜錄》，探究文化遺產與藝術創作之間的關係。Yijing is a quintessential Chinese cultural heritage. Confucianism and Daoism have their common roots here. Through Basil Pao's photographic series—The Great Walls of China and Glimpses of Silence—explore the profound relationship between ancient philosophy and contemporary artistic creation.",
  keywords: "鮑皓昕, 易經, 大館 鮑皓昕, 大館 易經, 大館 中國展覽, 大館 哲學, 大館 文化, 大館 攝影, 大館 攝影 展覽, Basil Pao, Yijing, Book of Changes, Tai Kwun Philosophy, Tai Kwun Chinese Exhibition, Tai Kwun Photography, Tai Kwun Basil Pao, Tai Kwun Yijing, Tai Kwun Book of Changes",
  authors: [{ name: "Basil Pao" }],
  openGraph: {
    title: "易經：鮑皓昕攝影藝術 | Book of Changes: The Art of Basil Pao",
    description: "《易經》無疑是中國文化遺產之精髓。儒家與道家思想同樣根植於此。是次展覽呈獻香港攝影藝術家鮑皓昕兩個系列作品：《中國牆城》和《觀靜錄》，探究文化遺產與藝術創作之間的關係。Yijing is a quintessential Chinese cultural heritage. Confucianism and Daoism have their common roots here. Through Basil Pao's photographic series—The Great Walls of China and Glimpses of Silence—explore the profound relationship between ancient philosophy and contemporary artistic creation.",
    type: "website",
    locale: "zh_HK",
    images: [
      {
        url: '/images/TK_Yijing_SNS.jpg',
        width: 1200,
        height: 630,
        alt: "易經：鮑皓昕攝影藝術 - Book of Changes: The Art of Basil Pao"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "易經：鮑皓昕攝影藝術 | Book of Changes: The Art of Basil Pao",
    description: "《易經》無疑是中國文化遺產之精髓。儒家與道家思想同樣根植於此。是次展覽呈獻香港攝影藝術家鮑皓昕兩個系列作品：《中國牆城》和《觀靜錄》，探究文化遺產與藝術創作之間的關係。",
    images: ['/images/TK_Yijing_SNS.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo-icon-b.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overscrollBehavior: 'none' }}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/pen4qeo.css" />
      </head>
      <body style={{ overscrollBehavior: 'none' }}>
        {/* <Navigation /> */}
        <main>{children}</main>
        
        {/* Screen size warning overlay */}
        <div className="screen-size-warning">
          <div className="screen-size-warning-box">
            <div className="screen-size-warning-title">
              提示 <span className="fw-300"  style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Notes</span>
            </div>
            <div className="screen-size-warning-content">
              <div className="screen-size-warning-content-cn">
                請使用較大視窗瀏覽
              </div>
              <div className="screen-size-warning-content-en">
                Please use a larger window
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
