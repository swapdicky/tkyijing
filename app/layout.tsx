import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "TK Yijing",
  description: "TK Yijing Exhibition",
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
