"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Home() {
  const moduleRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<"overview" | "explore">("explore");
  const [zoom, setZoom] = useState<150 | 100 | 50>(150);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMousePaused, setIsMousePaused] = useState(false);
  const [archivedBoxes, setArchivedBoxes] = useState<Set<number>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(true); // Disable mouse effect on landing
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = center, 1 = left-center, 2 = slide off
  const [hideOverlay, setHideOverlay] = useState(false); // Hide overlay after box slides off
  const scrollLockRef = useRef(false);
  const [previousZoom, setPreviousZoom] = useState<150 | 100 | 50>(150); // Remember zoom before opening panel

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
            // First scroll: move to left-center
            console.log('First scroll: moving to left-center');
            return 1;
          } else if (prev === 1) {
            // Second scroll: slide off to the left
            console.log('Second scroll: sliding off');
            // Wait for box to slide off screen, then hide overlay and enable mouse
            setTimeout(() => {
              setHideOverlay(true); // Hide overlay after box is off screen
              setIsLanding(false); // Enable mouse effect
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
      if (!moduleRef.current || mode === "overview" || isMousePaused || isLanding) return;

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
          duration: 4,
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
  }, [mode, isMousePaused, isLanding]);

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
      scale = 0.57 * 0.4;
      borderWidth = 1 / scale;
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
        scaleValue = 0.57 * 0.4;
        targetX = 0;
        targetY = 0;
      } else if (zoom === 100) {
        // Reduce scale to add 20px margin on each side
        const scaleAdjustment = (window.innerWidth - 40) / window.innerWidth;
        scaleValue = 0.57 * scaleAdjustment;
        
        // Scroll to center of the page (middle of 8x8 grid)
        targetX = 0;
        targetY = 15;
        
        // Immediately scroll to middle position without animation
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollToMiddle = (pageHeight - viewportHeight) / 2;
        window.scrollTo({ top: scrollToMiddle, behavior: 'instant' });
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
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Info box content */}
        </div>
      </div>

      {/* Logo placeholder */}
      <div 
        className="fixed z-50 transition-all duration-700 ease-out"
        style={{ 
          width: '215px', 
          height: '36px', 
          backgroundColor: 'red',
          top: '27px',
          left: isPanelOpen ? '20px' : '50%',
          transform: isPanelOpen ? 'translateX(0)' : 'translateX(-50%)'
        }}
      >
        {/* Logo will go here */}
      </div>

      {/* Burger menu button */}
      <button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          if (!isMenuOpen) {
            setIsPanelOpen(false);
          }
        }}
        className="fixed top-[20px] right-[20px] w-[50px] h-[50px] z-[100] flex flex-col items-center justify-center gap-1.5 bg-black hover:bg-gray-800 transition-colors"
      >
        {isMenuOpen ? (
          <span className="text-3xl text-white leading-none">×</span>
        ) : (
          <>
            <span className="w-6 h-1 bg-white"></span>
            <span className="w-6 h-1 bg-white"></span>
            <span className="w-6 h-1 bg-white"></span>
          </>
        )}
      </button>

      {/* Menu panel */}
      <div 
        className="fixed top-0 right-0 w-1/2 h-screen bg-black z-[90] transition-transform duration-700 ease-out"
        style={{ 
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div className="p-12 text-white flex flex-col justify-center h-full">
          <div className="space-y-8">
            <a href="/exhibition" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">展覽Exhibition</h2>
              </div>
            </a>
            <a href="/yijing" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">易經Yijing</h2>
              </div>
            </a>
            <a href="/about" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">關於About</h2>
              </div>
            </a>
            <a href="/creative-team" onClick={() => setIsMenuOpen(false)}>
              <div className="pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">團隊Creative Team</h2>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className={`w-full ${mode === "overview" ? (zoom === 50 ? "min-h-screen" : "min-h-[200vh]") : "h-screen overflow-hidden"} relative`}>
        <div 
          ref={moduleRef}
          className="grid grid-cols-8 gap-0 absolute top-1/2 left-1/2 w-[176vw]"
          style={{ 
            willChange: "transform",
            transformStyle: "preserve-3d"
          }}
        >
          {Array.from({ length: 64 }).map((_, index) => {
            const boxNumber = gridOrder[index];
            return (
            <div
              key={index}
              ref={(el) => { gridItemsRef.current[index] = el; }}
              className={`w-[22vw] h-[22vw] flex-shrink-0 relative group cursor-pointer ${
                selectedBox === boxNumber ? 'active' : ''
              } ${archivedBoxes.has(boxNumber) && selectedBox !== boxNumber ? 'archive-active' : ''}`}
              style={{ 
                borderWidth: archivedBoxes.has(boxNumber) ? '2px' : '1px',
                borderStyle: 'solid', 
                borderColor: mode === 'overview' && !isPanelOpen ? (archivedBoxes.has(boxNumber) ? 'rgba(255, 255, 255, 0.7)' : '#888888') : '#000000',
                backgroundColor: 'transparent'
              }}
              onClick={(e) => {
                setSelectedBox(boxNumber);
                setIsPanelOpen(true);
                setIsMousePaused(true);
                setIsMenuOpen(false);
                
                // Add to archived boxes immediately when clicked
                setArchivedBoxes(prev => {
                  const newSet = new Set(prev);
                  newSet.add(boxNumber);
                  return newSet;
                });
                
                // Save current zoom level before switching
                setPreviousZoom(zoom);
                
                // Scroll to top and disable scrolling
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.body.style.overflow = 'hidden';
                
                // Small delay to ensure scroll completes
                setTimeout(() => {
                  if (!moduleRef.current) return;
                  
                  // Calculate position to center this box
                  const row = Math.floor(index / 8);
                  const col = index % 8;
                  
                  gsap.killTweensOf(moduleRef.current);
                  
                  // Always switch to 150% (explore mode) when clicking
                  setMode("explore");
                  setZoom(150);
                  
                  const targetScale = 1; // 150%
                  const vwToPx = window.innerWidth / 100;
                  const vhToPx = window.innerHeight / 100;
                  const boxSizeVw = 22;
                  
                  // Simple calculation: just move to center the clicked box at scale 1
                  // Grid uses vw for sizing, but viewport is 100vh tall
                  const boxCenterXVw = (col - 3.5) * boxSizeVw;
                  const boxCenterYVw = (row - 3.5) * boxSizeVw;
                  
                  const finalX = -boxCenterXVw * vwToPx - 425;
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
                }, 100);
              }}
            >
              <div 
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  backgroundImage: `url('/images/Hex64_SVG/hex-${String(boxNumber).padStart(2, '0')}.svg')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '50%',
                  opacity: selectedBox === boxNumber ? 1 : archivedBoxes.has(boxNumber) ? 0.7 : 0.4,
                  filter: 'invert(1) brightness(2)',
                }}
                onMouseEnter={(e) => {
                  if (selectedBox !== boxNumber) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBox !== boxNumber) {
                    const opacity = archivedBoxes.has(boxNumber) ? '0.7' : '0.4';
                    e.currentTarget.style.opacity = opacity;
                  }
                }}
              />
              <span 
                className="absolute top-2 left-2 text-[14px] font-mono" 
                style={{ 
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
            width: 'calc(100vh * 349 / 1024)'
          }}
        >
          {/* Image will go here */}
        </div>

        {/* White info panel */}
        <div 
          className="fixed top-0 h-screen bg-white border-l border-[#888888] transition-all duration-700 ease-out"
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
              className="fixed top-[20px] right-[20px] w-[50px] h-[50px] z-[70] flex items-center justify-center text-3xl text-black bg-white border border-black hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
            
            <div className="px-12 pb-20 min-h-screen flex flex-col" style={{ paddingTop: '7.5rem' }}>
              <div className="flex items-start justify-between mb-16">
                <div className="text-[24px] font-bold leading-none">{selectedBox || '--'}</div>
                <div className="flex gap-3 items-start">
                  <div className="text-[14px] tracking-wide relative" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.5em' }}>
                    君子由此領悟，要努力經營籌畫。
                  </div>
                  <div className="text-[14px] tracking-wide relative" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.5em' }}>
                    ︽象傳︾說：雷風相與，恒也。
                  </div>
                  <div className="text-[16px] tracking-wide relative font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.5em' }}>
                    <span className="absolute top-0">象曰</span>：雷風，恒。
                  </div>
                  <div className="text-[14px]  tracking-wide relative" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.5em' }}>
                    ︽象傳︾說：雷風相與，恒也。
                  </div>                  
                  <div className="text-[16px] tracking-wide relative font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', paddingTop: '2.5em' }}>
                    <span className="absolute top-0">恆：</span>亨，無咎，利貞，利有攸往。
                  </div>
                  <h2 className="text-[56px] font-bold leading-none ml-4" style={{ writingMode: 'vertical-rl' }}>恒</h2>
                </div>
              </div>

              <div className="pt-10 mt-auto">
                <div className="flex items-start gap-8">
                  <div className="w-20 flex-shrink-0">
                    <div className="w-20 h-20 mb-6" style={{ backgroundColor: '#EEE' }}>
                      {/* Hexagram image will go here */}
                    </div>
                    <div className="flex gap-1 mb-4 text-[16px]">
                      <p style={{ writingMode: 'vertical-rl' }}>震上</p>
                      <p style={{ writingMode: 'vertical-rl' }}>巽下</p>
                    </div>
                    
                    <div className="text-[13px]">
                      <div className="mb-4">
                        <p className="font-bold mb-1">above Zhen /</p>
                        <p className="text-gray-700">The Arousing,<br/>Thunder</p>
                      </div>
                      <div>
                        <p className="font-bold mb-1">below Xun /</p>
                        <p className="text-gray-700">The Gentle,<br/>Wind</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[22px] font-bold leading-tight mb-8">Heng /<br/>Duration</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[15px] mb-1">The Judgement</h4>
                        <p className="text-black leading-relaxed text-[14px]">
                          Duration. Success. No blame.<br />
                          Perseverance furthers.<br />
                          It furthers one to have somewhere to go.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-[15px] mb-1">The Image</h4>
                        <p className="text-black leading-relaxed text-[14px]">
                          Thunder and wind: the image of Duration.<br />
                          Thus the superior man stands firm<br />
                          And does not change his direction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 transition-opacity duration-500 ${
            isPanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <button
            onClick={toggleMode}
            className="bg-black px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            style={{ color: '#888888' }}
          >
            {mode === "explore" ? "Explore" : "Overview"}
          </button>

          <div className="flex items-center gap-2 bg-black px-4 py-3 rounded-full" style={{ color: '#888888' }}>
            <button
              onClick={() => {
                if (zoom === 50) setZoom(100);
                else if (zoom === 100) setZoom(150);
              }}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors text-lg"
              disabled={zoom === 150}
              style={{ opacity: zoom === 150 ? 0.3 : 1 }}
            >
              +
            </button>
            <span className="text-sm font-mono min-w-[3rem] text-center">
              {zoom}%
            </span>
            <button
              onClick={() => {
                if (zoom === 150) setZoom(100);
                else if (zoom === 100) setZoom(50);
              }}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors text-lg"
              disabled={zoom === 50}
              style={{ opacity: zoom === 50 ? 0.3 : 1 }}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
