"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import gsap from "gsap";

export default function Exhibition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile-first to prevent scroll blocking
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
    let hasTimedOut = false;

    const markLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages && !hasTimedOut) {
        setIsLoaded(true);
      }
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = src;
    });

    // Fallback: show page after 3s even if images haven't loaded
    const timeout = setTimeout(() => {
      hasTimedOut = true;
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Track window height for responsive font sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Reset scroll position when page loads
    window.scrollTo(0, 0);
    
    // Reset body overflow (home page may have set it to hidden)
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    
    const checkMobile = () => setIsMobile(window.innerWidth < 980 || window.innerHeight > window.innerWidth);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll-based image pan effect
  useEffect(() => {
    if (!isMobile) return;

    const handleMobileScroll = () => {
      imageParallaxRefs.current.forEach((imgEl, index) => {
        if (!imgEl) return;
        
        const rect = imgEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress: 0 when entering from bottom, 1 when leaving from top
        const elementHeight = rect.height;
        const startPosition = viewportHeight; // Bottom edge of viewport
        const endPosition = -elementHeight; // Top edge (element completely off screen)
        
        const totalDistance = startPosition - endPosition;
        const currentDistance = startPosition - rect.top;
        const progress = Math.min(1, Math.max(0, currentDistance / totalDistance));
        
        // ss4a.webp (index 10) needs 200% multiplier to show full background
        const isSs4a = index === 10;
        const multiplier = isSs4a ? 200 : 100;
        
        // Pan from 0% (left) to 100% (right) as element moves through viewport
        const bgPositionX = progress * multiplier;
        
        imgEl.style.backgroundPosition = `${bgPositionX}% center`;
      });
    };

    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    handleMobileScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleMobileScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return;
    if (isMobile) return;

    const container = containerRef.current;
    const sections = sectionsRef.current;
    let currentX = 0;
    let targetX = 0;
    let animationFrame: number;

    const handleWheel = (e: WheelEvent) => {
      // Double check mobile status to prevent blocking scroll on mobile
      if (isMobile) return;
      if (!isLoaded) return;
      
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
      const baseHeight = window.innerHeight - 150; // Account for paddingTop (90px) + paddingBottom (60px)
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
        
        // Adjust margin to center images vertically when scaled
        const heightIncrease = currentHeight - baseHeight;
        const marginTop = heightIncrease * 0.2;
        innerEl.style.marginTop = `-${marginTop}px`;
      });
    };

    const updateImageParallax = () => {
      const viewportWidth = window.innerWidth;
      
      imageParallaxRefs.current.forEach((imgEl, index) => {
        if (!imgEl) return;
        
        const rect = imgEl.getBoundingClientRect();
        
        // ss4a.webp (index 10) is the last element - use vertical scroll on mobile
        const isSs4a = index === 10;
        
        let progress;
        if (isMobile && isSs4a) {
          // Calculate progress based on vertical position: 0 when entering from bottom, 1 when reaching top
          const elementHeight = rect.height;
          const viewportHeight = window.innerHeight;
          const startPosition = viewportHeight; // Bottom edge of viewport
          const endPosition = -elementHeight; // Top edge (element completely off screen)
          
          const totalDistance = startPosition - endPosition;
          const currentDistance = startPosition - rect.top;
          progress = Math.min(1, Math.max(0, currentDistance / totalDistance));
        } else {
          // Calculate progress: 0 when entering from right, 1 when leaving from left
          const elementWidth = rect.width;
          const startPosition = viewportWidth; // Right edge of viewport
          const endPosition = -elementWidth; // Left edge (element completely off screen)
          
          const totalDistance = startPosition - endPosition;
          const currentDistance = startPosition - rect.left;
          progress = Math.min(1, Math.max(0, currentDistance / totalDistance));
        }
        
        // ss4a.webp needs 200% multiplier on mobile to show full background
        const multiplier = (isMobile && isSs4a) ? 200 : 100;
        
        // Pan smoothly from 0% (left) to 100% (right) as element moves across viewport
        const bgPositionX = progress * multiplier;
        
        imgEl.style.backgroundPosition = `${bgPositionX}% center`;
      });
    };

    const animate = () => {
      if (!isLoaded) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      // Minimal lerp for slight smoothness
      currentX += (targetX - currentX) * 0.35;
      
      gsap.set(sections, { x: currentX });
      setScrollX(currentX);
      
      // Check if scrolled to the end (within 50px threshold)
      const totalWidth = sections.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = totalWidth - viewportWidth;
      if (maxScroll > 0 && Math.abs(currentX + maxScroll) < 50) {
        setShouldOpenMenu(true);
      } else {
        setShouldOpenMenu(false);
      }
      
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

    // Add wheel event listener immediately
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, isLoaded]);

  return (
    <>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: isLoaded ? 0 : 1,
      transition: 'opacity 1s ease-out',
      zIndex: 9999,
      pointerEvents: 'none'
    }}></div>
    <div
      className="bg-black"
      style={{
        height: isMobile ? 'auto' : '100vh',
        overflow: isMobile ? 'visible' : 'hidden',
        minHeight: isMobile ? '100vh' : 'auto'
      }}
    >
      <Header forceOpenMenu={shouldOpenMenu} />
      
      <div ref={containerRef} style={{ 
        position: isMobile ? 'relative' : 'fixed',
        top: isMobile ? 0 : 0,
        left: 0,
        width: '100vw',
        height: isMobile ? 'auto' : '100vh',
        overflow: isMobile ? 'visible' : 'hidden'
      }}>
        <div 
          ref={sectionsRef}
          style={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            height: isMobile ? 'auto' : '100vh'
          }}
        >
          {/* Landing */}
          <div className="yj-padding-section ex-section-inner" style={{ 
            minHeight: isMobile ? '100vh' : '100vh',
            minWidth: isMobile ? '100%' : '50vw',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
      <div className="text-gray fw-400 yj-en-12"
         style={{ display: isMobile ? 'none' : 'block', position: 'absolute',
          left: '1px',
          top: '50%',
          transform: 'rotate(90deg)',
          transformOrigin: 'center center',
          
          fontFamily: '"neue-haas-unica", sans-serif',
          
          whiteSpace: 'nowrap',
          zIndex: 99,
          pointerEvents: 'none' }}
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
              <h2 className="text-white fw-600 yj-cn-40 ex-ml-15 yj-lh-10"  style={{ writingMode: 'vertical-rl',
                textOrientation: 'upright',
                
                letterSpacing: '0.2em' }}>
                展覽簡介
              </h2>
              
              {/* Description text */}
              <div className="text-white fw-300 yj-cn-28 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
                textOrientation: 'upright',
                letterSpacing: '0.1em',
                marginBottom: isMobile ? "120px" : 0  }}>
                 <span className="mt-n-12"></span>︽易經︾<span className="mt-n-12"></span>無疑是中國文化遺產<br/>之精髓。儒家與道家思想同樣<br/>根植於此。是次展覽呈獻<br/>香港攝影藝術家鮑皓昕兩個<br/>系列作品：︽中國牆城︾<br/>和︽觀靜錄︾，探究文化遺產<br/>與藝術創作之間的關係。
              </div>
            </div>

            {/* English section - aligned to bottom */}
              <div style={{width: '100%'}}>
              {/* Title */}
              <div 
                className="neue-haas-unica text-white fw-500 yj-en-24 yj-lh-12"
                 style={{ marginBottom: '20px' }}>
                Exhibition Introduction
              </div>

              {/* English description */}
              <div 
                className="neue-haas-unica text-white fw-300 yj-en-20 yj-lh-12"
                 style={{
                textAlign: 'left' }}>
The <em>Book of Changes</em> is unquestionably a quintessential Chinese cultural heritage. Two series of works by Hong Kong photo artist Basil Pao—<em>The Great Walls of China</em> and <em>Glimpses of Silence</em>—are presented here to explore the relation between heritage and artistic creation.

</div>
            </div>
          </div>

          {/* Section Break 0 */}
          <div
            className="h-screen relative flex-shrink-0"
            style={{
              width: isMobile ? '100%' : '80vw',
              backgroundColor: "#000",
              overflow: "hidden",
              position: isMobile ? 'sticky' : 'relative',
              top: isMobile ? 0 : 'auto'
            }}
          >
            <div
              ref={(el) => { sectionBreakRefs.current[0] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: isMobile ? "50%" : "0",
                width: isMobile ? "100%" : "130vw",
                transform: isMobile ? "translateX(-50%)" : "translateX(-30.5083%)",
                height: "100%",
                backgroundImage: `url('/images/exhibition/ss1-landing.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 1 */}
          <div className="ex-section radius-15" style={{ minHeight: isMobile ? 'auto' : '100vh', position: 'relative', flexShrink: 0, backgroundColor: "#DDDDDD", overflow: "hidden" }}>

            <div style={{ paddingTop: isMobile ? '20px' : '90px', paddingBottom: isMobile ? '20px' : '60px', paddingLeft: isMobile ? '15px' : '60px', paddingRight: isMobile ? '15px' : '0px', gap: isMobile ? '20px' : '30px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', flex: isMobile ? 'none' : 1 }}>
              <div 
                ref={(el) => { 
                  innerSectionRefs.current[0] = el;
                  imageParallaxRefs.current[0] = el;
                }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  overflow: "hidden",
                  position: "relative",
                  backgroundImage: "url('/images/exhibition/ss1a.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "left center",
                  backgroundRepeat: "no-repeat"
                }}
              >
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[1] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss1b.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden"
                }}
              >
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[2] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss1c.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden"
                }}
              >
              </div>
            </div>
          </div>

          {/* Section Break 1 */}
          <div
            className="h-screen relative flex-shrink-0"
            style={{
              width: isMobile ? '100%' : '80vw',
              overflow: "hidden",
              marginLeft: isMobile ? '0' : "-40px",
              position: isMobile ? 'sticky' : 'relative',
              top: isMobile ? 0 : 'auto'
            }}
          >
            <div
              ref={(el) => { sectionBreakRefs.current[1] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: isMobile ? "50%" : 0,
                width: isMobile ? "100%" : "130vw",
                transform: isMobile ? "translateX(-50%)" : "translateX(0%)",
                height: "100%",
                backgroundImage: "url('/images/exhibition/ss2-landing.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 2 */}
          <div className="ex-section radius-15" style={{ minHeight: isMobile ? 'auto' : '100vh', position: 'relative', flexShrink: 0, backgroundColor: "#330E07",  overflow: "hidden" }}>
            <div className="yj-padding-section ex-section-inner" style={{  minHeight: isMobile ? 'auto' : '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Vertical line on the right */}
              <div className="right-30 ex-vertical-line"></div>

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
                 <h3 className="text-white fw-300 yj-cn-24"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  
                  letterSpacing: '0.2em' }}>
                  藝術家的話
                </h3>
                <h2 className="text-white fw-600 yj-cn-36 ex-ml-15"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  
                  letterSpacing: '0.2em',
                  
                  lineHeight: '1' }}>
                  <span className="mt-n-14"></span>︽中國牆城︾<span className="mt-n-14"></span>系列
                </h2>
                
                {/* Description text */}
                <div className="text-white fw-300 yj-cn-18 yj-lh-14 yj-lh-13-m yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  fontFamily: '"Noto Serif TC", serif',
                  letterSpacing: '0.2em',
                  marginBottom: isMobile ? "120px" : 0 ,
              height: isMobile ? '530px' : 'auto'}}>
                  {isMobile ? (
                    <>
自我在五十年前初次接觸︽易經︾起，它就如一位睿智的<br/>
老朋友，每當我求問指點，它總能揭示我內心深處的想法，<br/>
指引我如何在困境中求變。當中的玄妙箴言，曾在我人生的<br/>
關鍵時刻發揮重要作用，例如當年我在猶豫是否該離開<br/>
美國荷里活的工作，開啟創作生涯新篇章時，我占得﹁旅﹂<br/>
<span className="mt-n-6"></span>︵第五十六卦︶，使我下定決心回港，成為旅遊攝影師。
<div className="ex-ml-15"></div>
多年來，我不斷嘗試以視覺形式呈現︽易經︾的精髓，<br/>
卻始終未能如願。直至<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>2007</span>年我在編輯︽中國探秘︾一書時，<br/>
終於找到完美載體－我在中國各地拍攝的斑駁牆垣特寫細節。<br/>
歲月洗禮下，風雨在最基礎的建築上雕琢出繁複紋理與<br/>
迷人質感。︽易經︾六十四卦源自古老二元體系，其形態<br/>
極具當代感，與電腦時代遙相呼應。這些影像在視覺與概念上<br/>
與大自然的抽象表現完美契合，成就了︽中國牆城︾系列。
                    </>
                  ) : (
                    <>
                      自我在五十年前初次接觸︽易經︾起，它就如<br/>一位睿智的的老朋友，每當我求問指點，它總能<br/>揭示我內心深處的想法，指引我如何在困境中<br/>求變。當中的玄妙箴言，曾在我人生的關鍵<br/>時刻發揮重要作用，例如當年我在猶豫是否該<br/>離開美國荷里活的工作，開啟創作生涯新篇章時，<br/>我占得﹁旅﹂︵第五十六卦︶，使我下定決心<br/>回港，成為旅遊攝影師。<br/><br/>
                      多年來，我不斷嘗試以視覺形式呈現︽易經︾<br/>的精髓，卻始終未能如願。直至<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>2007</span>我在編輯<br/><span className="mt-n-6"></span>︽中國探秘︾一書時，終於找到完美載體<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>—</span><br/>我在中國各地拍攝的斑駁牆垣特寫細節。歲月<br/>洗禮下，風雨在最基礎的建築上雕琢出繁複紋理<br/>與迷人質感。︽易經︾六十四卦源自古老二元<br/>體系，其形態極具當代感，與電腦時代遙相呼應。<br/>這些影像在視覺與概念上與大自然的抽象表現<br/>完美契合，成就了︽中國牆城︾系列。
                    </>
                  )}
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '100%'}}>
                {/* Title */}
                <div className="text-white fw-300 yj-en-18 yj-lh-12"  style={{ marginBottom: '15px',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
                 Artist Statement<br/>
                  <span className="fw-500"><em>The Great Walls of China</em> Series</span>
                </div>

                {/* English description */}
                <div className="text-white fw-300 yj-en-14 yj-lh-12"  style={{
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
Ever since I was introduced to the book 50 years ago, the <em>Yijing</em> has been the wise old friend who always revealed the secrets in the shadows of my heart and offered sagely guidance on how to bring about changes to my predicament each time I sought its advice. Its cryptic council had been crucial at critical turning points in my life, e.g. I drew "The Wanderer" (hexagram 56) when I was weighing the decision to quit my Hollywood corporate life and seek a new creative path, which subsequently led to my return to Hong Kong and eventually becoming a travel photographer.<br/><br/>
Over the years, I failed repeatedly to create a visual representation of the <em>Yijing</em>. Then in 2007, when I was editing my <em>China Revealed</em> book, I finally found the perfect vehicle in a series of closeup details of weather-beaten walls that I had photographed from all over the country. Over time, the elements had created intricate patterns and wonderful textures on man's most basic structure. The strikingly contemporary form of the 64 hexagrams from an ancient binary system, with its echoes of the computer age, combined well with the abstract expressionist creations of nature both visually and conceptually, and the result is <em>The Great Walls of China</em> series.                </div>
              </div>
            </div>
            <div style={{ paddingTop: isMobile ? '30px' : '90px', paddingBottom: isMobile ? '20px' : '60px', paddingLeft: isMobile ? '15px' : '30px', paddingRight: isMobile ? '15px' : '30px', gap: isMobile ? '20px' : '30px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', flex: isMobile ? 'none' : 1 }}>
              <div 
                ref={(el) => { innerSectionRefs.current[3] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss2a.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[4] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss2b.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[5] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss2c.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[6] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss2d.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
            </div>
          </div>



          {/* Section 3 */}
          <div className="ex-section radius-15" style={{ minHeight: isMobile ? 'auto' : '100vh', position: 'relative', flexShrink: 0, backgroundColor: "#000000", overflow: "hidden" , marginTop: isMobile ? '-40px' : '',paddingTop: isMobile ? '25px' : '', zIndex: isMobile ? '1' : '2' }}>
            <div className="yj-padding-section ex-section-inner" style={{  minHeight: isMobile ? 'auto' : '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Vertical line on the right */}
              <div className="right-30 ex-vertical-line"></div>

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
                <h3 className="text-white fw-600 yj-cn-36 ex-ml-15"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '0.2em' }}>
                 <span className="mt-n-12"></span>︽易經︾<span className="mt-n-12"></span>占卜
                </h3>
                
                {/* Description text */}
                <div className="text-white fw-300 yj-cn-24 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',

                  
                  letterSpacing: '0.1em',
                  marginBottom: isMobile ? "120px" : 0 ,
              height: isMobile ? '420px' : 'auto' }}>
                  人類對預知未來的渴求，可被視為在複雜<br/>
                  世道中駕馭變化的一種嘗試，以掌握生命，<br/>
                  使它充滿意義。<div className="ex-ml-15"></div>


                  據史實記載，古人使用蓍草與︽易經︾<br/>
                  六十四卦作占卜。卜卦過程需要分出蓍草<br/>
                  計算數值以定每一爻︵連線<span style={{writingMode: 'horizontal-tb', display: 'inline-block', transform: 'rotate(-180deg)', transformOrigin: 'center', margin: '0 -2px', letterSpacing: '-1px',fontSize:"20px"}}>—</span>或<span style={{writingMode: 'horizontal-tb', display: 'inline-block', transform: 'rotate(-180deg)', transformOrigin: 'center', margin: '0 -2px', letterSpacing: '-1px'}}>- -</span>斷線︶，<br/>
                  然後重覆此過程六次，得出完整的一卦。後來，<br/>
                  金錢卦逐漸普及，並沿襲至今。<div className="ex-ml-15"></div>


                  隨著數碼科技突破，今時今日在網上<br/>
                  進行︽易經︾占卜僅需點擊虛擬銅錢六次，<br/>
                  便能算出完整的一卦。
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '100%'}}>
                {/* Title */}
                <div className="text-white fw-500 yj-en-18 yj-lh-12"  style={{ marginBottom: '10px',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
                  Divination with the <em>Book of Changes</em>
                </div>

                {/* English description */}
                <div className="text-white fw-300 yj-en-14 yj-lh-12"  style={{
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
The human desire to know the future can be viewed as an attempt to navigate the changes of our complicated world and to make life manageable and meaningful. <br/><br/>
Historical accounts show a common use of yarrow stalk divination with the hexagrams in the <em>Book of Changes</em> to interpret the future. This involved the manipulation of yarrow stalks to assign a numerical value that determined the nature of each line (solid — or broken – –). The procedure was repeated six times to create the full hexagram. Later, the throwing of Chinese coins became a popular method of divination, which is still used today.<br/><br/>
Nowadays, with the advance of digital technologies, an online consultation of the <em>Book of Changes</em> can simply involve throwing or clicking virtual coins six times to create a full hexagram.                </div>
              </div>
            </div>
            <div style={{ paddingTop: isMobile ? '30px' : '90px', paddingBottom: isMobile ? '20px' : '60px', paddingLeft: isMobile ? '15px' : '30px', paddingRight: isMobile ? '15px' : '30px', gap: isMobile ? '20px' : '30px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', flex: isMobile ? 'none' : 1 }}>
              <div 
                ref={(el) => { innerSectionRefs.current[7] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss3a.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[8] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss3b.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[9] = el; }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: isMobile ? 'auto' : 'calc(100vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss3c.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                      overflow: "hidden"
                }}>
              </div>
            </div>
          </div>

          {/* Section Break 3 */}
          <div
            className="h-screen relative flex-shrink-0"
            style={{
              width: isMobile ? '100%' : '80vw',
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
              marginLeft: isMobile ? '0' : "-40px",
              position: isMobile ? 'sticky' : 'relative',
              top: isMobile ? 0 : 'auto'
            }}
          >
            <div
              ref={(el) => { sectionBreakRefs.current[3] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: isMobile ? "50%" : 0,
                width: isMobile ? "100%" : "130vw",
                transform: isMobile ? "translateX(-50%)" : "translateX(0%)",
                height: "100%",
                backgroundImage: "url('/images/exhibition/ss3-landing.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 4 */}
          <div className="ex-section radius-15" style={{ minHeight: isMobile ? 'auto' : '100vh', position: 'relative', flexShrink: 0, backgroundColor: "#1A3B45",  overflow: "hidden",borderBottomLeftRadius: isMobile ? '0' : '', borderBottomRightRadius: isMobile ? '0' : '' }}>
            <div className="yj-padding-section ex-section-inner" style={{  minHeight: isMobile ? 'auto' : '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Vertical line on the right */}
              <div className="right-30 ex-vertical-line"></div>
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
                 <h3 className="text-white fw-300 yj-cn-24"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  
                  letterSpacing: '0.2em' }}>
                  藝術家的話
                </h3>
                <h2 className="text-white fw-600 yj-cn-36 ex-ml-15 yj-lh-10"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  
                  letterSpacing: '0.2em'}}>
                  <span className="mt-n-12"></span>︽觀靜錄︾
                </h2>

                
                {/* Description text */}
                <div className="text-white fw-300 yj-cn-24 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '0.1em',
                  marginBottom: isMobile ? "120px" : 0  }}>
                  <span className="mt-n-8"></span>︽易經︾<span className="mt-n-8"></span>的核心概念是﹁天人合一﹂。<br /><span className="mt-n-8"></span>︽觀靜錄︾<span className="mt-n-8"></span>系列收錄了無人機尚<br/>未普及之前的航拍作品，以及其他<br/>人跡罕至的遼闊景觀，嘗試以此攝影<br/>作品集詮釋此概念。過去四十年來，<br/>我有幸踏遍世界邊陲進行拍攝，<br/>我希望能與新一代的觀眾分享這批<br/>作品，讓他們欣賞地球的壯麗風采，<br/>進而踏上更新與保護的道路，而非<br/>重蹈我輩自我毀滅的覆轍。
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div style={{width: '100%'}}>
                {/* Title */}
                <div className="text-white fw-300 yj-en-18 yj-lh-12"  style={{ marginBottom: '15px',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
Artist Statement<br/>
                 
                  <span className="fw-500"><em>Glimpses of Silence</em></span>
                </div>
                {/* English description */}
                <div className="text-white fw-300 yj-en-14 yj-lh-12"  style={{
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  
                  fontStyle: 'normal' }}>
The central concept of the <em>Book of Changes</em> is "Heaven and Humanity as One". <em>Glimpses of Silence</em>, a collection of pre-drone aerials and other vast landscapes with minimal human presence, is an attempt at elucidating that idea. It is my hope that by sharing these images from the far corners of our world that I've had the privilege to experience and photograph over the past 40 years, viewers from new generations will appreciate the splendour of our magnificent planet and embark on a path of renewal and preservation instead of following in our footsteps of self-destruction.
                </div>
              </div>
            </div>
            <div style={{ paddingTop: isMobile ? '0' : '90px', paddingBottom: isMobile ? '60px' : '60px', paddingLeft: isMobile ? '15px' : '30px', paddingRight: isMobile ? '15px' : '30px', gap: isMobile ? '20px' : '30px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', flex: isMobile ? 'none' : 1 }}>
              <div 
                ref={(el) => { 
                  innerSectionRefs.current[10] = el;
                  imageParallaxRefs.current[10] = el;
                }}
                className="flex-shrink-0 radius-15" 
                style={{ 
                  aspectRatio: "1748/874", 
                  height: isMobile ? 'auto' : 'calc(50vh - 140px)',
                  backgroundImage: "url('/images/exhibition/ss4a.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "left center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                  position: "relative"
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
