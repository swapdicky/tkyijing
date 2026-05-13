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

  useEffect(() => {
    if (moduleRef.current) {
      gsap.set(moduleRef.current, {
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = 0;
    const throttleDelay = 50;

    const handleMouseMove = (e: MouseEvent) => {
      if (!moduleRef.current || mode === "overview" || isMousePaused) return;

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
          duration: 2.5,
          ease: "power2.out",
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
  }, [mode, isMousePaused]);

  useEffect(() => {
    if (!moduleRef.current || isPanelOpen) return;

    let borderWidth = 1;
    if (zoom === 150) borderWidth = 1;
    else if (zoom === 100) borderWidth = 2;
    else if (zoom === 50) borderWidth = 4;

    gridItemsRef.current.forEach((item) => {
      if (item) {
        gsap.to(item, {
          borderWidth: `${borderWidth}px`,
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
      if (zoom === 50) {
        scaleValue = 0.57 * 0.4;
      }
      
      gsap.to(moduleRef.current, {
        x: 0,
        y: 0,
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
  }, [mode, zoom, isPanelOpen]);

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
      
      <div className={`w-full ${mode === "overview" ? (zoom === 50 ? "min-h-screen" : "min-h-[200vh]") : "h-screen overflow-hidden"} relative`}>
        <div 
          ref={moduleRef}
          className="grid grid-cols-8 gap-0 absolute top-1/2 left-1/2 w-[176vw]"
          style={{ 
            willChange: "transform",
            transformStyle: "preserve-3d"
          }}
        >
          {Array.from({ length: 64 }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { gridItemsRef.current[index] = el; }}
              className={`w-[22vw] h-[22vw] flex-shrink-0 relative group cursor-pointer ${
                selectedBox === index + 1 ? 'active' : ''
              } ${archivedBoxes.has(index + 1) && selectedBox !== index + 1 ? 'archive-active' : ''}`}
              style={{ 
                borderWidth: selectedBox === index + 1 ? '2px' : archivedBoxes.has(index + 1) ? '2px' : '1px',
                borderStyle: 'solid', 
                borderColor: mode === 'overview' && !isPanelOpen ? (selectedBox === index + 1 ? '#ffffff' : archivedBoxes.has(index + 1) ? 'rgba(255, 255, 255, 0.7)' : '#888888') : '#000000',
                backgroundColor: 'transparent'
              }}
              onClick={(e) => {
                const boxNumber = index + 1;
                setSelectedBox(boxNumber);
                setIsPanelOpen(true);
                setIsMousePaused(true);
                
                // Add to archived boxes immediately when clicked
                setArchivedBoxes(prev => {
                  const newSet = new Set(prev);
                  newSet.add(boxNumber);
                  return newSet;
                });
                
                // Get current zoom level to determine calculation method
                const currentZoom = zoom;
                
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
                  
                  const targetScale = 1; // 150%
                  const vwToPx = window.innerWidth / 100;
                  const vhToPx = window.innerHeight / 100;
                  const boxSizeVw = 22;
                  
                  // Simple calculation: just move to center the clicked box at scale 1
                  // Grid uses vw for sizing, but viewport is 100vh tall
                  const boxCenterXVw = (col - 3.5) * boxSizeVw;
                  const boxCenterYVw = (row - 3.5) * boxSizeVw;
                  
                  const finalX = -boxCenterXVw * vwToPx - 350;
                  // Y uses vw units but needs to center in vh viewport
                  let finalY = -boxCenterYVw * vwToPx;
                  
                  // Special offset for 100% zoom
                  if (currentZoom === 100) {
                    finalY = finalY - (50 * vhToPx);
                  }
                  
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
                  backgroundImage: `url('/images/hex-32.svg')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '50%',
                  opacity: selectedBox === index + 1 ? 1 : archivedBoxes.has(index + 1) ? 0.7 : 0.4,
                }}
                onMouseEnter={(e) => {
                  if (selectedBox !== index + 1) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBox !== index + 1) {
                    const opacity = archivedBoxes.has(index + 1) ? '0.7' : '0.4';
                    e.currentTarget.style.opacity = opacity;
                  }
                }}
              />
              <span 
                className="absolute top-2 left-2 text-[10px] font-mono" 
                style={{ 
                  color: mode === 'overview' && !isPanelOpen ? 'red' : '#000000'
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <div 
          className="fixed top-0 w-[700px] h-screen bg-white border-l border-[#888888] z-40 transition-transform duration-700 ease-out"
          style={{ 
            pointerEvents: 'auto',
            right: 0,
            transform: isPanelOpen ? 'translateX(0)' : 'translateX(100%)'
          }}
        >
          <div className="p-8">
            <button
              onClick={() => {
                setIsPanelOpen(false);
                setIsMousePaused(false);
                setSelectedBox(null);
              }}
              className="absolute top-8 right-8 text-2xl text-black hover:text-gray-600 transition-colors"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-black mb-4">
              Box {selectedBox ? String(selectedBox).padStart(2, '0') : '--'}
            </h2>
            {/* Information content goes here */}
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
