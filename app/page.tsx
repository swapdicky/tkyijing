"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import Header from "@/components/Header";
import { yijing } from "@/data/homepage";

// I Ching hexagram mapping (1-64) to binary representation
// 0 = yin (broken line), 1 = yang (solid line)
// Lines are ordered from bottom to top
const hexagramMap: { [key: number]: string } = {
  1: '111111', 2: '000000', 3: '010001', 4: '100010', 5: '010111', 6: '111010',
  7: '000010', 8: '010000', 9: '110111', 10: '111011', 11: '000111', 12: '111000',
  13: '111101', 14: '101111', 15: '000100', 16: '001000', 17: '011001', 18: '100110',
  19: '000011', 20: '110000', 21: '101001', 22: '100101', 23: '100000', 24: '000001',
  25: '111001', 26: '100111', 27: '100001', 28: '011110', 29: '010010', 30: '101101',
  31: '011100', 32: '001110', 33: '111100', 34: '001111', 35: '101000', 36: '000101',
  37: '110101', 38: '101011', 39: '010100', 40: '001010', 41: '100011', 42: '110001',
  43: '011111', 44: '111110', 45: '011000', 46: '000110', 47: '011010', 48: '010110',
  49: '011101', 50: '101110', 51: '001001', 52: '100100', 53: '110100', 54: '001011',
  55: '001101', 56: '101100', 57: '110110', 58: '011011', 59: '110010', 60: '010011',
  61: '110011', 62: '100100', 63: '010101', 64: '101010'
};

// Function to generate hexagram SVG based on number (1-64)
const generateHexagramSVG = (number: number, color: string = 'black') => {
  // Get the hexagram pattern from the map
  const pattern = hexagramMap[number] || '111111';
  const lines = pattern.split(''); // Lines from bottom to top
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      {lines.map((bit, index) => {
        const y = 8 + (index * 11); // Start from top, 11px spacing between lines
        if (bit === '1') {
          // Yang line (solid) - full width
          return <rect key={index} x="4" y={y} width="72" height="7" fill={color} />;
        } else {
          // Yin line (broken) - two segments with gap in middle
          return (
            <g key={index}>
              <rect x="4" y={y} width="33" height="7" fill={color} />
              <rect x="43" y={y} width="33" height="7" fill={color} />
            </g>
          );
        }
      })}
    </svg>
  );
};

export default function Home() {
  const moduleRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<"overview" | "explore">("explore");
  const [zoom, setZoom] = useState<150 | 100 | 50>(150);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMousePaused, setIsMousePaused] = useState(false);
  const [archivedBoxes, setArchivedBoxes] = useState<Set<number>>(new Set());
  const [isLanding, setIsLanding] = useState(true); // Disable mouse effect on landing
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = center, 1 = left-center, 2 = slide off
  const [hideOverlay, setHideOverlay] = useState(false); // Hide overlay after box slides off
  const scrollLockRef = useRef(false);
  const [previousZoom, setPreviousZoom] = useState<150 | 100 | 50>(150); // Remember zoom before opening panel
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state
  const preMenuZoomRef = useRef<150 | 100 | 50>(150); // Remember zoom before opening menu
  const titleH3Ref = useRef<HTMLHeadingElement>(null);
  const [titleH3Tall, setTitleH3Tall] = useState(false);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // Custom order for 8x8 grid
  const gridOrder = [
    2, 23, 8, 20, 16, 35, 45, 12,
    15, 52, 39, 53, 62, 56, 31, 33,
    7, 4, 29, 59, 40, 64, 47, 6,
    46, 18, 48, 57, 32, 50, 28, 44,
    24, 27, 3, 42, 51, 21, 17, 25,
    36, 22, 63, 37, 55, 30, 49, 13,
    19, 41, 60, 61, 54, 38, 58, 10,
    11, 26, 5, 9, 34, 14, 43, 1
  ];

  useEffect(() => {
    if (moduleRef.current) {
      gsap.set(moduleRef.current, {
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, []);

  // Wheel effect for info box transformation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !scrollLockRef.current) {
        scrollLockRef.current = true;
        
        setScrollProgress(prev => {
          if (prev === 0) {
            // First scroll: move to left-center and hide footer
            console.log('First scroll: moving to left-center');
            setIsLanding(false); // Hide footer immediately on first scroll
            return 1;
          } else if (prev === 1) {
            // Second scroll: slide off to the left
            console.log('Second scroll: sliding off');
            // Wait for box to slide off screen, then hide overlay
            setTimeout(() => {
              setHideOverlay(true); // Hide overlay after box is off screen
            }, 800); // Wait for slide animation to complete
            return 2;
          }
          return prev;
        });
        
        // Prevent multiple triggers - wait for animation to complete
        setTimeout(() => {
          scrollLockRef.current = false;
        }, 1500); // Match the transition duration
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = 0;
    const throttleDelay = 50;

    const handleMouseMove = (e: MouseEvent) => {
      if (!moduleRef.current || mode === "overview" || isMousePaused || isLanding || !hideOverlay) return;

      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      lastTime = currentTime;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!moduleRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        const moveX = -xPercent * 50;
        const moveY = -yPercent * 80;

        gsap.to(moduleRef.current, {
          x: `${moveX}vw`,
          y: `${moveY}vw`,
          duration: zoom === 150 ? 12 : 6,
          ease: "power1.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mode, isMousePaused, isLanding, hideOverlay]);

  useEffect(() => {
    if (!moduleRef.current || isPanelOpen) return;

    // Calculate border width to maintain visual 1px at different scales
    // At scale 1 (150%), use 1px
    // At scale 0.57 (100%), use 1/0.57 ≈ 1.75px
    // At scale 0.228 (50%), use 1/0.228 ≈ 4.4px
    let borderWidth = 1;
    let scale = 1;
    
    if (zoom === 150) {
      borderWidth = 1;
      scale = 1;
    } else if (zoom === 100) {
      scale = 0.57;
      borderWidth = 1 / scale;
    } else if (zoom === 50) {
      scale = 0.57 * 0.5;
      borderWidth = 1.5;
    }

    gridItemsRef.current.forEach((item, index) => {
      if (item) {
        // Archived boxes get 2px visual thickness
        const isArchived = archivedBoxes.has(index + 1);
        const finalWidth = isArchived ? borderWidth * 2 : borderWidth;
        
        gsap.to(item, {
          borderWidth: `${finalWidth}px`,
          duration: 1.5,
          ease: "power3.inOut",
        });
      }
    });

    if (mode === "overview") {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
      gsap.killTweensOf(moduleRef.current);
      
      let scaleValue = 0.57 * (zoom / 100);
      let targetX = 0;
      let targetY = 0;
      
      if (zoom === 50) {
        scaleValue = 0.57 * 0.5;
        targetX = 0;
        targetY = 0;
        // Reset scroll to top to prevent jump when switching from 100% (180vh)
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (zoom === 100) {
        // Reduce scale to add 20px margin on each side
        const scaleAdjustment = (window.innerWidth - 40) / window.innerWidth;
        scaleValue = 0.57 * scaleAdjustment;
        
        // Scroll to center of the page (middle of 8x8 grid)
        targetX = 0;
        targetY = 15;
        
        // Page is min-h-[180vh], so middle = (180vh - 100vh) / 2 = 40vh
        // Use fixed calculation to avoid timing issues with scrollHeight not yet updated
        const viewportHeight = window.innerHeight;
        const scrollToMiddle = viewportHeight * 0.4; // 40vh
        
        // Scroll on next frame to ensure layout has updated to 180vh
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollToMiddle, behavior: 'instant' });
        });
      }
      
      gsap.to(moduleRef.current, {
        x: targetX,
        y: targetY,
        xPercent: -50,
        yPercent: -50,
        scale: scaleValue,
        duration: 1.5,
        ease: "power3.inOut",
      });
    } else {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf(moduleRef.current);
      
      if (zoom === 50) {
        gsap.to(moduleRef.current, {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(moduleRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut",
        });
      }
    }
  }, [mode, zoom, isPanelOpen, archivedBoxes]);

  useEffect(() => {
    if (zoom === 150) {
      setMode("explore");
    } else {
      setMode("overview");
    }
  }, [zoom]);

  // Handle menu open/close - center grid on box number 32
  useEffect(() => {
    if (!moduleRef.current) return;
    
    if (isMenuOpen) {
      // Menu opened - pause mouse effect and center on box number 32
      setIsMousePaused(true);
      
      // If not at 150%, remember current zoom and switch to 150% first
      if (zoom !== 150) {
        preMenuZoomRef.current = zoom;
        setMode("explore");
        setZoom(150);
        return; // Effect will re-run after zoom changes
      }
      
      // Find the index of box number 32 in gridOrder
      const index = gridOrder.indexOf(32);
      const row = Math.floor(index / 8);
      const col = index % 8;
      
      gsap.killTweensOf(moduleRef.current);
      
      const vwToPx = window.innerWidth / 100;
      const boxSizeVw = 20;
      
      // Calculate position to center box 32 in the full 100vw viewport
      const boxCenterXVw = (col - 3.5) * boxSizeVw;
      const boxCenterYVw = (row - 3.5) * boxSizeVw;
      
      const finalX = -boxCenterXVw * vwToPx;
      const finalY = -boxCenterYVw * vwToPx;
      
      gsap.to(moduleRef.current, {
        x: finalX,
        y: finalY,
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut",
        overwrite: true
      });
    } else if (!isPanelOpen) {
      // Menu closed - resume mouse effect (only if panel is not open)
      setIsMousePaused(false);
      
      // Restore previous zoom if it was changed by menu opening
      if (preMenuZoomRef.current !== 150) {
        const restoreZoom = preMenuZoomRef.current;
        preMenuZoomRef.current = 150; // Reset
        setMode("overview");
        setZoom(restoreZoom);
      }
    }
  }, [isMenuOpen, zoom, isPanelOpen]);

  // Measure title h3 height when selectedBox changes
  useEffect(() => {
    if (!titleH3Ref.current) return;
    const height = titleH3Ref.current.offsetHeight;
    setTitleH3Tall(height > 55);
  }, [selectedBox, isPanelOpen]);

  const toggleMode = () => {
    if (mode === "explore") {
      setMode("overview");
      setZoom(100);
    } else {
      setMode("explore");
      setZoom(150);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Logo at top left - stays in place */}
      <div style={{
        position: 'fixed',
        top: scrollProgress >= 1 ? '30px' : '50%',
        left: scrollProgress >= 1 ? '30px' : '50%',
        width: '36px',
        height: '36px',
        transform: scrollProgress >= 1 ? 'none' : 'translate(calc(-262px + 30px), calc(-360px + 30px))',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 111,
        opacity: hideOverlay ? 0 : 1,
        pointerEvents: 'none'
      }}>
        <img src="/images/logo-icon.svg" alt="Logo" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Scroll to explore text - shows before overlay hides */}
      <div
        style={{
          position: 'fixed',
          right: '1px',
          top: '50%',
          transform: 'rotate(90deg)',
          transformOrigin: 'center center',
          fontSize: '12px',
          color: '#888',
          fontFamily: '"neue-haas-unica", sans-serif',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          zIndex: 99,
          pointerEvents: 'none',
          opacity: !hideOverlay ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        Scroll to explore
      </div>
      
      {/* Move over to explore text - shows after overlay hides and zoom is 150% */}
      <div
        style={{
          position: 'fixed',
          right: '-12px',
          top: '50%',
          transform: 'rotate(90deg)',
          transformOrigin: 'center center',
          fontSize: '12px',
          color: '#888',
          fontFamily: '"neue-haas-unica", sans-serif',
          fontWeight: 400,
          whiteSpace: 'nowrap',
          zIndex: 20,
          pointerEvents: 'none',
          opacity: (hideOverlay && zoom === 150) ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        Move over to explore
      </div>


      {/* Fixed overlay layer */}
      <div 
        className="fixed top-0 left-0 flex items-center justify-center"
        style={{ 
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 110,
          opacity: hideOverlay ? 0 : 1,
          pointerEvents: hideOverlay ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-out'
        }}
      >
        {/* White info box */}
        <div 
          style={{
            width: scrollProgress >= 1 ? '50vw' : '524px',
            height: scrollProgress >= 1 ? '100vh' : '720px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: scrollProgress === 2 ? '-50vw' : (scrollProgress === 1 ? '0' : '50%'),
            transform: scrollProgress >= 1 ? 'translateY(-50%)' : 'translate(-50%, -50%)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: scrollProgress >= 1 ? '30px 30px 40px 30px' : '40px 30px',
            borderRadius: scrollProgress >= 1 ? '0' : '15px'
          }}
        >

          {/* Chinese text section - aligned to top right */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'flex-end'
          }}>
            {/* Chinese Title Line 1 - 易經 */}
            <div style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: scrollProgress === 0 ? '24px' : '36px',
              lineHeight: '1',
              fontWeight: '400',
              letterSpacing: '0.2em',
              color: '#000',
              margin: 0,
              transition: 'font-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              易經：
            </div>
            
            {/* Chinese Title Line 2 - 昕聞鮑皓昕攝影藝術 */}
            <div style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: scrollProgress === 0 ? '24px' : '36px',
              lineHeight: '1.25',
              fontWeight: '300',
              letterSpacing: '0.2em',
              color: '#000',
              marginLeft: '10px',
              transition: 'font-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              鮑皓昕攝影藝術
            </div>
            
            {/* Chinese Content - Vertical */}
            <div style={{ 
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '18px',
              lineHeight: '1.4',
              fontWeight: '300',
              letterSpacing: '0.1em',
              color: '#000',
              transform: scrollProgress === 0 ? 'scale(.8)':'scale(1.2)',
              transformOrigin: 'right top',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>是次展覽透過香港攝影藝術家鮑皓昕的<br/>
            藝術詮釋，凸顯︽易經︾無盡的關聯性與<br/>
            創造力。鮑皓昕兩個系列作品<br/>
            <span style={{marginTop: '-6px'}}></span>︽中國牆城︾<span style={{marginTop: '-4px'}}></span>和<span style={{marginTop: '-4px'}}></span>︽觀靜錄︾<span style={{marginTop: '-4px'}}></span>，探究文化遺產<br/>
            與藝術創作之間的關係。互動與合一的<br/>
            中國古代哲學概念。這些照片捕捉變化<br/>
            無窮的世界，見證鮑氏對︽易經︾的<br/>
            深刻領悟，藉此擁抱真實自我，飽覽天地<br/>
            之壯麗與奧秘。這是一場視覺盛宴，<br/>
            讓觀眾體會天地造化之中氣的微妙變化，<br/>
            沉思古籍中闡述的﹁天、地、人﹂互動與<br/>
            合一的中國古代哲學概念。


            </div>
          </div>

          {/* English section - aligned to bottom */}
          <div style={{
            width: scrollProgress === 0 ? '100%' : '100%',
            position: 'relative',
            bottom: '0',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {/* English Title */}
            <div style={{ 
              fontSize: scrollProgress === 0 ? '16px' : '18px',
              marginBottom: '10px',
              lineHeight: '1.2',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              transition: 'font-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <span style={{ fontWeight: '500' }}><em>Book of Changes</em>:</span> The Art of Basil Pao
            </div>

            {/* English Content */}
            <div style={{ 
              fontSize: scrollProgress === 0 ? '12px' : '16px',
              lineHeight: '1.2',
              color: '#000',
              textAlign: 'left',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300',
              fontStyle: 'normal',
              transition: 'font-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
The current exhibition highlights the continued relevance of the <em>Book of Changes</em> through the artistic interpretation of Hong Kong photo artist Basil Pao. Two series of his works—<em>The Great Walls of China</em> and <em>Glimpses of Silence</em>—are presented here to explore the relation between heritage and artistic creation. Capturing a world of changing reality and changing appearances, these pictures are the testament to Pao's deep connections to the <em>Book of Changes</em> for embracing the authentic self and beholding the beauty and mystery of the world. The show offers a visual feast for observing the eternal energy and subtleties of change in all-embracing landscapes. It invites contemplation on the interaction and unity of Heaven, Earth, and Humanity-an ancient Chinese philosophical concept presented in the classic.            </div>
          </div>
        </div>
      </div>

      {/* Landing footer */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: 0,
        width: '100%',
        padding: '25px',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'bottom 0.5s ease-out',
        pointerEvents: isLanding ? 'auto' : 'none',
        zIndex: 10,
        paddingTop: '100vh',
        opacity: isLanding ? 1 : 0,
        transitionProperty: 'opacity',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'ease-out',
        backdropFilter: 'blur(10px)'
      }}>
        <img 
          src="/images/TK-logo.svg" 
          alt="Tai Kwun" 
          style={{ height: '60px', width: 'auto' }}
        />
        <img 
          src="/images/HKJC-logo.svg" 
          alt="HKJC" 
          style={{ height: '60px', width: 'auto' }}
        />
      </div>

      <Header isPanelOpen={isPanelOpen} hideOverlay={hideOverlay} onMenuChange={setIsMenuOpen} />
      
      <div className={`w-full ${mode === "overview" ? (zoom === 50 ? "min-h-screen" : "min-h-[180vh]") : "h-screen overflow-hidden"} relative`}>
        <div 
          ref={moduleRef}
          className="grid grid-cols-8 gap-0 absolute top-1/2 left-1/2 w-[160vw]"
          style={{ 
            willChange: "transform",
            transformStyle: "preserve-3d",
            border: zoom === 150 ? '2px solid #000000' : '2px solid #333333'
          }}
        >
          {Array.from({ length: 64 }).map((_, index) => {
            const boxNumber = gridOrder[index];
            return (
            <div
              key={index}
              ref={(el) => { gridItemsRef.current[index] = el; }}
              className={`w-[20vw] h-[20vw] flex-shrink-0 relative group cursor-pointer ${
                selectedBox === boxNumber ? 'active' : ''
              } ${archivedBoxes.has(boxNumber) && selectedBox !== boxNumber ? 'archive-active' : ''}`}
              style={{ 
                borderWidth: archivedBoxes.has(boxNumber) ? '2px' : '1px',
                borderStyle: 'solid', 
                borderColor: zoom === 150 ? '#000000' : '#333333',
                backgroundColor: 'transparent'
              }}
              onClick={(e) => {
                // Disable click when menu is open
                if (isMenuOpen) return;
                
                setSelectedBox(boxNumber);
                setIsPanelOpen(true);
                setIsMousePaused(true);
                
                // Add to archived boxes immediately when clicked
                setArchivedBoxes(prev => {
                  const newSet = new Set(prev);
                  newSet.add(boxNumber);
                  return newSet;
                });
                
                // Save current zoom level before switching
                setPreviousZoom(zoom);
                
                // Switch to explore mode FIRST so page becomes 100vh before scrolling
                // Use flushSync to force React to re-render synchronously before scrollTo
                // This prevents jump when at 100% (page is 180vh, scroll is mid)
                flushSync(() => {
                  setMode("explore");
                  setZoom(150);
                });
                
                // Now page is 100vh, scroll to top and disable scrolling
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.body.style.overflow = 'hidden';
                
                if (!moduleRef.current) return;
                
                // Calculate position to center this box
                const row = Math.floor(index / 8);
                const col = index % 8;
                
                gsap.killTweensOf(moduleRef.current);
                
                const targetScale = 1; // 150%
                const vwToPx = window.innerWidth / 100;
                const vhToPx = window.innerHeight / 100;
                const boxSizeVw = 20;
                
                // Calculate position to center the clicked box in the left space
                const boxCenterXVw = (col - 3.5) * boxSizeVw;
                const boxCenterYVw = (row - 3.5) * boxSizeVw;
                
                // Brown box width: 100vh * 349 / 1024, positioned at 50%
                // Left space = 50vw - (brown box width / 2)
                const brownBoxWidth = window.innerHeight * 349 / 1024;
                const leftSpaceWidth = (50 * vwToPx) - (brownBoxWidth / 2);
                const leftSpaceOffset = -(50 * vwToPx) + (leftSpaceWidth / 2);
                const finalX = -boxCenterXVw * vwToPx + leftSpaceOffset;
                // Y uses vw units but needs to center in vh viewport
                const finalY = -boxCenterYVw * vwToPx;
                
                gsap.to(moduleRef.current, {
                  x: finalX,
                  y: finalY,
                  xPercent: -50,
                  yPercent: -50,
                  scale: targetScale,
                  duration: 1.5,
                  ease: "power3.inOut",
                  overwrite: true
                });
              }}
            >
              <div 
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  backgroundImage: `url('/images/Hex64_SVG/hex-${String(boxNumber).padStart(2, '0')}.svg')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '50%',
                  opacity: selectedBox === boxNumber ? 1 : archivedBoxes.has(boxNumber) ? 1 : 0.4,
                  filter: 'invert(1) brightness(2)',
                }}
                onMouseEnter={(e) => {
                  if (selectedBox !== boxNumber && !archivedBoxes.has(boxNumber)) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBox !== boxNumber && !archivedBoxes.has(boxNumber)) {
                    e.currentTarget.style.opacity = '0.4';
                  }
                }}
              />
              <span 
                className="absolute top-2 left-2 neue-haas-unica font-light" 
                style={{ 
                  fontSize: '30px',
                  color: mode === 'overview' && !isPanelOpen ? '#888888' : '#000000'
                }}
              >
                {String(boxNumber).padStart(2, '0')}
              </span>
            </div>
            );
          })}
        </div>

        {/* Brown image box */}
        <div 
          className="fixed top-0 z-40 transition-all duration-700 ease-out"
          style={{ 
            pointerEvents: 'auto',
            left: isPanelOpen ? '50%' : 'calc(100% + 300px)',
            transform: isPanelOpen ? 'translateX(-50%)' : 'translateX(0)',
            backgroundColor: '#8B4513',
            height: '100vh',
            width: 'calc(100vh * 349 / 1024)',
            backgroundImage: 'url(/images/banner.jpg)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* White info panel */}
        <div 
          className="fixed top-0 h-screen bg-white border-l border-[#888888] transition-all duration-700 ease-out"
          onWheel={(e) => {
            if (scrollContentRef.current) {
              scrollContentRef.current.scrollTop += e.deltaY;
            }
          }}
          style={{ 
            pointerEvents: 'auto',
            right: 0,
            zIndex: 110,
            transform: isPanelOpen ? 'translateX(0)' : 'translateX(100%)',
            width: isPanelOpen ? 'calc(50% - (100vh * 349 / 1024 / 2))' : '550px'
          }}
        >
          <div className="h-full overflow-hidden text-black">
            <button
              onClick={() => {
                setIsPanelOpen(false);
                setIsMousePaused(false);
                setSelectedBox(null);
                // Restore previous zoom level
                setZoom(previousZoom);
                setMode(previousZoom === 150 ? "explore" : "overview");
              }}
              className="fixed top-[20px] right-[20px] w-[50px] h-[50px] z-[70] flex items-center justify-center text-black transition-colors"
              style={{ 
                fontSize: '32px',
                lineHeight: '1'
              }}
            >
              ×
            </button>
            
            <div className="px-12 min-h-screen flex flex-col relative" style={{ paddingTop: '7.5rem', paddingBottom: '280px' }}>
              <div className="flex items-start justify-between mb-8">
                <div className="text-[24px] font-medium leading-none neue-haas-unica">{selectedBox || '--'}</div>
                <div className="flex gap-3 items-start">
                  {selectedBox && yijing[selectedBox - 1] && (
                    <>
                      <div className="text-[16px] tracking-wide relative font-medium" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.8em' }}><span style={{marginTop: '-6px'}}></span>
                        {yijing[selectedBox - 1].meaningContent.split('\n').map((line, i) => (
                          <span key={i}>{line}{i < yijing[selectedBox - 1].meaningContent.split('\n').length - 1 && <br/>}</span>
                        ))}
                      </div>
                      <div className="text-[20px] tracking-wide relative font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em'}}>
                        {yijing[selectedBox - 1].meaning.split('\n').map((line, i) => (
                          <span key={i}>{line}{i < yijing[selectedBox - 1].meaning.split('\n').length - 1 && <br/>}</span>
                        ))}
                      </div>

                      <div className="text-[16px] tracking-wide relative font-medium" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.8em' }}>
                        {yijing[selectedBox - 1].messageContent.split('\n').map((line, i) => (
                          <span key={i}>{line}{i < yijing[selectedBox - 1].messageContent.split('\n').length - 1 && <br/>}</span>
                        ))}
                      </div>                  
                      <div className="text-[20px] tracking-wide relative font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em' }}>
                        {yijing[selectedBox - 1].message.split('\n').map((line, i) => (
                          <span key={i}>{line}{i < yijing[selectedBox - 1].message.split('\n').length - 1 && <br/>}</span>
                        ))}
                      </div>
                      <h2 className="text-[56px] font-bold leading-none ml-4" style={{ writingMode: 'vertical-rl' }}>{yijing[selectedBox - 1].titletc}</h2>
                    </>
                  )}
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 px-12 pb-12">
                <div className="flex items-end gap-8">
                  <div className="w-28 flex-shrink-0">
                    <div className="w-20 h-20 mb-6 flex items-center justify-center">
                      {selectedBox && generateHexagramSVG(selectedBox)}
                    </div>
                    {selectedBox && yijing[selectedBox - 1] && (
                      <>
                        <div className="flex gap-2 mb-4">
                          <p className="leading-tight text-[16px]" style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}>{yijing[selectedBox - 1].abovetc}</p>
                          <p className="leading-tight text-[16px]" style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}>{yijing[selectedBox - 1].belowtc}</p>
                        </div>
                        
                        <div className="text-[13px]">
                          <div className="mb-4">
                            <p className="font-normal leading-tight neue-haas-unica">
                              above <em>{yijing[selectedBox - 1].above}</em>
                            </p>
                            <p className="font-normal neue-haas-unica leading-tight italic">{yijing[selectedBox - 1].abovetxt.split('\n').map((line, i) => (
                              <span key={i}>{line}{i < yijing[selectedBox - 1].abovetxt.split('\n').length - 1 && <br/>}</span>
                            ))}</p>
                          </div>
                          <div>
                            <p className="font-normal leading-tight neue-haas-unica">
                              below <em>{yijing[selectedBox - 1].below}</em>
                            </p>
                            <p className="font-normal neue-haas-unica leading-tight italic">{yijing[selectedBox - 1].belowtxt.split('\n').map((line, i) => (
                              <span key={i}>{line}{i < yijing[selectedBox - 1].belowtxt.split('\n').length - 1 && <br/>}</span>
                            ))}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex-1">
                    {selectedBox && yijing[selectedBox - 1] && (
                      <>
                        <h3 ref={titleH3Ref} className="text-[22px] font-normal leading-tight mb-4 neue-haas-unica">
                          {yijing[selectedBox - 1].title.split('\n').map((line, i, arr) => (
                            <span key={i}>
                              {i === 0 && line.includes('/') ? (
                                <>
                                  {line.split('/').map((part, j) => (
                                    j === 0 ? <em key={j}>{part}</em> : <><span key={j}> /</span><br/>{part}</>
                                  ))}
                                </>
                              ) : line}
                              {i < arr.length - 1 && i > 0 && <br/>}
                            </span>
                          ))}
                        </h3>
                        
                        <div ref={scrollContentRef} className="space-y-4 custom-scrollbar" style={{ height: titleH3Tall ? '170px' : '200px', overflowY: 'auto', paddingRight: '12px' }}>
                          <div>
                            <h4 className="font-bold text-[12px] mb-1 neue-haas-unica" style={{ lineHeight: '20px' }}>The Judgement</h4>
                            <p className="text-black text-[14px] neue-haas-unica font-normal" style={{ lineHeight: '20px' }}>
                              {yijing[selectedBox - 1].thejudgement.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < yijing[selectedBox - 1].thejudgement.split('\n').length - 1 && <br />}</span>
                              ))}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-bold text-[12px] mb-1 neue-haas-unica" style={{ lineHeight: '20px' }}>The Image</h4>
                            <p className="text-black text-[14px] font-normal neue-haas-unica" style={{ lineHeight: '20px' }}>
                              {yijing[selectedBox - 1].theimage.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < yijing[selectedBox - 1].theimage.split('\n').length - 1 && <br />}</span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center z-20"
          style={{
            opacity: isPanelOpen || isMenuOpen ? 0 : (hideOverlay ? 1 : 0),
            pointerEvents: isPanelOpen || isMenuOpen || !hideOverlay ? 'none' : 'auto',
            transition: isPanelOpen || isMenuOpen ? 'opacity 0s' : (hideOverlay ? 'opacity 0.5s ease-out 1s' : 'opacity 0.5s ease-out'),
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            height: '50px'
          }}
        >
          {/* Left section - Explore/Overview (175px) */}
          <div className="flex items-center" style={{ width: '175px', paddingLeft: '20px', position: 'relative' }}>
            <img 
              src={mode === "explore" ? "/images/icon-view1.svg" : "/images/icon-view2.svg"} 
              alt="View mode"
              style={{ width: '24px', height: '24px', display: 'block' }}
            />
            <button
              onClick={toggleMode}
              className="text-[18px] neue-haas-unica flex items-center justify-center"
              style={{ color: '#FFFFFF', fontWeight: '400', transform: 'translateY(1px)', position: 'absolute', left: '0', right: '0', textAlign: 'center',
                paddingLeft: '45px' }}
            >
              {mode === "explore" ? "Explore" : "Overview"}
            </button>
          </div>

          {/* Center separator */}
          <div style={{ width: '2px', height: '50px', backgroundColor: '#333333' }}></div>

          {/* Right section - Zoom controls (175px) */}
          <div className="flex items-center justify-center gap-3 neue-haas-unica text-[18px] font-normal" style={{ width: '175px', color: '#FFFFFF' }}>
            <button
              onClick={() => {
                if (zoom === 50) setZoom(100);
                else if (zoom === 100) setZoom(150);
              }}
              className="flex items-center justify-center"
              disabled={zoom === 150}
              style={{ opacity: zoom === 150 ? 0.3 : 1 }}
            >
              <img 
                src="/images/plus-icon.svg" 
                alt="Zoom in"
                style={{ width: '20px', height: '20px', display: 'block' }}
              />
            </button>
            <span className="min-w-[3rem] text-center flex items-center justify-center" style={{ lineHeight: '1', transform: 'translateY(1px)' }}>
              {zoom}%
            </span>
            <button
              onClick={() => {
                if (zoom === 150) setZoom(100);
                else if (zoom === 100) {
                  // Scroll to top first to prevent jump when page shrinks from 180vh to 100vh
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  setZoom(50);
                }
              }}
              className="flex items-center justify-center"
              disabled={zoom === 50}
              style={{ opacity: zoom === 50 ? 0.3 : 1 }}
            >
              <img 
                src="/images/minus-icon.svg" 
                alt="Zoom out"
                style={{ width: '20px', height: '20px', display: 'block' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
