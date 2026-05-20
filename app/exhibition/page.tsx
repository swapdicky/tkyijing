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
      '/images/ss1-landing.jpg',
      '/images/ss1a.jpg',
      '/images/ss1b.jpg',
      '/images/ss1c.jpg',
      '/images/ss2-landing.jpg',
      '/images/exhibition-frame-02.jpg'
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
      
      // Update all inner-sections with gradual scaling
      innerSectionRefs.current.forEach((innerEl, index) => {
        if (!innerEl) return;
        
        // Remove transition for smooth animation
        innerEl.style.transition = 'none';
        
        const rect = innerEl.getBoundingClientRect();
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        const baseHeight = window.innerHeight - 150;
        const targetHeight = window.innerHeight;
        
        // Gradual scale zone - elements scale up as they approach center
        const scaleZone = 1200; // Distance over which scaling happens (increased for smoother transition)
        
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
      
      // Update parallax effect every 2 frames for better performance
      frameCount++;
      if (frameCount % 2 === 0) {
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
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                color: '#FFF',
                margin: 0
              }}>
                易經
              </h2>
              
              {/* Description text */}
              <div style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                fontSize: '24px',
                lineHeight: '1.4',
                fontWeight: 'normal',
                letterSpacing: '0.1em',
                color: '#FFF'
              }}>
                ︽易經︾是一本古代卜辭書，在中國<br />哲學歷史中具有重要地位。﹁易﹂<br />是變化的意思，︽易經︾呈現一個恆常<br />變動的世界。它代表了古人嘗試闡釋<br />人類在宇宙中定位的看法，強調<br />天人之間的互動與合一。作為傳統卜卦<br />文獻和哲學論述，︽易經︾在中國人<br />生活方方面面留下不可磨滅的影響。
              </div>
            </div>

            {/* English section - aligned to bottom */}
            <div>
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
                Yijing — Book of Changes
              </div>

              {/* English description */}
              <div style={{
                fontSize: '20px',
                lineHeight: '1.2',
                color: '#FFF',
                textAlign: 'left',
                fontFamily: '"neue-haas-unica", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal'
              }}>
                The Book of Changes is an ancient divination text that holds great significance in the history of Chinese philosophy. The term yi refers to the "ease" and "simplicity" of observing natural phenomena. Contrary to its common perception as a fortune-telling manual, this book represents an early effort to explain the Chinese view of humanity's place in the universe, which is defined by the interaction between the cosmos and the human self.
              </div>
            </div>
          </div>

          {/* Section Break 0 */}
          <div 
            className="h-screen relative flex-shrink-0" 
            style={{ 
              width: "100vw", 
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
                backgroundImage: "url('/images/ss1-landing.jpg')",
                backgroundSize: "auto 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 1 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#DDDDDD", zIndex: 2, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 80px 60px' }}>
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
                  marginLeft: "10px"
                }}>
                  策展人的話
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.2',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#000'
                }}>
                  <span style={{ marginTop: '-40px', display: 'inline-block' }}>﹁</span>我們希望這次展覽帶來的<br />沉浸體驗能為抽象的<br />概念賦予意義，並激發<br />人們思考：當地球持續暖化、<br />人工智能科技不斷重塑<br />人類經驗之際，如何仍能<br />從傳統智慧中獲得禆益。﹂
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div>
                {/* Title */}
                <div style={{
                  fontSize: '24px',
                  marginBottom: '10px',
                  lineHeight: '1.2',
                  color: '#000',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }}>
                  Curator’s Note
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#000',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400,
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
                  backgroundImage: "url('/images/ss1a.jpg')",
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
                  backgroundImage: "url('/images/ss1b.jpg')",
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
                  backgroundImage: "url('/images/ss1c.jpg')",
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
              width: "100vw", 
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
                backgroundImage: "url('/images/ss2-landing.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 2 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#330E07", zIndex: 3, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 80px 60px' }}>
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
                  marginLeft: "10px"
                }}>
                  策展人的話
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.2',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#FFF'
                }}>
                  <span style={{ marginTop: '-40px', display: 'inline-block' }}>﹁</span>我們希望這次展覽帶來的<br />沉浸體驗能為抽象的<br />概念賦予意義，並激發<br />人們思考：當地球持續暖化、<br />人工智能科技不斷重塑<br />人類經驗之際，如何仍能<br />從傳統智慧中獲得禆益。﹂
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div>
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
                  Curator's Note
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}>
                  We hope the immersive experiences of this show will allow abstract ideas to take on meaning and inspire thoughts about the continued relevance of ancient wisdom, as we face a warming planet and advances of AI technologies that increasingly reshape the human experience.
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[3] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/ss2a.jpg')",
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
                  backgroundImage: "url('/images/ss2b.jpg')",
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
                  backgroundImage: "url('/images/ss2c.jpg')",
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
                  backgroundImage: "url('/images/ss2d.jpg')",
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}>
              </div>
            </div>
          </div>

          {/* Section Break 2 */}
          <div 
            className="h-screen relative flex-shrink-0" 
            style={{ 
              width: "100vw", 
              zIndex: 3, 
              backgroundColor: "#FFFFFF",
              overflow: "hidden",
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px"
            }}
          >
            <div 
              ref={(el) => { sectionBreakRefs.current[2] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "140vw",
                height: "100%",
                backgroundImage: "url('/images/exhibition-frame-02.jpg')",
                backgroundSize: "auto 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 3 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#000000", zIndex: 4, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 80px 60px' }}>
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
                  marginLeft: "10px"
                }}>
                  策展人的話
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.2',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#FFF'
                }}>
                  <span style={{ marginTop: '-40px', display: 'inline-block' }}>﹁</span>我們希望這次展覽帶來的<br />沉浸體驗能為抽象的<br />概念賦予意義，並激發<br />人們思考：當地球持續暖化、<br />人工智能科技不斷重塑<br />人類經驗之際，如何仍能<br />從傳統智慧中獲得禆益。﹂
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div>
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
                  Curator's Note
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}>
                  We hope the immersive experiences of this show will allow abstract ideas to take on meaning and inspire thoughts about the continued relevance of ancient wisdom, as we face a warming planet and advances of AI technologies that increasingly reshape the human experience.
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "30px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[7] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/ss3a.jpg')",
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
                  backgroundImage: "url('/images/ss3b.jpg')",
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
                  backgroundImage: "url('/images/ss3c.jpg')",
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
              width: "100vw", 
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
                backgroundImage: "url('/images/ss3-landing.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}>
            </div>
          </div>

          {/* Section 4 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#1A3B45", zIndex: 5, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px", paddingRight: "80px" }}>
            <div className="h-screen relative" style={{ width: "calc(50vw + 60px)", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: ' 80px 60px 80px 60px' }}>
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
                  marginLeft: "10px"
                }}>
                  策展人的話
                </h3>
                
                {/* Description text */}
                <div style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  fontSize: '36px',
                  lineHeight: '1.2',
                  fontWeight: '300',
                  letterSpacing: '0.1em',
                  color: '#FFF'
                }}>
                  <span style={{ marginTop: '-40px', display: 'inline-block' }}>﹁</span>我們希望這次展覽帶來的<br />沉浸體驗能為抽象的<br />概念賦予意義，並激發<br />人們思考：當地球持續暖化、<br />人工智能科技不斷重塑<br />人類經驗之際，如何仍能<br />從傳統智慧中獲得禆益。﹂
                </div>
              </div>

              {/* English section - aligned to bottom */}
              <div>
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
                  Curator's Note
                </div>

                {/* English description */}
                <div style={{
                  fontSize: '20px',
                  lineHeight: '1.2',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: '"neue-haas-unica", sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}>
                  We hope the immersive experiences of this show will allow abstract ideas to take on meaning and inspire thoughts about the continued relevance of ancient wisdom, as we face a warming planet and advances of AI technologies that increasingly reshape the human experience.
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
                  backgroundImage: "url('/images/ss4a.jpg')",
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
