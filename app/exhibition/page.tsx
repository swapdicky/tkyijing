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

  // Fade in animation on mount
  useEffect(() => {
    setIsLoaded(true);
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
        
        // Calculate parallax based on element's position relative to viewport
        // When element is at right edge (just entering), start at one position
        // When element is at left edge (leaving), end at another position
        const elementProgress = -rect.left; // How far the element has moved from right
        const bgPositionX = 50 - (elementProgress / 100); // Slow movement as element moves
        
        breakEl.style.backgroundPosition = `${bgPositionX}% center`;
      });
    };

    const updateInnerSectionScale = () => {
      const viewportCenter = window.innerWidth / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;
      
      // Find the inner-section closest to center
      innerSectionRefs.current.forEach((innerEl, index) => {
        if (!innerEl) return;
        
        const rect = innerEl.getBoundingClientRect();
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestIndex = index;
        }
      });
      
      // Update all inner-sections
      innerSectionRefs.current.forEach((innerEl, index) => {
        if (!innerEl) return;
        
        // Add smooth transition
        innerEl.style.transition = 'height 0.3s ease-out, margin 0.3s ease-out';
        
        const rect = innerEl.getBoundingClientRect();
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        // Only scale the closest one
        const baseHeight = window.innerHeight - 150;
        const targetHeight = window.innerHeight; // Target full viewport height
        
        if (index === closestIndex) {
          // Scale based on how close to center - smaller range for faster, more direct transition
          const maxDistance = window.innerWidth / 8; // Shorter range for quicker transition
          const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
          
          // Add hold zone at center - if very close to center, stay at full height
          const holdZone = 100; // 100px zone where it stays at full height
          let currentHeight;
          if (distanceFromCenter < holdZone) {
            currentHeight = targetHeight; // Hold at full height
          } else {
            currentHeight = targetHeight - (normalizedDistance * (targetHeight - baseHeight));
          }
          
          innerEl.style.height = `${currentHeight}px`;
          
          // Adjust margin to compensate for padding when at full height
          // Top padding is 90px, bottom is 60px, so we need asymmetric margins
          const heightIncrease = currentHeight - baseHeight;
          const marginTop = heightIncrease * 0.6; // More margin on top (90/(90+60) = 0.6)
          const marginBottom = heightIncrease * 0.4; // Less margin on bottom (60/(90+60) = 0.4)
          innerEl.style.marginTop = `-${marginTop}px`;
          innerEl.style.marginBottom = `-${marginBottom}px`;
        } else {
          // Keep at base size
          innerEl.style.height = `${baseHeight}px`;
          innerEl.style.marginTop = '0px';
          innerEl.style.marginBottom = '0px';
        }
      });
    };

    const animate = () => {
      // Smooth lerp animation with consistent speed
      currentX += (targetX - currentX) * 0.09;
      
      gsap.set(sections, { x: currentX });
      setScrollX(currentX);
      
      // Update parallax effect every 4 frames to reduce lag
      frameCount++;
      if (frameCount % 4 === 0) {
        updateParallax();
      }
      
      // Update inner section scale every 3 frames for smoother animation
      if (frameCount % 3 === 0) {
        updateInnerSectionScale();
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

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
          {/* Landing - Black */}
          <div className="h-screen flex items-center justify-center bg-black relative" style={{ minWidth: "50vw", zIndex: 1 }}>
            <h2 className="text-6xl font-bold text-white">Landing</h2>
          </div>

          {/* Section Break 0 */}
          <div 
            ref={(el) => { sectionBreakRefs.current[0] = el; }}
            className="h-screen flex items-center justify-center relative flex-shrink-0" 
            style={{ 
              width: "calc(80vw + 40px)", 
              zIndex: 1, 
              marginRight: "-40px", 
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px",
              backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
              backgroundSize: "200%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
          </div>

          {/* Section 1 - Red */}
          <div className="h-screen flex bg-red-500 relative flex-shrink-0" style={{ zIndex: 2, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px" }}>
            <div className="flex items-center justify-center bg-red-700" style={{ width: "900px" }}>
              <h3 className="text-4xl font-bold text-white">Section 1 Intro</h3>
            </div>
            <div className="flex-1 flex items-center" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "70px", gap: "30px" }}>
              <div 
                ref={(el) => { innerSectionRefs.current[0] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "656/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "40px"
                }}
              >
              </div>
              <div 
                ref={(el) => { innerSectionRefs.current[1] = el; }}
                className="flex-shrink-0" 
                style={{ 
                  aspectRatio: "1311/874", 
                  height: "calc(100vh - 150px)",
                  backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                  backgroundSize: "cover",
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
                  backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                  backgroundSize: "cover",
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
            ref={(el) => { sectionBreakRefs.current[1] = el; }}
            className="h-screen flex items-center justify-center relative flex-shrink-0" 
            style={{ 
              width: "calc(80vw + 40px)", 
              zIndex: 1, 
              marginRight: "-40px", 
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px",
              backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
              backgroundSize: "200%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
          </div>

          {/* Section 2 - Blue */}
          <div className="h-screen flex bg-blue-500 relative flex-shrink-0" style={{ zIndex: 3, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center bg-blue-700" style={{ width: "900px" }}>
              <h3 className="text-4xl font-bold text-white">Section 2 Intro</h3>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "70px", gap: "30px" }}>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "1311/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
            </div>
          </div>

          {/* Section Break 2 */}
          <div 
            ref={(el) => { sectionBreakRefs.current[2] = el; }}
            className="h-screen flex items-center justify-center relative flex-shrink-0" 
            style={{ 
              width: "calc(80vw + 40px)", 
              backgroundColor: "#EEE", 
              zIndex: 2, 
              marginRight: "-40px", 
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px",
              backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
              backgroundSize: "200%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
          </div>

          {/* Section 3 - Green */}
          <div className="h-screen flex bg-green-500 relative flex-shrink-0" style={{ zIndex: 4, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center bg-green-700" style={{ width: "900px" }}>
              <h3 className="text-4xl font-bold text-white">Section 3 Intro</h3>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "70px", gap: "30px" }}>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "1311/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
            </div>
          </div>

          {/* Section Break 3 */}
          <div 
            ref={(el) => { sectionBreakRefs.current[3] = el; }}
            className="h-screen flex items-center justify-center relative flex-shrink-0" 
            style={{ 
              width: "calc(80vw + 40px)", 
              backgroundColor: "#EEE", 
              zIndex: 3, 
              marginRight: "-40px", 
              borderTopLeftRadius: "40px", 
              borderBottomLeftRadius: "40px",
              backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
              backgroundSize: "200%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
          </div>

          {/* Section 4 - Purple */}
          <div className="h-screen flex bg-purple-500 relative flex-shrink-0" style={{ zIndex: 5, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center bg-purple-700" style={{ width: "900px" }}>
              <h3 className="text-4xl font-bold text-white">Section 4 Intro</h3>
            </div>
            <div className="flex-1 flex items-start" style={{ paddingTop: "90px", paddingBottom: "60px", paddingLeft: "30px", paddingRight: "70px", gap: "30px" }}>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "1311/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
              <div className="flex-shrink-0" style={{ 
                aspectRatio: "656/874", 
                height: "calc(100vh - 150px)",
                backgroundImage: "url('/images/NZ8_3390-HDR 1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
