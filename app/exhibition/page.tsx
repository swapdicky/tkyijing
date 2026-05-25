"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import gsap from "gsap";

export default function Exhibition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionBreakRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageParallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Preload images and fade in animation on mount
  useEffect(() => {
    const imagesToPreload = [
      '/images/exhibition/ss1-landing.webp',
      '/images/exhibition/ss1a.webp',
      '/images/exhibition/ss1b.webp',
      '/images/exhibition/ss1c.webp',
      '/images/exhibition/ss2-landing.webp',
      '/images/exhibition/ss2a.webp',
      '/images/exhibition/ss2b.webp',
      '/images/exhibition/ss2c.webp',
      '/images/exhibition/ss2d.webp',
      '/images/exhibition/ss3-landing.webp',
      '/images/exhibition/ss3a.webp',
      '/images/exhibition/ss3b.webp',
      '/images/exhibition/ss3c.webp',
      '/images/exhibition/ss4a.webp'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;

    const container = containerRef.current;
    const sections = sectionsRef.current;
    let currentX = 0;
    let targetX = 0;
    let animationFrame: number;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const totalWidth = sections.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = totalWidth - viewportWidth;

      // Use deltaY (vertical scroll) to control horizontal movement
      // Multiply by 0.5 to slow down the scroll speed
      targetX -= e.deltaY * 0.5;
      targetX = Math.max(-maxScroll, Math.min(0, targetX));
    };

    let frameCount = 0;
    const updateParallax = () => {
      sectionBreakRefs.current.forEach((breakEl, index) => {
        if (!breakEl) return;
        
        const rect = breakEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate progress: 0 when entering from right, 1 when leaving from left
        const elementWidth = rect.width;
        const startPosition = viewportWidth; // Right edge of viewport
        const endPosition = -elementWidth; // Left edge (element completely off screen)
        
        // Progress from 0 (entering) to 1 (leaving) - slower movement across entire screen
        const totalDistance = startPosition - endPosition;
        const currentDistance = startPosition - rect.left;
        const progress = Math.min(1, Math.max(0, currentDistance / totalDistance));
        
        // Move div from left to center - start at -70%, end at 0%
        const translateX = -50 + (progress * 50);
        
        breakEl.style.transform = `translateX(${translateX}%)`;
      });
    };

    const updateInnerSectionScale = () => {
      const viewportCenter = window.innerWidth / 2;
      const viewportWidth = window.innerWidth;
      const baseHeight = window.innerHeight - 150;
      const targetHeight = window.innerHeight;
      const scaleZone = 1200;
      
      // Update all inner-sections with gradual scaling
      innerSectionRefs.current.forEach((innerEl) => {
        if (!innerEl) return;
        
        const rect = innerEl.getBoundingClientRect();
        
        // Skip elements far outside viewport for performance
        if (rect.right < -scaleZone || rect.left > viewportWidth + scaleZone) {
          return;
        }
        
        // Remove transition for smooth animation
        innerEl.style.transition = 'none';
        
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        // Calculate scale factor based on distance (0 = far, 1 = at center)
        const scaleFactor = Math.max(0, 1 - (distanceFromCenter / scaleZone));
        
        // Apply ease-in-out for smoother animation at both ends
        const easedScale = scaleFactor < 0.5
          ? 4 * scaleFactor * scaleFactor * scaleFactor
          : 1 - Math.pow(-2 * scaleFactor + 2, 3) / 2;
        
        // Calculate height based on eased scale
        const currentHeight = baseHeight + (targetHeight - baseHeight) * easedScale;
        innerEl.style.height = `${currentHeight}px`;
        
        // Adjust margin to compensate for padding
        const heightIncrease = currentHeight - baseHeight;
        const marginTop = heightIncrease * 0.6;
        const marginBottom = heightIncrease * 0.4;
        innerEl.style.marginTop = `-${marginTop}px`;
        innerEl.style.marginBottom = `-${marginBottom}px`;
      });
    };

    const updateImageParallax = () => {
      const viewportWidth = window.innerWidth;
      
      imageParallaxRefs.current.forEach((imgEl) => {
        if (!imgEl) return;
        
        const rect = imgEl.getBoundingClientRect();
        
        // Calculate progress: 0 when entering from right, 1 when leaving from left
        const elementWidth = rect.width;
        const startPosition = viewportWidth; // Right edge of viewport
        const endPosition = -elementWidth; // Left edge (element completely off screen)
        
        const totalDistance = startPosition - endPosition;
        const currentDistance = startPosition - rect.left;
        let progress = Math.min(1, Math.max(0, currentDistance / totalDistance));
        
        // If element hasn't entered viewport yet (progress = 0), keep at left center
        // If element has left viewport (progress = 1), keep at right center
        // Otherwise, pan smoothly from left to right
        const bgPositionX = progress * 100;
        
        imgEl.style.backgroundPosition = `${bgPositionX}% center`;
      });
    };

    const animate = () => {
      // Minimal lerp for slight smoothness
      currentX += (targetX - currentX) * 0.35;
      
      gsap.set(sections, { x: currentX });
      setScrollX(currentX);
      
      // Update parallax effect every 3 frames for better performance
      frameCount++;
      if (frameCount % 3 === 0) {
        updateParallax();
        updateImageParallax();
      }
      
      // Update inner section scale every frame for smoothest animation
      updateInnerSectionScale();
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Initialize parallax positions before starting animation
    updateImageParallax();
    
    // Start animation loop
    animate();

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      className={`bg-black overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      style={{ height: '100vh' }}
    >
      <Header />
      
      <div ref={containerRef} className="h-screen overflow-hidden" style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}>
        <div 
          ref={sectionsRef}
          className="flex h-screen"
          style={{ width: "auto" }}
        >
          {/* Landing */}
          <div className="h-screen  relative" style={{ minWidth: "50vw", zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '120px 40px 60px' }}>
      <div
        style={{
          position: 'absolute',
          left: '1px',
          top: '50%',
          transform: 'rotate(90deg)',
          transformOrigin: 'center center',
          fontSize: '12px',
          color: '#888',
          fontFamily: '"neue-haas-unica", sans-serif',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          zIndex: 99,
          pointerEvents: 'none'
        }}
      >
        Scroll to explore
      </div>
            {/* Chinese text section */}
            <div style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              gap: '0px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-end'
            }}>
              {/* Title */}
              <h2 style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                fontSize: '40px',
                fontWeight: '300',
                letterSpacing: '0.2em',
                color: '#FFF',
                margin: 0
              }}>
                展覽簡介
              </h2>
              
              {/* Description text */}
              <div style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                fontSize: '28px',
                lineHeight: '1.4',
                fontWeight: '300',
                letterSpacing: '0.1em',
                color: '#FFF'
              }}>
                 <span style={{marginTop: "-7px"}}></span>︽易經︾無疑是中國文化遺產之精髓。<br/>儒家與道家思想同樣根植於此<br/>在中国人古代哲学、科学、国家治术，<br/>甚至當代生活也從中獲得靈感。<br/>甚至卜卦文獻和哲學論述，︽易經︾<br/>在中國人生活方方面面留下不可<br/>磨滅的影響。
              </div>
            </div>

            {/* English section - aligned to bottom */}
            <div style={{width: '640px', maxWidth: "calc(50vw - 60px)"}}>
              {/* Title */}
              <div 
                className="neue-haas-unica"
                style={{
                fontSize: '24px',
                marginBottom: '20px',
                lineHeight: '1.2',
                color: '#FFF',
                fontWeight: 'bold'
              }}>
                Exhibition Introduction
              </div>

              {/* English description */}
              <div 
                className="neue-haas-unica"
                style={{
                fontSize: '20px',
                lineHeight: '1.2',
                color: '#FFF',
                textAlign: 'left',
                fontWeight: '300'
              }}>
The <em>Yijing</em>, or <em>Book of Changes</em>, is unquestionably a quintessential Chinese cultural heritage. Confucianism and Daoism have their common roots here. Ancient Chinese philosophy, science, and statecraft and even modern living have all drawn inspiration from it. As a classical divination document and a philosophical exposition, this book has an enduring imprint on many aspects of
Chinese life.              </div>
            </div>
          </div>

          {/* Section Break 0 */}
          <div 
            className="h-screen relative flex-shrink-0" 
            style={{ 
              width: "80vw", 
              zIndex: 1, 
              backgroundColor: "#000",
              overflow: "hidden",
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px"
            }}
          >
            <div 
              ref={(el) => { sectionBreakRefs.current[0] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "140vw",
                height: "100%",
                backgroundImage: "url('/images/exhibition/ss1-landing.webp')",
                backgroundSize: "auto 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 1 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#DDDDDD", zIndex: 2, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 60px 60px' }}>
              {/* Vertical line on the right */}
              <div style={{
                position: 'absolute',
                top: '80px',
                right: '30px',
                width: '1px',
                height: 'calc(100vh - 160px)',
                backgroundColor: '#000'
              }}></div>
              {/* Chinese text section */}
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: '0px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-end'
              }}>
                {/* Title */}
                <h3 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '24px',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  color: '#000',
                  marginLeft: "20px"
                }}>
                  策展人的話
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.25',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#000'
                }}>
                  <span style={{ marginTop: '-40px', display: 'inline-block' }}>﹁</span>我們希望這次展覽帶來的<br />沉浸體驗能為抽象的<br />概念賦予意義，並激發<br />人們思考：當地球持續暖化、<br />人工智能科技不斷重塑<br />人類經驗之際，如何仍能<br />從傳統智慧中獲得禆益。﹂
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '640px', maxWidth: "calc(50vw - 60px)"}}>
                {/* Title */}
                <div style={{
                  fontSize: '24px',
                  marginBottom: '15px',
                  lineHeight: '1.2',
                  color: '#000',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }}>
                  Curatorial Statement
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#000',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal'
                }}>
                  We hope the immersive experiences of this show will allow abstract ideas to take on meaning and inspire thoughts about the continued relevance of ancient wisdom, as we face a warming planet and advances of AI technologies that increasingly reshape the human experience.
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { 
                  innerSectionRefs.current[0] = el;
                  imageParallaxRefs.current[0] = el;
                }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  borderRadius: "40px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundImage: "url('/images/exhibition/ss1a.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "left center",
                  backgroundRepeat: "no-repeat"
                }}
              >
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[1] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss1b.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}
              >
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[2] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss1c.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}
              >
              </div>
            </div>
          </div>

          {/* Section Break 1 */}
          <div 
            className="h-screen relative flex-shrink-0" 
            style={{ 
              width: "80vw", 
              zIndex: 2, 
              overflow: "hidden",
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px",
              marginLeft: "-40px"
            }}
          >
            <div 
              ref={(el) => { sectionBreakRefs.current[1] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "140vw",
                height: "100%",
                backgroundImage: "url('/images/exhibition/ss2-landing.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 2 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#330E07", zIndex: 3, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 60px 60px' }}>
              {/* Vertical line on the right */}
              <div style={{
                position: 'absolute',
                top: '80px',
                right: '30px',
                width: '1px',
                height: 'calc(100vh - 160px)',
                backgroundColor: '#FFF'
              }}></div>
              {/* Chinese text section */}
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: '0px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-end'
              }}>
                {/* Title */}
                 <h3 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '24px',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  color: '#FFF'
                }}>
                  藝術家的話
                </h3>
                <h2 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  letterSpacing: '0.2em',
                  color: '#FFF',
                  lineHeight: '1',
                  marginLeft: "20px",
                  marginTop: '-15px'
                }}>
                  ︽中國牆城︾系列
                </h2>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '16px',
                  lineHeight: '1.4',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  color: '#FFF'
                }}>
                  自我在五十年前初次接觸︽易經︾起，它就如<br/>一位睿智的的老朋友，每當我求問指點，它總能<br/>揭示我內心深處的想法，指引我如何在困境中<br/>求變。當中的玄妙箴言，曾在我人生的關鍵<br/>時刻發揮重要作用，例如當年我在猶豫是否該<br/>離開美國荷里活的工作，開啟創作生涯新篇章時，<br/>我占得﹁旅﹂︵第五十六卦︶，使我下定決心<br/>回港，成為旅遊攝影師。<br/><br/>
                  多年來，我不斷嘗試以視覺形式呈現︽易經︾<br/>的精髓，卻始終未能如願。直至<span style={{textCombineUpright: 'all'}}>20</span><span style={{textCombineUpright: 'all'}}>07</span>年我在編輯<br/>︽中國探秘︾一書時，終於找到完美載體｜<br/>我在中國各地拍攝的斑駁牆垣特寫細節。歲月<br/>洗禮下，風雨在最基礎的建築上雕琢出繁複紋理<br/>與迷人質感。︽易經︾六十四卦源自古老二元<br/>體系，其形態極具當代感，與電腦時代遙相呼應。<br/>這些影像在視覺與概念上與大自然的抽象表現<br/>完美契合，成就了了︽中國牆城︾系列。
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '800px', maxWidth: "calc(50vw - 60px)"}}>
                {/* Title */}
                <div style={{
                  fontSize: '18px',
                  marginBottom: '15px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: '300',
                  fontStyle: 'normal'
                }}>
                 Artist Statement<br/>
                  <span style={{fontWeight: 'bold'}}>The Great Walls of China Series</span>
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal'
                }}>
Ever since I was introduced to the book 50 years ago, the Yijing has been the wise old friend who always revealed the secrets in the shadows of my heart and offered sagely guidance on how to bring about changes to my predicament each time I sought its advice. Its cryptic council had been crucial at critical turning points in my life, e.g. I drew "The Wanderer" (hexagram 56) when I was weighing the decision to quit my Hollywood corporate life and seek a new creative path, which subsequently led to my return to Hong Kong and eventually becoming a travel photographer.<br/><br/>
Over the years, I failed repeatedly to create a visual representation of the Yijing. Then in 2007, when I was editing my China Revealed book, I finally found the perfect vehicle in a series of closeup details of weather-beaten walls that I had photographed from all over the country. Over time, the elements had created intricate patterns and wonderful textures on man's most basic structure. The strikingly contemporary form of the 64 hexagrams from an ancient binary system, with its echoes of the computer age, combined well with the abstract expressionist creations of nature both visually and conceptually, and the result is The Great Walls of China series.                </div>
              </div>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[3] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss2a.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[4] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss2b.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[5] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss2c.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[6] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss2d.webp')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}>
              </div>
            </div>
          </div>



          {/* Section 3 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#000000", zIndex: 4, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 60px 60px' }}>
              {/* Vertical line on the right */}
              <div style={{
                position: 'absolute',
                top: '80px',
                right: '30px',
                width: '1px',
                height: 'calc(100vh - 160px)',
                backgroundColor: '#FFF'
              }}></div>
              {/* Chinese text section */}
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: '0px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-end'
              }}>
                {/* Title */}
                <h3 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '24px',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  color: '#FFF',
                  marginLeft: "20px"
                }}>
                 易經占卜
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.25',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#FFF'
                }}>
                  誠心冥想並提出一個具體的<br/>問題或處境，然後點擊<br/>按鈕六次以拋擲虛擬銅錢。<br />卦象及其爻變將自動<br/>計算生成。完成六次拋擲後，<br/>系統將顯示對應的卦象。
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '640px', maxWidth: "calc(50vw - 60px)"}}>
                {/* Title */}
                <div style={{
                  fontSize: '24px',
                  marginBottom: '10px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }}>
                  Divination with the <em>Book of Changes</em>
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal'
                }}>
Meditate a question or a situation for the oracle to comment on and click the button six times to throw the virtual coins. The hexagram and its changing lines are calculated automatically. After throwing the coins six times, the relevant hexagram will be displayed.                </div>
              </div>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[7] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss3a.webp')",
                  backgroundSize: "100% auto",
                  backgroundPosition: "center",
                  borderRadius: "40px"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[8] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss3b.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "40px"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[9] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss3c.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "40px"
                }}>
              </div>
            </div>
          </div>

          {/* Section Break 3 */}
          <div 
            className="h-screen relative flex-shrink-0" 
            style={{ 
              width: "80vw", 
              zIndex: 4, 
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px"
            }}
          >
            <div 
              ref={(el) => { sectionBreakRefs.current[3] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "140vw",
                height: "100%",
                backgroundImage: "url('/images/exhibition/ss3-landing.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 4 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#1A3B45", zIndex: 5, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 60px 60px' }}>
              {/* Vertical line on the right */}
              <div style={{
                position: 'absolute',
                top: '80px',
                right: '30px',
                width: '1px',
                height: 'calc(100vh - 160px)',
                backgroundColor: '#FFF'
              }}></div>
              {/* Chinese text section */}
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: '0px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-end'
              }}>
                {/* Title */}
                 <h3 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '24px',
                  fontWeight: '300',
                  letterSpacing: '0.2em',
                  color: '#FFF'
                }}>
                  藝術家的話
                </h3>
                <h2 style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  letterSpacing: '0.2em',
                  color: '#FFF',
                  lineHeight: '1',
                  marginLeft: "20px",
                  marginTop: "-15px"
                }}>
                  ︽觀靜錄︾系列
                </h2>

                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '24px',
                  lineHeight: '1.4',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#FFF'
                }}>
                  <span style={{marginTop: "-7px"}}></span>︽易經︾的核心概念是﹁天人合一﹂。<br /><span style={{marginTop: "-7px"}}></span>︽觀靜錄︾系列收錄了無人機尚<br/>未普及之前的航拍作品，以及其他<br/>人跡罕至的遼闊景觀，嘗試以此攝影<br/>作品集詮釋此概念。過去四十年來，<br/>我有幸踏遍世界邊陲進行拍攝，<br/>我希望能與新一代的觀眾分享這批<br/>作品，讓他們欣賞地球的壯麗風采，<br/>進而踏上更新與保護的道路，而非<br/>重進而自我毀滅的覆轍。
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '640px', maxWidth: "calc(50vw - 60px)"}}>
                {/* Title */}
                <div style={{
                  fontSize: '18px',
                  marginBottom: '15px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: '300',
                  fontStyle: 'normal'
                }}>
Artist Statement<br/>
                 
                  <span style={{fontWeight: 'bold'}}>Glimpses of Silence</span>
                </div>
                {/* English description */}
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal'
                }}>
The central concept of the Book of Changes is "Heaven and Humanity as One". Glimpses of Silence, a collection of pre-drone aerials and other vast landscapes with minimal human presence, is an attempt at elucidating that idea. It is my hope that by sharing these images from the far corners of our world that I've had the privilege to experience and photograph over the past 40 years, viewers from new generations will appreciate the splendour of our magnificent planet and embark on a path of renewal and preservation instead of following in our footsteps of self-destruction.
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[10] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1748/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/exhibition/ss4a.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "40px"
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
