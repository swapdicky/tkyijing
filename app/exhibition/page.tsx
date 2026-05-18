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
        
        // Add smooth transition for snap effect
        innerEl.style.transition = 'height 0.4s ease-out, margin 0.4s ease-out';
        
        const rect = innerEl.getBoundingClientRect();
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        const baseHeight = window.innerHeight - 150;
        const targetHeight = window.innerHeight;
        
        // Snap to full size when within zone, otherwise stay at base size
        const snapZone = 200; // 200px zone for snapping to full height
        
        if (index === closestIndex && distanceFromCenter < snapZone) {
          // Snap to full height
          innerEl.style.height = `${targetHeight}px`;
          
          // Adjust margin to compensate for padding
          const heightIncrease = targetHeight - baseHeight;
          const marginTop = heightIncrease * 0.6;
          const marginBottom = heightIncrease * 0.4;
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
      // Smooth lerp animation with natural easing
      const distance = Math.abs(targetX - currentX);
      // Use adaptive lerp: faster when far, slower when close
      const adaptiveLerp = distance > 100 ? 0.12 : 0.08;
      currentX += (targetX - currentX) * adaptiveLerp;
      
      gsap.set(sections, { x: currentX });
      setScrollX(currentX);
      
      // Update parallax effect every 2 frames for better performance
      frameCount++;
      if (frameCount % 2 === 0) {
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

          {/* Section 1 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#DDDDDD", zIndex: 2, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden", marginLeft: "-40px" }}>
            <div className="flex items-center justify-center" style={{ backgroundColor: "#CCCCCC", width: "900px" }}>
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

          {/* Section 2 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#330E07", zIndex: 3, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center" style={{ backgroundColor: "#220905", width: "900px" }}>
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

          {/* Section 3 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#000000", zIndex: 4, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center" style={{ width: "900px" }}>
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

          {/* Section 4 */}
          <div className="h-screen flex relative flex-shrink-0" style={{ backgroundColor: "#1A3B45", zIndex: 5, borderTopLeftRadius: "40px", borderBottomLeftRadius: "40px", overflow: "hidden" }}>
            <div className="flex items-center justify-center" style={{ width: "900px" }}>
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
