'use client';

import Header from "@/components/Header";
import { useState, useEffect, useRef } from 'react';

export default function CreativeTeam() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const stickyTitlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 980);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Ensure body can scroll when component mounts
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      // Clean up on unmount
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftContentRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Calculate how much the left content should move
      const leftContentHeight = leftContentRef.current.scrollHeight;
      const headerHeight = isMobile ? 50 : 90;
      const stickyTitlesHeight = stickyTitlesRef.current?.offsetHeight ?? 0;
      const viewportHeight = window.innerHeight - headerHeight - stickyTitlesHeight;
      const maxScroll = leftContentHeight - viewportHeight;
      
      setScrollProgress(progress * maxScroll);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation with delay to ensure content is rendered
    handleScroll();
    setTimeout(handleScroll, 100);
    setTimeout(handleScroll, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile]);
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Fixed header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '50px' : '90px',
          borderBottom: '1px solid #888',
          backgroundColor: '#000 ',
          zIndex: 12
        }}
        />

      {/* Left fixed content block */}
      <div
        style={{
          position: isMobile ? 'relative' : 'fixed',
          top: isMobile ? 0 : '90px',
          left: 0,
          width: isMobile ? '100%' : '50vw',
          height: isMobile ? 'auto' : 'calc(100vh - 90px)',
          backgroundColor: '#000',
          zIndex: 1,
          borderRight: isMobile ? 'none' : '1px solid #888',
          borderBottom: isMobile ? '1px solid #888' : 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: isMobile ? 'visible' : 'hidden',
          marginTop: isMobile ? '50px' : 0
        }}
      >
        {/* Sticky section titles */}
        <div ref={stickyTitlesRef} style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#000',
          zIndex: 2
        }}>
          <div className="section-title-row">
            <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>鳴謝</h1>
          </div>
          <div className="section-title-row">
            <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Acknowledgement</h1>
          </div>
        </div>

        {/* Scrolling content */}
        <div
          ref={leftContentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: isMobile ? 'none' : `translateY(-${scrollProgress}px)`,
            flex: 1
          }}
        >
          <div className="ct-left-content" style={{ 
            flex: 1
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left',
              marginBottom: '20px',
              fontFamily: '"Noto Serif TC", serif'
            }}>
              <p style={{ marginBottom: '1em' }}>
                我們向所有協助及參與本次展覽的人士致以最誠摯的謝意。特別感謝鮑皓昕先生設計的展覽海報，以及<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Teresa Coleman</span>女士借出其收藏的道教宗師法衣。
              </p>
              <p style={{ margin: 0 }}>
                展覽及其內容並不反映香港賽馬會慈善信託基金或大館的立場或意見。                            
              </p>
            </div>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left',
              fontFamily: '"neue-haas-unica", sans-serif',
              marginBottom: '40px'
            }}>
              <p style={{ marginBottom: '1em' }}>
                We offer our thanks and warmest appreciation to everyone involved in realising this exhibition. Special thanks to Mr. Basil Pao for designing the key promotional image for the exhibition and to Ms. Teresa Coleman for lending a Daoist priest's robe from her collection.
              </p>
              <p style={{ margin: 0 }}>
                The exhibition and its contents do not reflect the views or opinions of The Hong Kong Jockey Club Charities Trust or Tai Kwun.
              </p>
            </div>

            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#888',
              textAlign: 'left',
              marginBottom: '20px',
              fontFamily: '"Noto Serif TC", serif'
            }}>
              <p >
註: 是次展覽中引用《傅佩榮解讀易經》（台北，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>2022</span>）的白話中文譯解；英文版本根據衛禮賢（<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Richard Wilhelm</span>）的譯本，由卡利‧貝恩斯（<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Cary F. Baynes</span>）翻譯成英文（普林斯頓，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1997</span>）。              </p>

            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#888',
              textAlign: 'left',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              <p>
Notes: In this exhibition, the modern Chinese interpretation of the classical text is cited from <em>Fu Peirong jiedu Yijing (Fu Peirong's Interpretation of the Yijing)</em> (Taibei, 2022) and the English version is based on Richard Wilhelm's translation which was rendered into English by Cary F. Baynes (Princeton, 1997).              </p>
            </div>


          </div>
        </div>
      </div> 

      {/* Right scrollable content block */}
      <div
        style={{
          paddingTop: isMobile ? 0 : '90px',
          paddingLeft: isMobile ? 0 : '50vw',
          minHeight: '100vh',
          backgroundColor: '#000'
        }}
      >
        {/* Content goes here */}
        <div>
          {/* Section Title: Artist Team */}
          <div className="section-title" style={{
            position: 'sticky',
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>藝術家團隊</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Artist Team</h1>
            </div>
          </div>
          <div className="ct-team-section">
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {/* Left column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  藝術家
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Artist
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  鮑皓昕
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Basil Pao
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px'
            }}>
              {/* Left column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  展品製作

                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Artwork Production
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1 }}>

                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginTop: '28px'
                }}>
                  Studio 8 Limited
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content goes here */}
        <div>
          {/* Section Title: Tai Kwun Team */}
          <div className="section-title" style={{
            position: 'sticky',
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>大館團隊</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Tai Kwun Team</h1>
            </div>
          </div>
          <div className="ct-team-section">

            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {/* Left column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  策展
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Curatorial
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  鍾妙芬

                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Anita Chung
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {/* Left column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  項目管理


                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Project Management
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                 張晴晴

                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginBottom: '20px'
                }}>
                  Ching Ching Cheung
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                 許曉昕

                </div>                
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Queenie Hui
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px'
            }}>
              {/* Left column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  設計管理



                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Design Management
                </div>
              </div>

              {/* Right column */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                 易卓嵐


                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Addison Yick
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Content goes here */}
        <div>
          {/* Section Title: Exhibition Design and Production */}
          <div className="section-title" style={{
            position: 'sticky',
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>展覽設計與製作</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Exhibition Design and Production</h1>
            </div>
          </div>
          <div className="ct-team-section">

            {/* Row 1: Exhibition Design */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  展覽設計
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Exhibition Design
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginTop: '28px'
                }}>
                  Atelier Nuno Limited
                </div>
              </div>
            </div>

            {/* Row 2: Graphic Production */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  平面製作
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Graphic Production
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginTop: '28px'
                }}>
                  HATO
                </div>
              </div>
            </div>

            {/* Row 3: Exhibition Production */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  展覽製作
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Exhibition Production
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  雅卓創意有限公司
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Hattrick Creative Limited
                </div>
              </div>
            </div>

            {/* Row 4: Interactive Design */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  互動設計
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Interactive Design
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginTop: '28px'
                }}>
                  WARE
                </div>
              </div>
            </div>

            {/* Row 5: AV */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  影音裝置
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  AV Installation
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  適頎系統有限公司
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300
                }}>
                  Komstadt Systems Limited
                </div>
              </div>
            </div>

            {/* Row 6: Website Design */}
            <div style={{
              width: '100%',
              display: 'flex',
              gap: '30px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '10px',
                  fontWeight: 400
                }}>
                  網頁設計
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400
                }}>
                  Website Design
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  lineHeight: 1.2,
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  marginTop: '28px'
                }}>
                  Toby Ng Design
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowLightbox(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '1280px',
              aspectRatio: '16 / 9'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLightbox(false)}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '40px',
                cursor: 'pointer',
                fontFamily: '"neue-haas-unica", sans-serif',
                fontWeight: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            
            {/* Video player */}
            <video
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000'
              }}
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
