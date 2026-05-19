'use client';

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function Yijing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollLockRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return;
      
      scrollLockRef.current = true;
      
      if (e.deltaY > 0 && currentSlide < 4) {
        // Scroll down - next slide
        setCurrentSlide(prev => Math.min(prev + 1, 4));
      } else if (e.deltaY < 0 && currentSlide > 0) {
        // Scroll up - previous slide
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else {
        // If at boundary, unlock immediately
        scrollLockRef.current = false;
        return;
      }
      
      // Wait for animation to complete before allowing next scroll
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1500);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide]);

  return (
    <div className="min-h-screen pt-16">
      <Header />
      
      {/* Left side white div with slides */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50vw',
          height: '100vh',
          backgroundColor: '#FFF',
          overflow: 'hidden'
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => {
          if (index === 0) {
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#FFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '120px 40px 60px',
                  transform: index <= currentSlide ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform 0.7s ease-out',
                  zIndex: index
                }}
              >
                {/* Chinese text section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: '0px',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-end'
                }}>
                  {/* 易經 title */}
                  <h2 style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    letterSpacing: '0.2em',
                    color: '#000',
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
                    color: '#000'
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
                    color: '#000',
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
                    color: '#000',
                    textAlign: 'left',
                    fontFamily: '"neue-haas-unica", sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal'
                  }}>
                    The Book of Changes is an ancient divination text that holds great significance in the history of Chinese philosophy. The term yi refers to the "ease" and "simplicity" of observing natural phenomena. Contrary to its common perception as a fortune-telling manual, this book represents an early effort to explain the Chinese view of humanity's place in the universe, which is defined by the interaction between the cosmos and the human self.
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#000',
                transform: index <= currentSlide ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.7s ease-out',
                zIndex: index
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      {/* Scroll to explore text */}
      <div
        style={{
          position: 'fixed',
          left: '5px',
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
      
      {/* Right side black div with slides */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: '90px',
          width: 'calc(50vw - 90px)',
          height: '100vh',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => {
          if (index === 0) {
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: index <= currentSlide ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform 0.7s ease-out',
                  zIndex: index
                }}
              >
                {/* Top half */}
                <div style={{
                  height: '50%',
                  borderBottom: '1px solid #888',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'normal',
                    color: '#FFF',
                    marginBottom: '10px'
                  }}>
                    儒家五經之一
                  </div>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.4',
                    color: '#FFF',
                    fontWeight: 'normal'
                  }}>
                    最初，此書將六十四卦的卦象、卦名與卦爻辭集結，名為《周易》，相傳為周文王（公元前十一世紀）所著。《周易》正文逐漸擴展至包含一系列為經作註解和闡釋哲理的「傳」（又稱《十翼》），相信是戰國時期（公元前475-221年）不同作者所撰注。
                    <br /><br />
                    為《周易》所作的「傳」闡述八卦及六十四卦的象徵意義，解釋卦象、卦辭和爻辭，並就卦義作進一步解釋和延伸意義。隨着儒家觀念和道家自然哲學的融入，時至公元前一至二世紀的漢朝，此書包含「易傳」在內，被正式確立為一本儒家經典，稱為《易經》。
                  </div>
                </div>

                {/* Bottom half */}
                <div style={{
                  height: '50%',
                  padding: '60px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#FFF',
                    marginBottom: '10px',
                    fontFamily: '"neue-haas-unica", sans-serif'

                  }}>
                    One of the Five Classics of Confucianism
                  </div>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.2',
                    color: '#FFF',
                    fontFamily: '"neue-haas-unica", sans-serif',
                    fontWeight: 200
                  }}>
First set down as a book with divination statements for various hexagrams, the main body of the work was originally known as the Changes of Zhou attributed to King Wen of the Zhou (c.11th century BCE). The basic text was gradually expanded to include a number of philosophical commentaries (the “Ten Wings”) that are believed to be the works by authors during the Warring States period (475–221 BCE).                    <br /><br />
The commentaries clarified the symbolism of the hexagrams and their constituent trigrams, explained the divinatory judgements and line readings, and invested them with meanings beyond their original significations. Confucian values and Daoist naturalism found their way into the text and, by the Han dynasty, around the 1st to 2nd century BCE, the book had become a Confucian classic, referred to as the Book of Changes.
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#FFF',
                transform: index <= currentSlide ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.7s ease-out',
                zIndex: index
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      
      {/* Rightmost border div */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '90px',
          height: '100vh',
          borderLeft: '1px solid #888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          paddingBottom: '55px',
          cursor: 'pointer'
        }}
        onClick={() => {
          if (currentSlide < 4) {
            setCurrentSlide(currentSlide + 1);
          }
        }}
      >
        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '14px',
            letterSpacing: '0.1em',
            color: '#FFF'
          }}
        >
          下一章 <span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>NEXT</span>
        </div>
      </div>
    </div>
  );
}
