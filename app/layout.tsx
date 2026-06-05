import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "TK Yijing",
  description: "TK Yijing Exhibition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ overscrollBehavior: 'none' }}>
      <head>
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
                為讓瀏覽達到最佳體驗，建議使用較寬的瀏覽器視窗。
              </div>
              <div className="screen-size-warning-content-en">
                For the best experience, please expand your browser window.
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
