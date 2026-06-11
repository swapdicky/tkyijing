'use client';

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function Yijing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollLockRef = useRef(false);
  const [isMobileDetected, setIsMobileDetected] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobilePhase, setMobilePhase] = useState<'left' | 'right'>('left');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // Use desktop layout during SSR and initial hydration to avoid mismatch
  const isMobile = mounted ? isMobileDetected : false;
  const rightContentRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const leftContentRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const slide2InnerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobileDetected(window.innerWidth < 980);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Check initial mouse position on mount
    const handleInitialMousePosition = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const windowWidth = window.innerWidth;
      if (e.clientX < windowWidth / 2) {
        setIsHoveringLeft(true);
        setShowCursor(true);
      } else if (e.clientX < windowWidth - 90) {
        setIsHoveringRight(true);
        setShowCursor(true);
      }
      // Remove listener after first detection
      window.removeEventListener('mousemove', handleInitialMousePosition);
    };
    
    window.addEventListener('mousemove', handleInitialMousePosition, { once: true });
    
    // Set loaded after a short delay to ensure content is ready
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleInitialMousePosition);
      clearTimeout(loadTimer);
    };
  }, []);

  // Hide scrollbar and prevent scroll on desktop
  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflowY = 'hidden';
      document.body.style.overflowX = 'hidden';
    }
    return () => {
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
    };
  }, [isMobile]);

  const renderLeftContent = (index: number) => {
    if (index === 0) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          {/* Chinese text section */}
          <div className="yj-gap-0" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'flex-end'
          }}>
            {/* 易經 title */}
            <h2 className={`yj-cn-40 text-black fw-600 yj-lh-10 ex-ml-15 ${currentSlide === 0 ? 'v-fade' : ''}`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              
              letterSpacing: '0.2em' }}>
              <span className="mt-n-14"></span>︽易經︾<span className="mt-n-14"></span>是什麼？
            </h2>
            
            {/* Description text */}
            <div className="yj-cn-24 text-black fw-300 yj-lh-14 yj-lh-13-m" style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className={currentSlide === 0 ? 'v-fade-delay-2' : ''}><span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>是一本古代卜辭書，在中國</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-3' : ''}>哲學歷史中具有重要地位。<span className="space-before-bracket"></span>﹁易﹂<span className="space-after-bracket"></span></span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-4' : ''}>是變化的意思，<span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>呈現一個恆常</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-5' : ''}>變動的世界。它代表了古人嘗試闡釋</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-6' : ''}>人類在宇宙中定位的看法，強調</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-7' : ''}>天人之間的互動與合一。作為傳統卜卦</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-8' : ''}>文獻和哲學論述，<span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>在中國人</span><br />
              <span className={currentSlide === 0 ? 'v-fade-delay-8' : ''}>生活方方面面留下不可磨滅的影響。</span>
            </div>
          </div>

          {/* English section - aligned to bottom */}
          <div>
            {/* Title */}
            <div className={`yj-en-24 text-black fw-500 yj-en-16-mb yj-lh-12`}  style={{ marginBottom: '10px',
              fontStyle: 'normal' }}>
              What is the <em>Yijing</em>, <em>Book of Changes</em>？
            </div>

            {/* English description */}
            <div className={`yj-en-20 text-black fw-300 yj-en-14-mb yj-lh-12`}  style={{

              
              fontStyle: 'normal' }}>
              The <em>Book of Changes</em> is an ancient divination text that holds great significance in the history of Chinese philosophy. The term <em>yi</em> refers to change and transformation. Presenting a world of changing reality, this book represents an early effort to explain the Chinese view of humanity’s place in the universe, which stresses unity and dynamic interaction between the cosmos and the human self.  As a classical divination document and a philosophical exposition, it has an enduring imprint on many aspects of Chinese life.
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 1) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative'
        }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-02.jpg" 
            alt="Yin Yang" 
            style={{
              width: '100%',
              height: 'auto',
              transform: isMobile ? 'scale(1.2)' : 'none'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-02.jpg')}
            style={{
              position: 'absolute',
              top: '0',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    if (index === 2) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
          {/* Vertical Chinese text */}
          <div className="" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignSelf: 'flex-end'
          }}>
            <div className="yj-cn-40 text-black fw-600 yj-lh-12 ex-ml-15"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.15em' }}>
              <span className={currentSlide === 2 ? 'v-fade' : ''}><span className="mt-n-6"></span><span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>哲學的</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-2' : ''}>基礎概念是什麼？</span>
            </div>
            <div className="yj-cn-24 text-black fw-300 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
               <span className={currentSlide === 2 ? 'v-fade-delay-3' : ''}><span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>六十四卦體系的確立，</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-4' : ''}>乃基於<span className="space-before-bracket"></span>﹁陰陽﹂<span className="space-after-bracket"></span>和<span className="space-before-bracket"></span>﹁五行﹂<span className="space-after-bracket"></span></span><br/><span className={currentSlide === 2 ? 'v-fade-delay-5' : ''}>觀念所形成的關聯性宇宙觀，</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-6' : ''}>以觀萬物之態。這些概念被認為</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-7' : ''}>是宇宙創造與變化的過程，</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-8' : ''}>同時也體現萬物在整體規律中</span><br/><span className={currentSlide === 2 ? 'v-fade-delay-8' : ''}>相互依存的本質。</span>
            </div>
          </div>

          {/* English text at bottom */}
          <div className="">
            <div className="yj-en-24 text-black fw-500 yj-en-16-mb yj-lh-13"  style={{ marginBottom: '10px' }}>
              What Are the Fundamental Concepts<br/>in the Philosophy of the <em>Book of Changes</em>?
            </div>
            <div className="yj-en-20 text-black fw-300 yj-en-14-mb yj-lh-12">
The divination system in the <em>Book of Changes</em> was formalised to observe the conditions of all things, based on a correlative cosmology formed around the notions of <em>yinyang</em> and <em>wuxing</em>. These concepts were identified with the processes of cosmic creativity and transformation, as well as the interconnectedness of all things in a holistic totality of order.             </div>
          </div>
        </div>
      );
    }
    
    if (index === 3) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative'
        }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-04.jpg" 
            alt="8 Trigrams" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '120%',
              transform: isMobile ? 'scale(1.2)' : 'none',
              objectFit: 'contain'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-04.jpg')}
            style={{
              position: 'absolute',
              top: '0',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    if (index === 4) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative'
        }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-05.jpg" 
            alt="64 Hexagrams" 
            style={{
              width: '100%',
              height: 'auto',
              transform: isMobile ? 'scale(1.2)' : 'none',
              maxHeight: '120%',
              objectFit: 'contain'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-05.jpg')}
            style={{
              position: 'absolute',
              top: '0',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    if (index === 5) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
          {/* Vertical Chinese text */}
          <div className="" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignSelf: 'flex-end'
          }}>
            <div className="yj-cn-36 text-black fw-600 yj-lh-12 ex-ml-15"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className={currentSlide === 5 ? 'v-fade' : ''}><span className="mt-n-12"></span>︽易︾<span className="space-after-bracket"></span>有太極，是生兩儀，</span><br/><span className={currentSlide === 5 ? 'v-fade-delay-2' : ''}>兩儀生四象，四象生八卦。</span><br/><span className={currentSlide === 5 ? 'v-fade-delay-3' : ''}>八卦定吉凶，吉凶生大業。</span>
            </div>
            <div className={`yj-cn-20 text-black fw-300 ${currentSlide === 5 ? 'v-fade-delay-4' : ''} yj-lh-12`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className="space-before-bracket"></span>︽繫辭︾<span className="space-after-bracket"></span>上傳，第十一章
            </div>
          </div>

          {/* English text at bottom */}
          <div   className="bottom-60 yj-max-width-25vw"
          style={{
            position: 'absolute',
            width: '400px'
          }}>
            <div className="yj-en-16 text-black fw-500 yj-lh-12">
              <p style={{ marginBottom: '10px' }}>There is, in the <em>Changes</em>, <br/><span style={{marginLeft: '20px'}}></span>the Supreme Ultimate <em>(taiji)</em>.</p>
              <p style={{ marginBottom: '10px' }}>This generates the two primal forces.</p>
              <p style={{ marginBottom: '10px' }}>The two primal forces  <br/><span style={{marginLeft: '20px'}}></span>generate the four images.</p>
              <p style={{ marginBottom: '10px' }}>The four images <br/><span style={{marginLeft: '20px'}}></span>generate the eight trigrams.</p>
              <p style={{ marginBottom: '10px' }}>The eight trigrams<br/><span style={{marginLeft: '20px'}}></span>determine good fortune and misfortune.</p>
              <p style={{ marginBottom: '10px' }}>Good fortune and misfortune<br/><span style={{marginLeft: '20px'}}></span>create the great field of action.</p>
              <p className="yj-en-14 fw-300">“Great Commentary”, Part I, Ch. 11</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 6) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
          {/* Vertical Chinese text */}
          <div className="" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignSelf: 'flex-end'
          }}>
            <div className="yj-cn-36 text-black fw-600 yj-lh-12 ex-ml-15"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className={currentSlide === 6 ? 'v-fade' : ''}>天一，地二；天三，地四；天五，</span><br/><span className={currentSlide === 6 ? 'v-fade-delay-2' : ''}>地六；天七，地八；天九，地十。</span><br/><span className={currentSlide === 6 ? 'v-fade-delay-3' : ''}>天數五，地數五，五位相得而</span><br/><span className={currentSlide === 6 ? 'v-fade-delay-4' : ''}>各有合。天數二十有五，地數三十，</span><br/><span className={currentSlide === 6 ? 'v-fade-delay-5' : ''}>凡天地之數，五十有五，此所以</span><br/><span className={currentSlide === 6 ? 'v-fade-delay-6' : ''}>成變化而行鬼神也。</span>
            </div>
            <div className={`yj-cn-20 text-black fw-300 ${currentSlide === 6 ? 'v-fade-delay-7' : ''} yj-lh-12`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className="space-before-bracket"></span>︽繫辭︾<span className="space-after-bracket"></span>上傳，第九章
            </div>
          </div>

          {/* English text at bottom */}
          <div   className="bottom-60 yj-max-width-25vw"
          style={{
            position: 'absolute',
            width: '400px'
          }}>
            <div className="yj-en-16 text-black fw-500 yj-lh-12">
              <p style={{ marginBottom: '10px' }}>Heaven in one, Earth is two; Heaven is three,<br/> Earth is four; Heaven is five, Earth is six;<br/> Heaven is seven, Earth is eight; Heaven is <br/>nine, Earth in ten. There are thus five<br/>heavenly numbers and five earthly numbers.<br/> When these numbers are distributed among<br/>the five places, each finds its complement.<br/> The sum of the heavenly numbers is 25 and <br/>that of the earthly numbers is 30. The sum <br/>total of heavenly numbers and earthly <br/>numbers is 55. It is this which completes the <br/>changes and transformation and sets the <br/>spirits in motion.</p>
              <p className="yj-en-14 fw-300">"Great Commentary", Part I, Ch. 9</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 7) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative'
          }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-08.jpg" 
            alt="Luo River Diagram" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '130%',
              transform: isMobile ? 'scale(1.2)' : 'none',
              objectFit: 'contain'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-08.jpg')}
            style={{
              position: 'absolute',
              top: '5px',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    if (index === 8) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative'
          }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-09.jpg" 
            alt="Yellow River Chart" 
            style={{
              width: '100%',
              height: 'auto',
              transform: isMobile ? 'scale(1.2)' : 'none',
              maxHeight: '130%',
              objectFit: 'contain'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-09.jpg')}
            style={{
              position: 'absolute',
              top: '0',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    if (index === 9) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
              height: isMobile ? 'auto' : '100%' 
          }}>
          {/* Vertical Chinese text */}
          <div className="" style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignSelf: 'flex-end',
            flex: 1
          }}>
            <div className={`yj-cn-40 text-black fw-600 ex-ml-15 ${currentSlide === 9 ? 'v-fade' : ''} yj-lh-12`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.12em' }}>
              活著的傳承
            </div>
            <div className={`yj-cn-16 text-black fw-300 yj-lh-14 yj-lh-13-m ${currentSlide === 9 ? 'v-fade' : ''}`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '0.05em',
              fontFamily: '"Noto Serif TC", serif',
              marginBottom: isMobile ? '120px' : '0',
              height: isMobile ? '510px' : 'auto' }}>
              {isMobile ? (
                <>
                  <span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>被中國歷代思想家不斷詮釋和修訂，並發展了對其註釋<br/>傳統的專門研究和派別。一些思想家著重卜卦的<span className="space-before-bracket"></span>﹁象數﹂<span className="space-after-bracket"></span>；<br/>另一些深入考究經典的<span className="space-before-bracket"></span>﹁義理﹂<span className="space-after-bracket"></span>。此書的影響貫穿整個中國<br/>文化史，持續發揮影響至今。<div className="ex-ml-15"></div>
                  
                  <span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>在國際世界亦備受尊崇。分別出自馬克萊奇<br/><span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Thomas McClatchie</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1814–1885</span>年︶<span className="space-after-paren"></span>、理雅各<span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>James Legge</span>，<br/><span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1815–1897</span>年︶<span className="space-after-paren"></span>、尉禮賢<span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Richard Wilhelm</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1873–1930</span>年︶<span className="space-after-paren"></span>之手的<br/>譯本，將此中國經典傳播至世界。心理學家卡爾‧榮格<span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Carl Jung</span>，<br/><span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1875–1961</span>年︶<span className="space-after-paren"></span>將此古籍與他提出的<span className="space-before-bracket"></span>﹁共時性﹂<span className="space-after-bracket"></span>概念結合。<br/>先鋒派作曲家約翰‧基治<span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>John Cage</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1912–1992</span>年︶<span className="space-after-paren"></span>根據<br/><span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span>的處境次序決定音樂創作的隨機性。艾斯班‧艾瑟特<br/><span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Espen Aarseth</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1965</span>年生︶<span className="space-after-paren"></span>在進行數碼文學研究時，將<span className="space-before-bracket"></span>︽易經︾<span className="space-after-bracket"></span><br/>視為<span className="space-before-bracket"></span>﹁可能是古代最著名的制動文本範例﹂<span className="space-after-bracket"></span>。
                </>
              ) : (
                <>
                  <span className="mt-n-6"></span>︽易經︾被中國歷代思想家不斷詮釋和修訂，<br/>並發展了對其註釋傳統的專門研究和派別。一些<br/>思想家著重卜卦的<span className="mt-n-6"></span>﹁象數﹂<span className="mt-n-6"></span>；另一些深入考究<br/>經典的<span className="mt-n-6"></span>﹁義理﹂<span className="mt-n-6"></span>。此書的影響貫穿整個中國文化史，<br/>持續發揮影響至今。<br/><br/><span className="mt-n-6"></span>︽易經︾在國際世界亦備受尊崇。分別出自<br/>馬克萊奇<span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Thomas McClatchie</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1814–1885</span>年︶<span className="mt-n-6"></span>、<br/>理雅各<span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>James Legge</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1815–1897</span>年︶<span className="mt-n-6"></span>、尉禮賢<br/><span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Richard Wilhelm</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1873–1930</span>年︶<span className="mt-n-6"></span>之手的譯本，<br/>將此中國經典傳播至世界。心理學家卡爾‧榮格<br/><span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Carl Jung</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1875–1961</span>年︶<span className="mt-n-6"></span>將此古籍與他提出的<br/><span className="mt-n-6"></span>﹁共時性﹂<span className="mt-n-6"></span>概念結合。先鋒派作曲家約翰‧基治<br/><span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>John Cage</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1912–1992</span>年︶<span className="mt-n-6"></span>根據<span className="mt-n-6"></span>︽易經︾的處境<br/>次序決定音樂創作的隨機性。艾斯班‧艾瑟特<br/><span className="mt-n-6"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Espen Aarseth</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1965</span>年生︶<span className="mt-n-6"></span>在進行數碼文學<br/>研究時，將<span className="mt-n-6"></span>︽易經︾視為<span className="mt-n-6"></span>﹁可能是古代最著名的<br/>制動文本範例﹂<span className="mt-n-6"></span>。
                </>
              )}
            </div>
          </div>

          {/* English text at bottom */}
          <div>
              <div className="yj-en-18 text-black fw-500"  style={{ marginBottom: '10px' }}>Living Legacy</div>
            <div className="yj-en-14 text-black fw-300 mb-30-bottom yj-lh-12">

              <p style={{ marginBottom: '10px' }}>The <em>Book of Changes</em> was embraced and appropriated by later Chinese thinkers, giving rise to specialised studies of its commentarial traditions. approached the divination judgements based on images and numbers; others took the classic to be an explanation of meanings and principles. The book’s impact spanned the entire cultural history of China, and it continues to exert influence in the present.</p>
              <p>The book's reception in the international world has been remarkable. Respective translations by Thomas McClatchie (1814-1885), James Legge (1815-1897), and Richard Wilhelm (1873-1930) introduced the ancient Chinese text to the world. The psychologist Carl Jung (1875-1961) linked it to his concept of synchronicity. The avant-garde composer John Cage (1912-1992) referred to the book’s sequences of events for determining randomness in music composition. Espen Aarseth (b. 1965) regarded it as “possibly the best-known example of cybertext in antiquity” when exploring cybertext theory in digital literary studies.</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 10) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative'
        }}>
          <img 
            src="/images/TK_YiJIng_Graphs/yijing-graphs-11.jpg" 
            alt="64 Hexagrams" 
            style={{
              width: '100%',
              transform: isMobile ? 'scale(1.2)' : 'none',
              height: 'auto',
              maxHeight: '120%',
              objectFit: 'contain'
            }}
          />
          {isMobile && (
            <button
              onClick={() => setLightboxImage('/images/TK_YiJIng_Graphs/yijing-graphs-11.jpg')}
            style={{
              position: 'absolute',
              top: '5px',
              right: '-10px',
              width: '30px',
              height: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              fontSize: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s'
            }}

            >
              +
            </button>
          )}
        </div>
      );
    }
    
    return null;
  };

  const renderRightContent = (index: number) => {
    if (index === 0) {
      return (
        <>
          {/* Top half */}
          <div
            className="yj-padding-small yj-height-half"
            style={{
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-height-half-inner">
              <div className="yj-cn-18 text-white fw-600"  style={{ marginBottom: '10px' }}>
                儒家五經之一
              </div>
              <div className="yj-cn-16 text-white fw-300 yj-lh-14"  style={{ fontFamily: '"Noto Serif TC", serif' }}>
                <p style={{marginBottom:'10px'}}>
                最初，此書將六十四卦的卦象、卦名與卦爻辭集結，名為《周易》，相傳為周文王（公元前十一世紀）所著。《周易》正文逐漸擴展至包含一系列為經作註解和闡釋哲理的「傳」（又稱《十翼》），相信是戰國時期（公元前<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>475-221</span>年）不同作者所撰注。
                </p>
                <p>
                為《周易》所作的「傳」闡述八卦及六十四卦的象徵意義，解釋卦象、卦辭和爻辭，並就卦義作進一步解釋和延伸意義。隨着儒家觀念和道家自然哲學的融入，時至公元前一至二世紀的漢朝，此書包含「易傳」在內，被正式確立為一本儒家經典，稱為《易經》。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom half */}
          <div
            className="yj-padding-small yj-height-half"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-height-half-inner">
              <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
                One of the Five Classics of Confucianism
              </div>
              <div className="yj-en-16 text-white fw-300 mb-30-bottom" >
                <p style={{marginBottom:"10px"}}>
                First set down as a book with divination statements for various hexagrams, the main body of the work was originally known as the <em>Changes of Zhou</em> attributed to King Wen of the Zhou (c.11th century BCE). The basic text was gradually expanded to include a number of philosophical commentaries (the "Ten Wings") that are believed to be the works by authors during the Warring States period (475–221 BCE).
                </p>
                <p>
                The commentaries clarified the symbolism of the hexagrams and their constituent trigrams, explained the divinatory judgements and line readings, and invested them with meanings beyond their original significations. Confucian values and Daoist naturalism found their way into the text and, by the Han dynasty, around the 1st to 2nd century BCE, the book had become a Confucian classic, referred to as the <em>Book of Changes</em>.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 1) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div
            className="yj-padding-large"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
            <div className={`yj-cn-20 text-white fw-300 ${currentSlide === 1 ? 'v-fade-delay-3' : ''}`}  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.2em' }}>
              ︽繫辭︾上傳，第五章
            </div>
            <div className="yj-cn-110 text-white fw-300 yj-lh-12"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '0.05em' }}>
              <span className={currentSlide === 1 ? 'v-fade' : ''}>一陰一陽</span><br/><span className={currentSlide === 1 ? 'v-fade-delay-2' : ''}>之謂道。</span>
            </div>
          </div>
          <div className="yj-padding-large" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="yj-en-24 text-white fw-500"  style={{ marginBottom: '10px' }}>
              One <em>yin</em> and one <em>yang</em>; that is the <em>Dao</em>.
            </div>
            <div className="yj-en-20 text-white fw-300">
              “Great Commentary", Part I, Ch. 5
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 2) {
      return (
        <>
          {/* Top section - Yin Yang */}
          <div
            className="yj-padding-small yj-height-half"
            style={{
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-height-half-inner">
              <div className="yj-cn-18 text-white fw-600"  style={{ marginBottom: '10px' }}>
                <span style={{marginLeft:"-6px"}}></span>「陰陽」與「五行」
              </div>
              <div className="yj-cn-15 text-white fw-300 yj-lh-14">
                <p style={{marginBottom:'10px'}}>
<span style={{marginLeft:"-4px"}}></span>「陰」與「陽」最初指的是山川的背日和向陽面。「陰」代表冰冷、雲、雨及任何具陰性特質的事物；<br/><span style={{marginLeft:"-4px"}}></span>「陽」代表相反的概念，如温暖、晴天、陽光及任何具陽性特質的事物。
                </p>
                <p style={{marginBottom:'10px'}}>
<span style={{marginLeft:"-4px"}}></span>「陰」與「陽」是兩股對立的原始力量，彼此依存方能臻於完整。這是既對立又互相依賴的和諧平衡，此即構成「道」。
                </p>
                <p style={{marginBottom:'10px'}}>
<span style={{marginLeft:"-4px"}}></span>「陰」與「陽」輪轉而生「五行」，亦即木、火、土、金、水，五種變化階段。「五行」的活動與關係遵循「相生」和「相剋」，以及「相化」與「相制」的規律，並與宇宙萬物類別產生關聯。
                </p>
                <p style={{marginBottom:''}}>
古人由此建構出一套全面的象徵對應體系，以呈現天地萬物規律的統一性與相互依存性。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small yj-height-half yj-height-half-inner-over"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div 
              ref={slide2InnerRef} 
              className="yj-height-half-inner yj-custom-scrollbar"
              onWheel={(e) => {
                if (currentSlide === 2) {
                  const inner = slide2InnerRef.current;
                  if (inner) {
                    const maxScroll = inner.scrollHeight - inner.clientHeight;
                    const isAtBottom = inner.scrollTop >= maxScroll - 5;
                    const isAtTop = inner.scrollTop <= 5;
                    
                    // Only stop propagation if we can still scroll within this element
                    if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
                      e.stopPropagation();
                      const newScrollTop = Math.max(0, Math.min(maxScroll, inner.scrollTop + e.deltaY));
                      inner.scrollTop = newScrollTop;
                    }
                  }
                }
              }}
              style={{
                overflowY: 'auto',
                cursor: 'default',
                scrollBehavior: 'smooth'
              }}
            >
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              <em>Yinyand</em> and  <em>Wuxing</em>
            </div>
            <div className="yj-en-14 text-white fw-300 mb-30-bottom yj-lh-15">
              <p style={{marginBottom:'10px'}}>

The terms <em>yin</em>, the dark, and <em>yang</em>, the light, originally denote the shadowed and the light sides of a mountain or a river. <em>Yin</em> conveys the idea of coldness, clouds, rain, and anything feminine; while <em>yang</em> conveys the opposite idea of warmth, a clear sky, sunshine, and anything masculine.
              </p>
              <p style={{marginBottom:'10px'}}>
<em>Yin</em> and <em>yang</em> are opposing primal forces which need one another for completeness. This is harmony through the interdependence of opposites, which constitutes the <em>Dao</em> (the Way). 
              </p>
              <p style={{marginBottom:'10px'}}>
The interaction and alternation of <em>yin</em> and <em>yang</em> produce the <em>wuxing</em>—the five phases or “elements” of Wood, Fire, Earth, Metal, and Water. Their activities and relationships follow the sequential orders of “mutual production” and “mutual conquest”, as well as two further principles of “mutual transformation” and “mutual control”. The <em>wuxing system</em> has been associated with everything in the universe so that it is possible to classify anything in existence into five categories.
              </p>
              <p >

Hence, the ancient Chinese developed a comprehensive scheme of symbolic correlations to represent a pervading unity and mutuality of order of the world. 
              </p>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 3) {
      return (
        <>
          {/* Top section - Chinese */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-cn-20 text-white fw-600"  style={{ marginBottom: '10px' }}>
              易
            </div>
            <div className="yj-cn-15 text-white fw-300 yj-lh-14">
              <p style={{ marginBottom: '10px' }}>「太極」作為本源，是一切事物的起源和終結，開造化之力，最終引導事物的圓滿成就。</p>
              <p style={{ marginBottom: '10px' }}>陰陽交替，為宇宙變化的自然過程賦予動力。他們分別以斷線––與連線——代表。萬物萬象皆由此二元力量自然生成，互相依存且持續變化。</p>
              <p>將「陰」與「陽」以四種不同組合排列，由此得出四象；四象各加一陰一陽，遂成八卦；將八卦以同樣方式排列，衍得六十四卦。</p>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              Change and Transformation
            </div>
            <div className="yj-en-14 text-white fw-300 mb-30-bottom yj-lh-14">
              <p style={{ marginBottom: '10px' }}>The Supreme Ultimate <em>(taiji)</em> as primal source is both the starting point and the ending point of all things. The power of creative initiation leads to the power of completion and fulfilment.</p>
              <p style={{ marginBottom: '10px' }}><em>Yin</em> and <em>yang</em> animate the natural processes of cosmic change. They are represented by a broken line – – and a full line — respectively. All things and phenomena arise spontaneously from this dualism of forces and are interconnected and constantly changing.</p>
              <p>By combining <em>yin</em> and <em>yang</em> in four possible ways, there are the four images. By adding <em>yin<em> and </em>yang</em> separately to each of the four images, there are the eight trigrams. By the same process of doubling the eight trigrams, there are the sixty-four hexagrams.</p>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 4) {
      return (
        <>
          {/* Top section - Chinese */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-cn-20 text-white fw-600"  style={{ marginBottom: '10px' }}>
              六十四卦
            </div>
            <div className="yj-cn-15 text-white fw-300 yj-lh-14">
              <p style={{ marginBottom: '10px' }}>《易經》中的六十四卦，象徵了宇宙變化的結構與形象。這個符號系統被運用於占卜中。</p>
              <p style={{ marginBottom: '10px' }}>《周易》原文記錄了六十四卦各有的卦象、卦名、卦辭，以及說明每一爻變化的爻辭。</p>
              <p style={{ marginBottom: '10px' }}>六十四卦中每一卦包含兩個單卦，單卦有各自的名稱與象徵意義。由於六爻皆具變動可能，因此每一卦皆呈現一系列可變化的處境序列。</p>
              <p>對每一卦的詮釋需理解其兩個單掛及六爻相互之間的位置關係，以及卦與卦之間的聯繫。</p>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              The 64 Hexagrams
            </div>
            <div className="yj-en-14 text-white fw-300 mb-30-bottom yj-lh-14">
              <p style={{ marginBottom: '10px' }}>The 64 hexagrams in the <em>Book of Changes</em> represent symbolically the images and the structures of change in the universe. This system of symbols has been used for divination.</p>
              <p style={{ marginBottom: '10px' }}>In the original <em>Changes of Zhou</em>, each of the 64 hexagrams is given an image, a name, a short, cryptic description called a “judgement”, and a reading for each line.</p>
              <p style={{ marginBottom: '10px' }}>Each hexagram contains a pair of trigrams that have individual names and symbolic associations. As each of the six lines is thought of as capable of change, each hexagram expresses a series of situations that can change from one into another.</p>
              <p>Interpretation requires an understanding of the relationship between the trigrams and the lines within each hexagram and an understanding of the various relationships between different hexagrams.</p>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 5) {
      return (
        <>
          {/* Top section - Chinese */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-cn-20 text-white fw-600"  style={{ marginBottom: '10px' }}>
              天、地、人
            </div>
            <div className="yj-cn-15 text-white fw-300 yj-lh-14">
              <p style={{ marginBottom: '10px' }}>《易經》的內容強調了「天、地、人」三才的互動和合一，亦即在天地之間讓人類安身立命。它更着重提出德行是達致宇宙秩序與個人福祉的關鍵。</p>
              <p style={{ marginBottom: '10px' }}>卜卦問事因此讓人們把自身處境與六十四卦的自然現象相互參照，通過分析卦象、卦辭與爻辭指引人們如何行事，藉以在不同處境中實現自我。這為判斷占卜結果的吉凶賦予了道德層面的意義。</p>
              <p>如此一來，占卜以尋求啟示，使人得以參與天地變化的整體過程中，以達致和諧合一。這種思維方式彰顯了人類的能動力在掌握未來的重要性。</p>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              Heaven, Earth, and Humanity
            </div>
            <div className="yj-en-14 text-white fw-300 mb-30-bottom yj-lh-14">
              <p style={{ marginBottom: '10px' }}>The <em>Book of Changes</em> stresses the unity and dynamic interaction between the three cosmic powers of Heaven, Earth, and Humanity—the way Humanity finds its place between Heaven and Earth. It further emphasizes morality as the key to cosmic order and individual wellbeing.</p>
              <p style={{ marginBottom: '10px' }}>The practice of divination offers the opportunity for humans to relate their situations to the natural phenomena of the hexagrams. The images and the lines guide human actions for self-realisation in each divine situation. They provide a moral relevance to the judgements of fortune and misfortune.</p>
              <p>In this way, the counsels for actions enable human participation in the totality of cosmic change for harmony and unity. This way of thinking underlines the importance of human agency in the art of knowing and mastering the future.</p>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 6) {
      return (
        <>
          {/* Top section - Chinese */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-cn-20 text-white fw-600"  style={{ marginBottom: '10px' }}>
              《易經》與術數
            </div>
            <div className="yj-cn-15 text-white fw-300 yj-lh-14"  style={{ fontFamily: '"Noto Serif TC", serif' }}>
              <p style={{ marginBottom: '10px' }}>《易經》揭示出古代中國人如何建構出一套數字體系，用作命理占卜以及解釋自然運行規律。</p>
              <p>「河圖」與「洛書」是兩幅中國古代的圖像，代表了對自然秩序的數字詮釋。這兩幅圖像自古流傳，至宋代（<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>960–1279</span>年）增補至《易經》之中。它們與「五行」以及各種對應系統如方位、顏色、干支曆法等相互關聯，以呈現天地萬物在整體規律中的相互依存性。</p>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              The <em>Book of Changes</em> and Numerology
            </div>
            <div className="yj-en-14 text-white fw-300 yj-lh-14">
              <p style={{ marginBottom: '10px' }}>The <em>Book of Changes</em> reveals how the ancient Chinese developed a numerical system that could be used for divination and explaining the operations of nature.</p>
              <p>Two ancient Chinese diagrams, <em>Yellow River Chart</em> and <em>Writing from the Luo River</em>, represent the numerical interpretations of the natural order. Both diagrams, as received from antiquity, had been appended to the Book of Changes by the Song period (960–1279). They were linked to the five phases (<em>wuxing</em>) and the different correlational systems—such as, cardinal point, colour, and the stem-branch system of Chinese calendar—to represent the interconnectedness of all things in a holistic totality of order.</p>
            </div>
          </div>
        </>
      );
    }
    
    if (index === 7) {
      return (
        <div
          className="yj-padding-large"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between'
          }}>
          {/* Chinese text at top-right */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div className="yj-cn-36 text-white fw-300 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              <span className={currentSlide === 7 ? 'v-fade' : ''}><span className="mt-n-28"></span>﹁河圖﹂相傳是伏羲所創。</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-2' : ''}>圖中一至十以奇數︵陽︶</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-3' : ''}>與偶數︵陰︶成對排列。</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-4' : ''}>所有奇數相加總和是</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-5' : ''}>二十五，偶數相加是三十，</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-6' : ''}>全部數字總和是五十五。</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-7' : ''}>此圖揭示了這些數字</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-8' : ''}>如何與﹁五行﹂及對應的</span><br/><span className={currentSlide === 7 ? 'v-fade-delay-8' : ''}>方位和顏色相互連結。</span>
            </div>
          </div>

          {/* English text at bottom */}
          <div className="yj-en-14 text-white fw-300 yj-lh-14">
The <em>Yellow River Chart</em> has been traditionally attributed to the legendary emperor Fu Xi. Here, the numbers 1 to 10 are so arranged that an odd number (<em>yang</em>) is paired with an even number (<em>yin</em>). All the odd numbers add up to 25, the even numbers to 30, and all the numbers to 55. This chart shows how these numbers are linked to the <em>wuxing</em> and the correlating cardinal points and colours.
          </div>
        </div>
      );
    }
    
    if (index === 8) {
      return (
        <div
          className="yj-padding-large"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between'
          }}>
          {/* Chinese text at top-right */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div className="yj-cn-36 text-white fw-300 yj-lh-14 yj-lh-13-m"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.1em' }}>
              
              <span className={currentSlide === 8 ? 'v-fade' : ''}><span className="mt-n-28"></span>﹁洛書﹂相傳是一隻從</span><br/><span className={currentSlide === 8 ? 'v-fade-delay-2' : ''}>洛河出現的神龜背上的圖。</span><br/><span className={currentSlide === 8 ? 'v-fade-delay-3' : ''}>此圖為三階幻方，無論</span><br/><span className={currentSlide === 8 ? 'v-fade-delay-4' : ''}>縱、橫、斜向任意行列，</span><br/><span className={currentSlide === 8 ? 'v-fade-delay-5' : ''}>數字之和皆為十五。這是</span><br/><span className={currentSlide === 8 ? 'v-fade-delay-6' : ''}>已知世上最早的幻方。</span>
            </div>
          </div>

          {/* English text at bottom */}
          <div className="yj-en-14 text-white fw-300 yj-lh-14">
The <em>Writing from the Luo River</em> is attributed to a mythical turtle with a diagram on its back emerging from the Luo River. This diagram is a magic square of the order of three, in which all the numbers in any row, column, or diagonal add up to 15. It is the earliest known magic square in the world.           </div>
        </div>
      );
    }
    
    if (index === 9) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: isMobile ? '20px' : '90px 40px',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>
            <img 
              src="/images/yijing/image5.png" 
              alt="Fortune Teller" 
              style={{
                width: isMobile ? '100%' : '80%',
                height: 'auto',
                maxHeight: '60%',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '150px'
          }}>
            <div className="yj-en-14 text-white fw-300 yj-lh-14">
              <span className="fw-500"><em>Fortune Teller</em></span><br/>
              Robert Ruxton (1876–1946)<br/>
              1902<br/>
              SOAS Library
            </div>
            <div className="yj-cn-14 text-white fw-300 yj-lh-14"  style={{ writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '0.25em' }}>
              <span className="space-before-bracket"></span>︽算命師︾<span className="space-after-bracket"></span><br/>羅伯特·魯克斯頓<br/><span className="space-before-paren"></span>︵<span style={{ fontFamily: '"neue-haas-unica", sans-serif', letterSpacing: '0.04em' }}>1876–1946</span>年︶<span className="space-after-paren"></span><br/><span style={{ fontFamily: '"neue-haas-unica", sans-serif' , letterSpacing: '0.04em'}}>1902</span>年 <br/>倫敦大學<br/>亞非學院圖書館
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 10) {
      return (
        <>
          {/* Top section - Chinese */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              borderBottom: '1px solid #888',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-cn-20 text-white fw-600"  style={{ marginBottom: '10px' }}>
              與現代科學的關係
            </div>
            <div className="yj-cn-15 text-white fw-300 yj-lh-14"  style={{ fontFamily: '"Noto Serif TC", serif' }}>
              <p style={{ marginBottom: '10px' }}>《易經》六十四卦體系，被認為與哥特弗利德·威廉·萊布尼茲 （<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Gottfried Wilhelm Leibniz</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1646–1716</span>年） 所創的二進制存在關聯，該系統如今被廣泛應用於數位計算領域。</p>
              <p style={{ marginBottom: '10px' }}>萊布尼茲是一名在微積分學作出重大貢獻的德國哲學家和數學家，他被曾前往中國的法國耶穌會傳教士白晉（<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>Joachim Bouvet</span>，<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1656–1730</span>年）引介下認識《易經》。萊布尼茲因中國六十四卦的抽象結構與二進制十分相似而感到著迷，並將此古代符號系統與他的二進制運算建立連結。</p>
              <p>圖例跟據伏羲所創「先天八卦圖」中六十四卦的陣式，將陰以「<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>0</span>」代替，陽以「<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>1</span>」代替，即可得到零至<span style={{ fontFamily: '"neue-haas-unica", sans-serif' }}>63</span>數值的二進制表示法。</p>
            </div>
          </div>

          {/* Bottom section - English */}
          <div
            className="yj-padding-small"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            <div className="yj-en-18 text-white fw-500"  style={{ marginBottom: '10px' }}>
              Relations to Modern Sciences
            </div>
            <div className="yj-en-14 text-white fw-300 mb-30-bottom yj-lh-14">
              <p style={{ marginBottom: '10px' }}>The 64 hexagrams in the <em>Book of Changes</em> have been linked with the binary notation developed by Gottfried Wilhelm Leibniz (1646–1716), used nowadays in digital computation.</p>
              <p style={{ marginBottom: '10px' }}>Leibniz, a German philosopher and mathematician who made great contributions to calculus, was introduced to the <em>Book of Changes</em> by Joachim Bouvet (1656–1730), a French Jesuit missionary working in China. Fascinated by how the abstract structures of the hexagrams resembled his binary number system, he linked the ancient symbols with binary arithmetic.</p>
              <p>The illustrations demonstrate the arrangement of the 64 hexagrams in the Former Heaven sequence attributed to Fu Xi. By replacing a <em>yin</em> symbol with the number 0 and a yang symbol with the number 1, we get the binary notation for the numbers 0 to 63.</p>
            </div>
          </div>
        </>
      );
    }
    
    return null;
  };

  useEffect(() => {
    const doScroll = (deltaY: number) => {
      if (scrollLockRef.current) return;
      scrollLockRef.current = true;

      if (isMobile) {
        if (deltaY > 0) {
          // Scroll down on mobile
          if (mobilePhase === 'left') {
            // Check if left content can scroll further down
            const lc = leftContentRefs.current[currentSlide];
            const canScroll = lc && lc.scrollHeight - lc.clientHeight > 10; // At least 10px scrollable
            if (canScroll && lc.scrollTop + lc.clientHeight < lc.scrollHeight - 5) {
              lc.scrollTop += deltaY;
              scrollLockRef.current = false;
              return;
            }
            // Scrolled to bottom of left content, switch to right
            setMobilePhase('right');
          } else {
            // Currently showing right - check if content can scroll further down
            const rc = rightContentRefs.current[currentSlide];
            const canScroll = rc && rc.scrollHeight - rc.clientHeight > 10; // At least 10px scrollable
            if (canScroll && rc.scrollTop + rc.clientHeight < rc.scrollHeight - 5) {
              rc.scrollTop += deltaY;
              scrollLockRef.current = false;
              return;
            }
            // Scrolled to bottom, go to next slide
            if (currentSlide < 10) {
              setCurrentSlide(prev => prev + 1);
              setMobilePhase('left');
            } else {
              // Reached last slide, do nothing
              scrollLockRef.current = false;
            }
          }
        } else if (deltaY < 0) {
          // Scroll up on mobile
          if (mobilePhase === 'right') {
            // Check if content can scroll further up
            const rc = rightContentRefs.current[currentSlide];
            const canScroll = rc && rc.scrollHeight - rc.clientHeight > 10; // At least 10px scrollable
            if (canScroll && rc.scrollTop > 5) {
              rc.scrollTop += deltaY;
              scrollLockRef.current = false;
              return;
            }
            // Scrolled to top of right content, switch back to left
            setMobilePhase('left');
            // Reset left content scroll to bottom
            const lc = leftContentRefs.current[currentSlide];
            if (lc) {
              lc.scrollTop = lc.scrollHeight;
            }
          } else {
            // Currently showing left, go to prev slide
            if (currentSlide > 0) {
              setCurrentSlide(prev => prev - 1);
              setMobilePhase('right');
              setShouldOpenMenu(false);
            } else {
              scrollLockRef.current = false;
              return;
            }
          }
        }
      }

      // Wait for animation to complete before allowing next scroll
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 1500);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isMobile) return; // Desktop uses click navigation
      doScroll(e.deltaY);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (!isMobile) return;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isMobile) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;
      if (Math.abs(deltaY) > threshold) {
        doScroll(deltaY > 0 ? 100 : -100);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, isMobile, mobilePhase]);

  return (
    <>
      {/* Loading overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: isLoaded ? 0 : 1,
        transition: 'opacity 1s ease-out',
        zIndex: 2,
        pointerEvents: 'none'
      }}></div>
          {/* Mobile navigation dots - outside border div */}
          {mounted && isMobile && !isMenuOpen && (
            <div className="yj-nav-dots-mobile" style={{ position: 'fixed', bottom: '12px', left: '15px',zIndex : '80' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  className={`yj-nav-dot yj-nav-dot-mobile ${currentSlide === index ? 'yj-nav-dot-active' : 'yj-nav-dot-inactive'}`}
                />
              ))}
            </div>
          )}

              {/* Mobile: Scroll to explore text */}
            {mounted && isMobile && !isMenuOpen && (
              <div
                className="yj-en-12 text-gray fw-400"
                 style={{ position: 'fixed',
                  right: '15px',
                  bottom: '5px',


                  whiteSpace: 'nowrap',
                  zIndex: 80,
                  pointerEvents: 'none',
                  opacity: 1 }}
              >
                Scroll to explore
              </div>
            )}    
      <div className={`${!mounted || !isMobile ? "min-h-screen pt-16" : ""} ${isLoaded ? 'page-fade-in' : ''}`} style={{ opacity: isLoaded ? 1 : 0, overflow: mounted && isMobile ? 'hidden' : 'auto', height: mounted && isMobile ? '100%' : 'auto' }}>
        <Header forceOpenMenu={shouldOpenMenu} onMenuChange={(isOpen) => { setIsMenuOpen(isOpen); if (!isOpen) setShouldOpenMenu(false); }} />
      
      {isMobile ? (
        <>
          {/* Mobile wrapper: top 50px for header, bottom 30px */}
          <div style={{
            position: 'fixed',
            top: '50px',
            left: 0,
            width: '100vw',
            height: 'calc(100% - 80px)',
            overflow: 'hidden',
            zIndex: 1,
            borderRadius: '15px'
          }}>


            {/* Mobile: Each slide is a full-screen frame that slides vertically */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <div key={index} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: index === currentSlide ? 100 : index,
                transform: index === currentSlide ? 'translateY(0)' :
                           index < currentSlide ? 'translateY(-100%)' : 'translateY(100%)',
                transition: 'transform 0.7s ease-out'
              }}>
                {/* Left content layer (white) */}
                <div
                  ref={(el) => { leftContentRefs.current[index] = el; }}
                  className="yj-mobile-left-content" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#FFF',
                  zIndex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}>
                  {renderLeftContent(index)}
                </div>

                {/* Right content layer (black, slides in from right) */}
                <div
                  ref={(el) => { rightContentRefs.current[index] = el; }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    zIndex: 2,
                    transform: index < currentSlide || (index === currentSlide && mobilePhase === 'right') ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.7s ease-out',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  {renderRightContent(index)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop: Left side white div with slides */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (currentSlide > 0) {
                setCurrentSlide(prev => prev - 1);
              }
            }}
            onMouseMove={(e) => {
              setMousePos({ x: e.clientX, y: e.clientY });
              setShowCursor(true);
            }}
            onMouseEnter={() => {
              setIsHoveringLeft(true);
              setShowCursor(true);
            }}
            onMouseLeave={() => {
              setIsHoveringLeft(false);
              setShowCursor(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '50vw',
              height: '100%',
              backgroundColor: '#FFF',
              overflow: 'hidden',
              cursor: currentSlide > 0 ? 'none' : 'default',
              zIndex: 10
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
              return (
                <div
                  key={index}
                  className="yj-padding-large"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: (index >= 1 && index <= 10) ? 'center' : 'space-between',
                    transform: index <= currentSlide ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.7s ease-out',
                    zIndex: index
                  }}
                >
                  {renderLeftContent(index)}
                </div>
              );
            })}
          </div>

          {/* Scroll to explore text */}
          <div
            className="yj-en-12 text-gray fw-400"
             style={{ position: 'fixed',
              left: '5px',
              top: '50%',
              transform: 'rotate(90deg)',
              transformOrigin: 'center center',
              
              
              whiteSpace: 'nowrap',
              zIndex: 99,
              pointerEvents: 'none',
              opacity: currentSlide > 0 ? 0 : 1,
              transition: 'opacity 0.5s ease-out' }}
          >
            Click to explore
          </div>

          {/* Desktop: Right side black div with slides */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to next slide on click
              if (currentSlide < 10) {
                setCurrentSlide(prev => prev + 1);
              }
            }}
            onWheel={(e) => {
              // Allow scrolling on entire right area when on slide 2 (desktop only)
              if (!isMobile && currentSlide === 2 && slide2InnerRef.current) {
                e.stopPropagation();
                const inner = slide2InnerRef.current;
                const maxScroll = inner.scrollHeight - inner.clientHeight;
                const newScrollTop = Math.max(0, Math.min(maxScroll, inner.scrollTop + e.deltaY));
                inner.scrollTop = newScrollTop;
              }
            }}
            onMouseMove={(e) => {
              setMousePos({ x: e.clientX, y: e.clientY });
              setShowCursor(true);
            }}
            onMouseEnter={() => {
              setIsHoveringRight(true);
              setShowCursor(true);
            }}
            onMouseLeave={() => {
              setIsHoveringRight(false);
              setShowCursor(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: '90px',
              width: 'calc(50vw - 90px)',
              height: '100%',
              backgroundColor: '#000',
              overflow: 'hidden',
              cursor: currentSlide < 10 ? 'none' : 'default',
              zIndex: 10
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
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
                  {renderRightContent(index)}
                </div>
              );
            })}
          </div>



          {/* Rightmost border div */}
          <div className="yj-right-border">
            {/* Navigation dots - desktop only */}
            {!isMobile && (
              <div className="yj-nav-dots-desktop">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`yj-nav-dot yj-nav-dot-desktop ${currentSlide === index ? 'yj-nav-dot-active' : 'yj-nav-dot-inactive'}`}
                  />
                ))}
              </div>
            )}

            {/* Next/Back button */}
            <div className="text-white yj-nav-button yj-nav-button-cn"
              onClick={(e) => {
                e.stopPropagation();
                const next = currentSlide < 10 ? currentSlide + 1 : 0;
                setCurrentSlide(next);
              }}
            >
              {currentSlide === 10 ? '第一章' : '下一章'}
            </div>
            <div className="text-white yj-nav-button yj-nav-button-en"
              onClick={(e) => {
                e.stopPropagation();
                const next = currentSlide < 10 ? currentSlide + 1 : 0;
                setCurrentSlide(next);
              }}
            >
              {currentSlide === 10 ? (
                <span className="fw-300 yj-nav-button-en-text">Back</span>
              ) : (
                <span className="fw-300 yj-nav-button-en-text">Next</span>
              )}
            </div>
          </div>

          {/* Custom cursor with NEXT/PREV text */}
          {!isMobile && showCursor && (
            <div
              style={{
                position: 'fixed',
                left: mousePos.x,
                top: mousePos.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'exclusion',
                color: '#FFF',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: '"neue-haas-unica", sans-serif',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap'
              }}
            >
              {isHoveringLeft && currentSlide > 0 && 'Prev'}
              {isHoveringRight && currentSlide < 10 && 'Next'}
            </div>
          )}

        </>
      )}
      </div>

      {/* Lightbox for zoomed images */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
          }}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#FFF',
              fontSize: '48px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              transition: 'all 0.3s',
              transform: 'rotate(45deg)'
            }}

          >
            +
          </button>
          <img
            src={lightboxImage}
            alt="Zoomed view"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'calc(100vw - 30px)',
              maxHeight: 'calc(100% - 30px)',
              objectFit: 'contain',
              cursor: 'default'
            }}
          />
        </div>
      )}
    </>
  );
}
