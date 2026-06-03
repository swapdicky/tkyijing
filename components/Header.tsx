"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ isPanelOpen = false, hideOverlay = false, onMenuChange, forceOpenMenu = false }: { isPanelOpen?: boolean; hideOverlay?: boolean; onMenuChange?: (isOpen: boolean) => void; forceOpenMenu?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isYijingPage = pathname === '/yijing';
  const isExhibitionPage = pathname === '/exhibition';
  const isSmallHeightPage = isYijingPage || isExhibitionPage;
  const logoSrc = isMobile ? '/images/logo.svg' : (isYijingPage ? '/images/logo-b.svg' : '/images/logo.svg');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 980);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  const handleMenuToggle = (newState: boolean) => {
    setIsMenuOpen(newState);
    if (onMenuChange) {
      onMenuChange(newState);
    }
  };
  
  // Auto-open/close menu based on forceOpenMenu
  useEffect(() => {
    if (forceOpenMenu && !isMenuOpen) {
      handleMenuToggle(true);
    } else if (!forceOpenMenu && isMenuOpen) {
      handleMenuToggle(false);
    }
  }, [forceOpenMenu]);

  return (
    <>
      {/* Logo placeholder */}
      <Link href="/">
        <div
          className={`fixed z-[95] cursor-pointer logo-size logo-top ${isSmallHeightPage ? 'logo-size-small-height' : ''}`}
          style={{
            backgroundImage: `url(${logoSrc})`,
            left: isMobile ? '15px' : (isMenuOpen ? '30px' : ((isHomePage && hideOverlay && !isPanelOpen) ? '50%' : '30px')),
            transform: (isHomePage && hideOverlay && !isPanelOpen && !isMenuOpen) ? 'translateX(-50%)' : 'none',
            opacity: (isHomePage && !hideOverlay) ? 0 : 1,
            transition: isMobile
              ? 'none'
              : (isHomePage && hideOverlay)
                ? 'left 0.7s ease-out, transform 0.7s ease-out, opacity 0.7s ease-out'
                : 'left 0.7s ease-out 1s, transform 0.7s ease-out 1s, opacity 0.7s ease-out'
          }}
        >
        </div>
      </Link>

      {/* Burger menu button */}
      <button
        onClick={() => handleMenuToggle(!isMenuOpen)}
        className={`fixed ${isMobile ? 'top-[0] right-[0]' : 'top-[20px] right-[20px]'} w-[50px] h-[50px] z-[100] flex flex-col items-center justify-center gap-1.5 group`}
        style={{
          opacity: (isHomePage && !hideOverlay) ? 0 : 1,
          transition: (isHomePage && hideOverlay) ? 'opacity 0.5s ease-out 1s, background-color 0.3s' : 'opacity 0.5s ease-out, background-color 0.3s'
        }}
      >
        {isMenuOpen ? (
          <span className="text-3xl text-white leading-none">×</span>
        ) : (
          <>
            <span className="w-6 h-[3px] bg-white "></span>
            <span className="w-6 h-[3px] bg-white "></span>
            <span className="w-6 h-[3px] bg-white "></span>
          </>
        )}
      </button>

      {/* Menu panel */}
      <div 
        className="fixed top-0 right-0 h-screen bg-black z-[90] transition-transform duration-700 ease-out"
        style={{ 
          width: isMobile ? '100vw' : '50vw',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div className="flex flex-col h-full main-menu-wrapper" style={{ paddingTop: isMobile ? '50px' : '89px' }}>
          {/* Menu items */}
          <div className="flex-1 flex flex-col justify-top main-menu">
            <Link href="/exhibition" onClick={() => handleMenuToggle(false)}>
              <div className="group section-title-row border-t cursor-pointer transition-opacity" style={{ borderTopColor: '#888' }}>
                <div className="flex items-baseline gap-3">
                  <h2 className="font-normal text-white group-hover:text-[#888] transition-colors section-title-text">展覽</h2>
                  <h2 className="font-light text-white group-hover:text-[#888] transition-colors section-title-text" style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Exhibition</h2>
                </div>
              </div>
            </Link>
            <Link href="/yijing" onClick={() => handleMenuToggle(false)}>
              <div className="group section-title-row cursor-pointer transition-opacity">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-normal text-white group-hover:text-[#888] transition-colors section-title-text">易經</h2>
                  <h2 className="font-light text-white group-hover:text-[#888] transition-colors section-title-text" style={{ fontFamily: '"neue-haas-unica", sans-serif', fontStyle: "italic" }}>Yijing</h2>
                </div>
              </div>
            </Link>
            <Link href="/about" onClick={() => handleMenuToggle(false)}>
              <div className="group section-title-row cursor-pointer transition-opacity">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-normal text-white group-hover:text-[#888] transition-colors section-title-text">關於</h2>
                  <h2 className="font-light text-white group-hover:text-[#888] transition-colors section-title-text" style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>About</h2>
                </div>
              </div>
            </Link>
            <Link href="/creative-team" onClick={() => handleMenuToggle(false)}>
              <div className="group section-title-row cursor-pointer transition-opacity">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-normal text-white group-hover:text-[#888] transition-colors section-title-text">團隊</h2>
                  <h2 className="font-light text-white group-hover:text-[#888] transition-colors section-title-text" style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Creative Team</h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="">


            {/* Footer links and copyright */}
              <div className="flex justify-between items-center px-6" style={{ height: '60px', borderTop: '1px solid #888', borderBottom: '1px solid #888' }}>
                <div className="flex gap-4 text-xs" style={{ fontFamily: '"neue-haas-unica", sans-serif', color: '#888', fontWeight: '300' }}>
                  <a href="#" className="hover:text-white transition-colors underline">Terms of Use</a>
                  <a href="#" className="hover:text-white transition-colors underline">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors underline">Adjust Font Size</a>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="text-[#888] hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#888] hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#888] hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            <div className="flex justify-between items-center px-6" style={{ height: '60px', fontFamily: '"neue-haas-unica", sans-serif', color: '#888', fontSize: '12px', fontWeight: '300' }}>
              <div>© 2026 The Jockey Club CPS Limited All rights reserved.</div>
              <div>Site by <a href="https://www.toby-ng.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Toby Ng Design</a></div>
            </div>
            {/* Logos */}
            <div className="flex justify-between items-start mb-6 px-6" style={{ borderTop: '1px solid #888', paddingTop: '20px'}}>
              <a href="https://www.taikwun.hk" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/TK-logo.svg" 
                  alt="Tai Kwun" 
                  style={{ height: '60px', width: 'auto' }}
                />
              </a>
              <img 
                src="/images/HKJC-logo.svg" 
                alt="HKJC" 
                style={{ height: '60px', width: 'auto' }}
              />
            </div>            
          </div>
        </div>
      </div>
    </>
  );
}
