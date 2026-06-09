'use client';

import Header from "@/components/Header";
import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const stickyTitlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 980);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  const videos = [
    {

      thumbnail: '/images/about/1.jpg',
      youtubeId: 'YOUR_YOUTUBE_ID_1'
    },
    {

      thumbnail: '/images/about/2.jpg',
      youtubeId: 'YOUR_YOUTUBE_ID_2'
    }
  ];
  
  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

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
          height: isMobile ? 'auto' : 'calc(100% - 90px)',
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
          top: isMobile ? '50px' : 0,
          backgroundColor: '#000',
          zIndex: 2
        }}>
          <div className="section-title-row">
            <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>策展人的話</h1>
          </div>
          <div className="section-title-row">
            <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Curatorial Statement</h1>
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
               <div style={{
                            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
               }}>    
          <div className="ct-left-content">

            <div className="text-white fw-300 yj-cn-16" style={{ lineHeight: '1.4', textAlign: 'left', marginBottom: '20px' }}>
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

            <div className="text-white fw-300 yj-en-16" style={{ lineHeight: '1.4', textAlign: 'left' }}>
              <p style={{ marginBottom: '1em' }}>
Nature’s rhythm of change and humanity’s creative transformation manifest as a constant flux of being and becoming. This profound insight from the <em>Yijing</em>, or <em>Book of Changes</em>, inspired the current exhibition which shows how heritage never ceases to stir creative imagination for making meaning.
              </p>
              <p style={{ marginBottom: '1em' }}>
The <em>Book of Changes</em> is unquestionably a quintessential Chinese cultural heritage. Along with Confucianism and Daoism, which have their common roots here, ancient Chinese philosophy, science, statecraft, and even modern living have all drawn inspiration from it.
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
          paddingTop: isMobile ? 0 : '90px',
          paddingLeft: isMobile ? 0 : '50vw',
          minHeight: '100%',
          backgroundColor: '#000'
        }}
      >
        {/* Content goes here */}
        <div>
          {/* Section Title: Video */}
          <div className="section-title" style={{
            position: 'sticky',
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>影片</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Video</h1>
            </div>
          </div>
          
          {/* Video preview block */}
          <div className="about-video-section">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {/* Video thumbnail slider - only the image slides */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '640px',
                marginBottom: '20px',
                overflow: 'hidden',
                borderRadius: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-${currentVideoIndex * 100}%)`
                }}>
                  {videos.map((video, idx) => (
                    <div
                      key={idx}
                      style={{
                        flexShrink: 0,
                        width: '100%',
                        aspectRatio: '16 / 9',
                        backgroundImage: `url(${video.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowLightbox(true)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Video info */}
              <div style={{
                width: '100%',
                maxWidth: '640px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                {/* Left: Titles */}
                <div>
                  <div className="text-white yj-cn-16" style={{ lineHeight: '1.6', marginBottom: '4px' }}>
                  </div>
                  <div
                    className="text-white fw-300 yj-en-16"
                    style={{ lineHeight: '1.6' }}
                  />
                </div>
                
                {/* Right: Next Video button and dots */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '15px',
                  marginLeft: '40px'
                }}>
                  {/* Navigation dots */}
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    {videos.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        onClick={() => setCurrentVideoIndex(dotIndex)}
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: currentVideoIndex === dotIndex ? '#FFF' : 'transparent',
                          border: currentVideoIndex === dotIndex ? 'none' : '1px solid #888',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s, border 0.3s'
                        }}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={handleNextVideo}
                    className="text-gray fw-300 yj-en-12"
                    style={{
                      whiteSpace: 'nowrap',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                  >
                    {currentVideoIndex < videos.length - 1 ? (
                      <>觀看更多 <span className="neue-haas-unica">Next Video</span></>
                    ) : (
                      <>觀看更多 <span className="neue-haas-unica">Next Video</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Content goes here */}
        <div>       
          {/* Section Title: Public Programmes */}
          <div className="section-title" style={{
            position: 'sticky',
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>公眾節目</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Public Programmes</h1>
            </div>
          </div>
          <div className="about-program-section">
            {/* First block */}
            <div className="about-program-block">
              {/* Image container */}

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
                  marginBottom: '20px'
                }}>
                  {/* Image placeholder */}
                </div>
              <a 
                href="https://www.taikwun.hk/zh/programme/detail/book-of-changes-the-art-of-basil-pao-curators-guided-tour/1719"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
              {/* Text content */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  flex: 1
                }}>
                  <div 
                    className="hover-underline text-white yj-cn-16"
                    style={{ lineHeight: '1.6', marginBottom: '4px' }}>
                    易經：鮑皓昕攝影藝術 — 策展人導賞
                  </div>
                  <div 
                    className="hover-underline text-white fw-300 yj-en-16"
                    style={{ lineHeight: '1.6' }}>
                    <em>Book of Changes</em>: The Art of Basil Pao — Curator's Guided Tour
                  </div>
                </div>
                <div className="text-gray fw-300  yj-en-12" style={{ lineHeight: '1.6', whiteSpace: 'nowrap', marginLeft: '40px',marginTop: '5px' }}>
                  17 & 31.1.2026
                </div>
              </div>
              </a>

            </div>

            {/* Second block */}
            <div style={{
              width: '100%',
              maxWidth: '640px'
            }}>

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
                marginBottom: '20px'
              }}>
                {/* Image placeholder */}
              </div>
              <a 
                href="https://www.taikwun.hk/zh/programme/detail/tai-kwun-conversations-the-book-of-changes-a-living-classic/1731"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
              {/* Text content */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  flex: 1
                }}>
                  <div 
                    className="hover-underline text-white yj-cn-16"
                    style={{ lineHeight: '1.6', marginBottom: '4px' }}>
                    大館對談：《易經》— 活著的經典
                  </div>
                  <div 
                    className="hover-underline text-white fw-300 yj-en-16"
                    style={{ lineHeight: '1.6' }}>
                    Tai Kwun Conversations: The <em>Book of Changes</em> — A Living Classic
                  </div>
                </div>
                <div className="text-gray fw-300  yj-en-12" style={{ lineHeight: '1.6', whiteSpace: 'nowrap', marginLeft: '40px' ,marginTop: '5px'}}>
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
            top: isMobile ? '50px' : '90px',
            backgroundColor: '#000',
            zIndex: 10
          }}>
            <div className="section-title-row">
              <h1 className="text-white fw-400 section-title-text" style={{ lineHeight: 1.2 }}>藝術家簡介</h1>
            </div>
            <div className="section-title-row">
              <h1 className="text-white fw-300 section-title-text" style={{ lineHeight: 1.2, fontFamily: '"neue-haas-unica", sans-serif' }}>Artist Bio</h1>
            </div>
          </div>
          <div style={{
            minHeight: 'calc(100% - 90px)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
                        justifyContent: 'flex-end'         
          }}>
          {/* Artist Bio Content - Chinese */}
          <div className="ct-team-section" style={{border:'none'}}>

            <div className="text-white fw-300 yj-cn-16" style={{ lineHeight: '1.8', textAlign: 'left', fontFamily: '"Noto Serif TC", serif', marginBottom: '20px' }}>
              鮑皓昕自<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1980</span>年從美國回流返港，開展其攝影生涯。旅美十年期間，他曾為紐約的大西洋唱片公司及唱片封套設計公司、洛杉磯的華納兄弟唱片公司擔任美術總監。他為電影《踎低噴飯：萬世魔星》設計書籍、唱片封套及海報時，首次與米高沛林合作。自此，兩人攜手製作了<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>11</span>本以英國廣播公司<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>BBC</span>旅遊特輯為藍本的圖冊，包括《兩極之旅》、《環太平洋之旅》、《海明威歷險記》、《撒哈拉》、《喜馬拉雅》、《新歐洲》，以及《巴西》等。鮑氏本人的著作包括《手》、《中國探秘》、《易經—中國牆城》、《山水》、《環球吶喊》、《平凡時刻》、《夢之旅》，以及《末代皇帝．幕後剪影》。鮑氏為其於倫敦的福克斯·塔爾博特博物館及皇家地理學會的展覽出版了圖錄《與米高沛林同遊世界》，以及香港海事博物館的展覽圖錄《八千日環遊世界》。他還為公司企業製作的限量版書籍，包括華光海運的《雙船記》，安縵度假酒店的《安縵》、《不丹》及《安縵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>2</span>》，意大利書籍印刷商特蘭提諾的《平凡時刻》、《四原色—中國》及《耀眼的陰影—黑白光影之國度》。鮑氏的旅行遊記及其他攝影作品曾在世界各大出版物及展覽中亮相，包括為貝托魯奇的電影《末代皇帝溥儀》及《小活佛》、泰利鍾斯的《海盗埃里克》、泰利基咸的《殺了堂吉訶德的男人》等拍攝的特別劇照。
            </div>

            <div className="text-white fw-300 yj-en-16" style={{ lineHeight: '1.4', textAlign: 'left' }}>
Basil Pao began his photographic career in 1980 upon his return to Hong Kong after ten years in the United States, where he was art director for Atlantic Records and Album Graphics Inc. in New York, and Warner Brothers Records in Los Angeles. He first worked with Michael Palin when he designed the book, album cover and poster for the Monty Python film <em>Life of Brian</em>. They have since collaborated on 11 illustrated books based on the BBC travel series <em>Pole to Pole, Full Circle, Hemingway Adventure, Sahara, Himalaya, New Europe and Brazil</em>. He is the author of <em>Hands, China Revealed, Yi’Jing-Book of Changes, Shan Shui-Mountain-Water, The Universal Scream, OM2-Ordinary Moments+, Carnival of Dreams and The Last Emperor Revisited</em>. His exhibition catalogues include <em>Travels with Michael Palin</em> for his exhibitions at the Fox Talbot Museum and the Royal Geographical Society in London; and <em>Around the World in 8000 Days</em> at the Hong Kong Maritime Museum. His corporate limited editions include <em>A Tale of Two Ventures</em> for Wah Kwong Maritime Transport; <em>AMAN, Bhutan and AMAN2</em> for Aman resorts; <em>OM-Ordinary Moments, CMYK-China, and Blazing Shadows-A World of Black & Light</em> for Printer Trento in Italy. Basil’s travel essays and other assignments, including his Special Stills photography for Bernardo Bertolucci’s <em>The Last Emperor and Little Buddha</em>, Terry Jones’ <em>Erik the Viking</em>, Terry Gilliam’s <em>The Man Who Killed Don Quixote</em> and other feature films, have appeared in publications and exhibitions all around the world.            </div>
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
            height: '100%',
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
              className="text-white fw-300"
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
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
