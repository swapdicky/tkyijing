"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Logo placeholder */}
      <Link href="/">
        <div 
          className="fixed z-50 transition-all duration-700 ease-out cursor-pointer"
          style={{ 
            width: '215px', 
            height: '36px', 
            backgroundColor: '#EEE',
            top: '27px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {/* Logo will go here */}
        </div>
      </Link>

      {/* Burger menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <Link href="/exhibition" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">展覽Exhibition</h2>
              </div>
            </Link>
            <Link href="/yijing" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">易經Yijing</h2>
              </div>
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              <div className="border-b border-white pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">關於About</h2>
              </div>
            </Link>
            <Link href="/creative-team" onClick={() => setIsMenuOpen(false)}>
              <div className="pb-6 cursor-pointer hover:opacity-70 transition-opacity">
                <h2 className="text-2xl font-bold">團隊Creative Team</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
