'use client';

import Header from "@/components/Header";
import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftContentRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Calculate how much the left content should move
      const leftContentHeight = leftContentRef.current.scrollHeight;
      const viewportHeight = window.innerHeight - 90 - 180; // minus header (90px) and sticky titles (180px)
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
  }, []);
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
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Sticky section titles */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#000',
          zIndex: 2
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
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>策展人的話</h1>
          </div>
          <div style={{ 
            height: '90px',
            paddingLeft: '30px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px solid #888',
            minHeight: '90px'
          }}>
            <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2,  fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Curatorial Statement</h1>
          </div>
        </div>

        {/* Scrolling content */}
        <div
          ref={leftContentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translateY(-${scrollProgress}px)`,
            flex: 1
          }}
        >
               <div style={{
                            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
               }}>    
          <div style={{ 

            paddingLeft: '80px',
            paddingBottom: '40px',
            paddingRight: '30px',
            paddingTop: '120px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '1em' }}>
                自然變化的韻律與人類創造性的轉化，顯現為萬物存在與形成之間的恆常流轉。這來自《易經》的奧妙洞見，啟發了是次展覽的策劃理念。展覽揭示文化遺產如何持續激發創造性想像，為當代詮釋賦予新意。
              </p>
              <p style={{ marginBottom: '1em' }}>
《易經》無疑是中國文化遺產之精髓，儒家與道家思想同樣根植於此。中國古代哲學、科學、國家治術，甚至當代生活也從中獲得靈感。
              </p>
              <p style={{ marginBottom: '1em' }}>
                是次展覽呈獻香港攝影藝術家鮑皓昕兩個系列作品：《中國牆城》和《觀靜錄》，探究文化遺產與藝術創作之間的關係。這些照片捕捉變化無窮的世界，見證鮑氏對《易經》的深刻體會，藉此擁抱真實自我，飽覽天地之壯麗與奧秘。
              </p>
              <p style={{ margin: 0 }}>
我們希望展覽帶來的沉浸體驗能為抽象的概念賦予意義，並激發人們思考：當地球持續暖化、人工智能科技不斷重塑人類經驗之際，如何仍能從傳統智慧中獲得禆益。
              </p>
            </div>
          </div>


          <div style={{ 

            paddingLeft: '80px',
            paddingBottom: '60px',
            paddingRight: '30px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 300,
              color: '#fff',
              textAlign: 'left',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              <p style={{ marginBottom: '1em' }}>
Nature’s rhythm of change and humanity’s creative transformation manifest as a constant flux of being and becoming. This profound insight from the <em>Yijing</em>, or <em>Book of Changes</em>, inspired the current exhibition which shows how heritage never ceases to stir creative imagination for making meaning.
              </p>
              <p style={{ marginBottom: '1em' }}>
<em>The Book of Changes</em> is unquestionably a quintessential Chinese cultural heritage. Along with Confucianism and Daoism, which have their common roots here, ancient Chinese philosophy, science, statecraft, and even modern living have all drawn inspiration from it.
              </p>
              <p style={{ marginBottom: '1em' }}>
Two series of works by Hong Kong photo artist Basil Pao—<em>The Great Walls of China</em> and <em>Glimpses of Silence</em>—are presented here to explore the relation between heritage and artistic creation. Capturing a world of changing reality and changing appearance, these pictures are the testament to Pao’s deep connections to the <em>Book of Changes</em> for embracing the authentic self and beholding the beauty and mystery of the world.
              </p>
              <p style={{ margin: 0 }}>
We hope the immersive experiences of this show will allow abstract ideas to take on meaning and inspire thoughts about the continued relevance of ancient wisdom, as we face a warming planet and advances of AI technologies that increasingly reshape the human experience.              
              </p>
            </div>
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
          {/* Section Title: Video */}
          <div className="section-title" style={{
            position: 'sticky',
            top: '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888',
            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>影片</h1>
            </div>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888',
            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Video</h1>
            </div>
          </div>
          
          {/* Video preview block */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 40px',
            backgroundColor: '#000',
                        borderBottom: '1px solid #888',

          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              aspectRatio: '16 / 9',
              backgroundImage: 'url(/images/about/1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setShowLightbox(true)}
            >

            </div>
          </div>

        </div>
        {/* Content goes here */}
        <div>       
          {/* Section Title: Public Programmes */}
          <div className="section-title" style={{
            position: 'sticky',
            top: '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888',
            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>公眾節目</h1>
            </div>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888',
            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Public Programmes</h1>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 40px',
            backgroundColor: '#000',
            borderBottom: '1px solid #888',
          }}>
            {/* First block */}
            <div style={{
              width: '100%',
              maxWidth: '640px',
              marginBottom: '80px'
            }}>
              {/* Image container */}
              <a 
                href="https://www.taikwun.hk/zh/programme/detail/book-of-changes-the-art-of-basil-pao-curators-guided-tour/1719"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  backgroundImage: 'url(/images/about/2.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}>
                  {/* Image placeholder */}
                </div>
              </a>

              {/* Text content */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  flex: 1
                }}>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#fff',
                    marginBottom: '8px'
                  }}>
                    易經：鮑皓昕攝影藝術—策展人導賞
                  </div>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#fff',
                    fontFamily: '"neue-haas-unica", sans-serif',
                    fontWeight: 300
                  }}>
                    Book of Changes: The Art of Basil Pao – Curator's Guided Tour
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  whiteSpace: 'nowrap',
                  marginLeft: '40px'
                }}>
                  17 & 31.1.2026
                </div>
              </div>
            </div>

            {/* Second block */}
            <div style={{
              width: '100%',
              maxWidth: '640px'
            }}>
              <a 
                href="https://www.taikwun.hk/zh/programme/detail/tai-kwun-conversations-the-book-of-changes-a-living-classic/1731"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
              {/* Image container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                backgroundImage: 'url(/images/about/3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginBottom: '20px'
              }}>
                {/* Image placeholder */}
              </div>

              {/* Text content */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  flex: 1
                }}>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#fff',
                    marginBottom: '8px'
                  }}>
                    大館對談：《易經》—活著的經典
                  </div>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#fff',
                    fontFamily: '"neue-haas-unica", sans-serif',
                    fontWeight: 300
                  }}>
                    Tai Kwun Conversations: The Book of Changes – A Living Classic
                  </div>
                </div>
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#fff',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  whiteSpace: 'nowrap',
                  marginLeft: '40px'
                }}>
                  08.02.2026
                </div>
              </div>
              </a>
            </div>

          </div>

        </div>
        {/* Content goes here */}
        <div>    


          {/* Section Title: Artist Bio */}
          <div className="section-title" style={{
            position: 'sticky',
            top: '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888'
            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontWeight: 400, color: '#fff' }}>藝術家簡介</h1>
            </div>
            <div style={{ 
              height: '90px',
              paddingLeft: '30px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left',
              borderBottom: '1px solid #888'

            }}>
              <h1 style={{ margin: 0, fontSize: '40px', lineHeight: 1.2, fontFamily:'neue-haas-unica, sans-serif', fontWeight: 300, color: '#fff' }}>Artist Bio</h1>
            </div>
          </div>
          <div style={{
            minHeight: 'calc(100vh - 90px)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
                        justifyContent: 'flex-end',            
          }}>
          {/* Artist Bio Content - Chinese */}
          <div style={{ 


            paddingLeft: '80px',
            paddingBottom: '40px',
            paddingRight: '30px',
            paddingTop: '60px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#fff',
              fontWeight: 300,
              textAlign: 'left'
            }}>
              鮑皓昕自1980年從美國回流返港，開展其攝影生涯。旅美十年期間，他曾為紐約的大西洋唱片公司及唱片封套設計公司、洛杉磯的華納兄弟唱片公司擔任美術總監。他為電影《踎低噴飯：萬世魔星》設計書籍、唱片封套及海報時，首次與米高沛林合作。自此，兩人攜手製作了11本以英國廣播公司BBC旅遊特輯為藍本的圖冊，包括《兩極之旅》、《環太平洋之旅》、《海明威歷險記》、《撒哈拉》、《喜馬拉雅》、《新歐洲》，以及《巴西》等。鮑氏本人的著作包括《手》、《中國探秘》、《易經—中國牆城》、《山水》、《環球吶喊》、《平凡時刻》、《夢之旅》，以及《末代皇帝．幕後剪影》。鮑氏為其於倫敦的福克斯·塔爾博特博物館及皇家地理學會的展覽出版了圖錄《與米高沛林同遊世界》，以及香港海事博物館的展覽圖錄《八千日環遊世界》。他還為公司企業製作的限量版書籍，包括華光海運的《雙船記》，安縵度假酒店的《安縵》、《不丹》及《安縵2》，意大利書籍印刷商特蘭提諾的《平凡時刻》、《四原色—中國》及《耀眼的陰影—黑白光影之國度》。鮑氏的旅行遊記及其他攝影作品曾在世界各大出版物及展覽中亮相，包括為貝托魯奇的電影《末代皇帝溥儀》及《小活佛》、泰利鍾斯的《海盗埃里克》、泰利基咸的《殺了堂吉訶德的男人》等拍攝的特別劇照。
            </div>
          </div>

          {/* Artist Bio Content - English */}
          <div style={{ 
            paddingLeft: '80px',
            paddingBottom: '60px',
            paddingRight: '30px'
          }}>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.4',
              color: '#fff',
              fontFamily:'neue-haas-unica, sans-serif', 
              fontWeight: 300,
              textAlign: 'left'
            }}>
Basil Pao began his photographic career in 1980 upon his return to Hong Kong after ten years in the United States, where he was art director for Atlantic Records and Album Graphics Inc. in New York, and Warner Brothers Records in Los Angeles. He first worked with Michael Palin when he designed the book, album cover and poster for the Monty Python film <em>Life of Brian</em>. They have since collaborated on 11 illustrated books based on the BBC travel series <em>Pole to Pole, Full Circle, Hemingway Adventure, Sahara, Himalaya, New Europe and Brazil</em>. He is the author of <em>Hands, China Revealed, Yi’Jing-Book of Changes, Shan Shui-Mountain-Water, The Universal Scream, OM2-Ordinary Moments+, Carnival of Dreams and The Last Emperor Revisited</em>. His exhibition catalogues include <em>Travels with Michael Palin</em> for his exhibitions at the Fox Talbot Museum and the Royal Geographical Society in London; and <em>Around the World in 8000 Days</em> at the Hong Kong Maritime Museum. His corporate limited editions include <em>A Tale of Two Ventures</em> for Wah Kwong Maritime Transport; <em>AMAN, Bhutan and AMAN2</em> for Aman resorts; <em>OM-Ordinary Moments, CMYK-China, and Blazing Shadows-A World of Black & Light</em> for Printer Trento in Italy. Basil’s travel essays and other assignments, including his Special Stills photography for Bernardo Bertolucci’s <em>The Last Emperor and Little Buddha</em>, Terry Jones’ <em>Erik the Viking</em>, Terry Gilliam’s <em>The Man Who Killed Don Quixote</em> and other feature films, have appeared in publications and exhibitions all around the world.            </div>
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
