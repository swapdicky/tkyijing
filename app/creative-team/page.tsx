'use client';

import Header from "@/components/Header";
import { useState } from 'react';

export default function CreativeTeam() {
  const [showLightbox, setShowLightbox] = useState(false);
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
          height: '90px',
          borderBottom: '1px solid #888',
          backgroundColor: '#000 ',
          zIndex: 12
        }}
        />

      {/* Left fixed content block */}
      <div
        style={{
          position: 'fixed',
          top: '90px',
          left: 0,
          width: '50vw',
          height: 'calc(100vh - 90px)',
          backgroundColor: '#000',
          zIndex: 1,
          borderRight: '1px solid #888',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top half */}
        <div style={{ 
          height: '50%',
          borderBottom: '1px solid #888',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
            minHeight: '90px'
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>鳴謝</h1>
          </div>
          
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingLeft: '80px',
            paddingBottom: '30px',
            paddingRight: '30px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '1em' }}>
                 我們向所有協助及參與本次展覽的人士致以最誠摯的謝意。特別感謝鮑皓昕先生設計的展覽海報，以及Teresa Coleman女士借出其收藏的道教宗師法衣。
              </p>

              <p style={{ margin: 0 }}>
                展覽及其內容並不反映香港賽馬會慈善信託基金或大館的立場或意見。                 
              </p>
            </div>
          </div>
        </div>

        {/* Bottom half */}
        <div style={{ 
          height: '50%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
            minHeight: '90px'
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2,  fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Acknowledgement</h1>
          </div>
          
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingLeft: '80px',
            paddingBottom: '30px',
            paddingRight: '30px'
          }}>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              <p style={{ marginBottom: '1em' }}>
                We offer our thanks and warmest appreciation to everyone involved in realising this exhibition. Special thanks to Mr. Basil Pao for designing the key promotional image for the exhibition and to Ms. Teresa Coleman for lending a Daoist priest's robe from her collection.
              </p>
              <p style={{ margin: 0 }}>
                The exhibition and its contents do not reflect the views or opinions of The Hong Kong Jockey Club Charities Trust or Tai Kwun.
              </p>
            </div>
          </div>
        </div>



      </div> 

      {/* Right scrollable content block */}
      <div
        style={{
          paddingTop: '90px',
          paddingLeft: '50vw',
          minHeight: '100vh',
          backgroundColor: '#000'
        }}
      >
        {/* Content goes here */}
        <div>

          


        </div>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>藝術家團隊</h1>
          </div>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Artist Team</h1>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 30px',
            backgroundColor: '#000',
            borderBottom: '1px solid #888',
          }}>
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

          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>大館團隊</h1>
          </div>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Tai Kwun Team</h1>
          </div>
         <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 30px',
            backgroundColor: '#000',
            borderBottom: '1px solid #888',
          }}>
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
                  Anita Chun
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
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>展覽設計與製作</h1>
          </div>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Exhibition Design and Production</h1>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 30px',
            backgroundColor: '#000',
            borderBottom: '1px solid #888',
          }}>
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
                  AV
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
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '40px',
                cursor: 'pointer',
                fontFamily: '"neue-haas-unica", sans-serif',
                fontWeight: 300
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
