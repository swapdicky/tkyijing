'use client';

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function Yijing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollLockRef = useRef(false);

  const renderLeftContent = (index: number) => {
    if (index === 0) {
      return (
        <>
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
              fontWeight: '500',
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
              fontWeight: '400',
              letterSpacing: '0.1em',
              color: '#000'
            }}>
              <span style={{marginTop:'-8px'}}></span>︽易經︾是一本古代卜辭書，在中國<br />哲學歷史中具有重要地位。﹁易﹂<br />是變化的意思，︽易經︾呈現一個恆常<br />變動的世界。它代表了古人嘗試闡釋<br />人類在宇宙中定位的看法，強調<br />天人之間的互動與合一。作為傳統卜卦<br />文獻和哲學論述，︽易經︾在中國人<br />生活方方面面留下不可磨滅的影響。
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
              fontWeight: '500',
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
              The <em>Book of Changes</em> is an ancient divination text that holds great significance in the history of Chinese philosophy. The term <em>yi</em> refers to the "ease" and "simplicity" of observing natural phenomena. Contrary to its common perception as a fortune-telling manual, this book represents an early effort to explain the Chinese view of humanity's place in the universe, which is defined by the interaction between the cosmos and the human self.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 1) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
          <img 
            src="/images/yijing/yinyang-symbol.jpg" 
            alt="Yin Yang" 
            style={{
              width: '50%',
              height: 'auto',
              maxWidth: '400px'
            }}
          />
        </div>
      );
    }
    
    if (index === 2) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '120px 60px 60px'
        }}>
          {/* Vertical Chinese text */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '20px',
            alignSelf: 'flex-end'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '40px',
              lineHeight: '1.2',
              letterSpacing: '0.15em',
              color: '#000',
              fontWeight: '400'
            }}>
              ︽易經︾哲學的<br/>基礎概念是什麼？
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '24px',
              lineHeight: '1.4',
              fontWeight: '400',
              letterSpacing: '0.1em',
              color: '#000'
            }}>
              ︽易經︾六十四卦體系的確立，<br/>乃基於﹁陰陽﹂和﹁五行﹂<br/>觀念所形成的關聯性宇宙觀，<br/>以觀萬物之態。這些概念被認為<br/>是宇宙創造與變化的過程，<br/>同時也體現萬物在整體規律中<br/>相互依存的本質。
            </div>
          </div>

          {/* English text at bottom */}
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '500',
              marginBottom: '12px',
              lineHeight: '1.3',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              What Are the Fundamental Concepts<br/>in the Philosophy of the Book of Changes?
            </div>
            <div style={{
              fontSize: '20px',
              lineHeight: '1.2',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
The divination system in the Book of Changes was formalised to observe the conditions of all things, based on a correlative cosmology formed around the notions of yinyang and wuxing. These concepts were identified with the processes of cosmic creativity and transformation, as well as the interconnectedness of all things in a holistic totality of order.             </div>
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
          padding: '80px 60px'
        }}>
          <img 
            src="/images/yijing/taiji-graph.jpg" 
            alt="8 Trigrams" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '85%',
              objectFit: 'contain'
            }}
          />
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
          padding: '80px 40px'
        }}>
          <img 
            src="/images/yijing/64-hex.jpg" 
            alt="64 Hexagrams" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    }
    
    if (index === 5) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '120px 60px 60px'
        }}>
          {/* Vertical Chinese text */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '20px',
            alignSelf: 'flex-end'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '36px',
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              color: '#000',
              fontWeight: '400'
            }}>
              <span style={{marginTop: "-12px"}}></span>︽易︾有太極，是生兩儀，<br/>兩儀生四象，四象生八卦。<br/>八卦定吉凶，吉凶生大業。
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '20px',
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              color: '#666',
              fontWeight: '400'
            }}>
              ︽繫辭︾上傳，第十一章
            </div>
          </div>

          {/* English text at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '60px',
            width: '400px',
            maxWidth: '25vw'
          }}>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '500'
            }}>
            There is, in the <em>Changes</em>, <br/><span style={{marginLeft: '20px'}}></span>the Supreme Ultimate <em>(taiji)</em>. <br/><br/>This generates the two primal forces.<br/><br/>The two primal forces  <br/><span style={{marginLeft: '20px'}}></span>generate the four images.<br/><br/>The four images <br/><span style={{marginLeft: '20px'}}></span>generate the eight trigrams. <br/><br/>The eight trigrams<br/><span style={{marginLeft: '20px'}}></span>determine good fortune and misfortune.<br/><br/>Good fortune and misfortune<br/><span style={{marginLeft: '20px'}}></span>create the great field of action.<br/><br/>
              <span style={{  fontSize: '16px' ,              fontWeight: '300'}}>“Great Commentary”, Part I, Ch. 11</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 6) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '120px 60px 60px'
        }}>
          {/* Vertical Chinese text */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '20px',
            alignSelf: 'flex-end'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '36px',
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              color: '#000',
              fontWeight: '400'
            }}>
              天一，地二；天三，地四；天五，<br/>地六；天七，地八；天九，地十。<br/>天數五，地數五，五位相得而<br/>各有合。天數二十有五，地數三十，<br/>凡天地之數，五十有五，此所以<br/>成變化而行鬼神也。
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '20px',
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              color: '#666',
              fontWeight: '400'
            }}>
              ︽繫辭︾上傳，第九章
            </div>
          </div>

          {/* English text at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '60px',
            width: '400px',
            maxWidth: '25vw'
          }}>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.2',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '500'
            }}>
              Heaven in one, Earth is two; Heaven is three,<br/> Earth is four; Heaven is five, Earth is six;<br/> Heaven is seven, Earth is eight; Heaven is <br/>nine, Earth in ten. There are thus five<br/>heavenly numbers and five earthly numbers.<br/> When these numbers are distributed among<br/>the five places, each finds its complement.<br/> The sum of the heavenly numbers is 25 and <br/>that of the earthly numbers is 30. The sum <br/>total of heavenly numbers and earthly <br/>numbers is 55. It is this which completes the <br/>changes and transformation and sets the <br/>spirits in motion. 

<br/><br/>
              <span style={{  fontSize: '16px' ,  fontWeight: '300'}}>"Great Commentary", Part I, Ch. 9</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (index === 7) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '80px 60px'
        }}>
          <img 
            src="/images/yijing/numerology-1-frame.jpg" 
            alt="Luo River Diagram" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70%',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    }
    
    if (index === 8) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '80px 60px'
        }}>
          <img 
            src="/images/yijing/numerology-2.jpg" 
            alt="Yellow River Chart" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '55%',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    }
    
    if (index === 9) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '120px 60px 60px'
        }}>
          {/* Vertical Chinese text */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: '20px',
            alignSelf: 'flex-end',
            flex: 1
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '40px',
              lineHeight: '1.2',
              letterSpacing: '0.12em',
              color: '#000',
              fontWeight: '400'
            }}>
              活著的傳承
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '16px',
              lineHeight: '1.4',
              letterSpacing: '0.08em',
              color: '#000',
              fontWeight: '300'
            }}>
              <span style={{marginTop :"-6px"}}></span>︽易經︾被中國歷代思想家不斷詮釋和修訂，<br/>並發展了對其註釋傳統的專門研究和派別。一些<br/>思想家著重卜卦的﹁象數﹂；另一些深入考究<br/>經典的﹁義理﹂。此書的影響貫穿整個中國文化史，<br/>持續發揮影響至今。<br/><br/><span style={{marginTop :"-6px"}}></span>︽易經︾在國際世界亦備受尊崇。分別出自馬克萊奇<br/><span style={{marginTop :"-6px"}}></span>︵Thomas McClatchie，1814–1885年︶、理雅各<br/><span style={{marginTop :"-6px"}}></span>︵James Legge，1815–1897年︶、尉禮賢<br/><span style={{marginTop :"-6px"}}></span>︵Richard Wilhelm，1873–1930年︶之手的譯本，將此中國<br/>經典傳播至世界。心理學家卡爾‧榮格︵Carl Jung，<br/>1875–1961年︶將此古籍與他提出的﹁共時性﹂概念結合。<br/>先鋒派作曲家約翰‧基治︵John Cage，1912–1992年︶根據<br/><span style={{marginTop :"-6px"}}></span>︽易經︾的處境次序決定音樂創作的隨機性。<br/>艾斯班‧艾瑟特︵Espen Aarseth，1965年生︶在進行數碼<br/>文學研究時，將︽易經︾視為﹁可能是古代最著名的<br/>制動文本範例﹂。
            </div>
          </div>

          {/* English text at bottom */}
          <div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.25',
              color: '#000',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              <span style={{ fontWeight: '500', fontSize: '18px' }}>Living Legacy</span><br/><br/>
              The Book of Changes was embraced and appropriated by later Chinese thinkers, giving rise to specialised studies of its commentarial traditions. Some thinkers regarded the book as a treatise on cosmological meanings and principles. The book's impact spanned the arts in a story of eight continuous waves' influence in the present.<br/><br/>
              The book's reception in the international world has been remarkable. Respective translations by Thomas McClatchie (1814-1885), James Legge (1815-1897), and Richard Wilhelm (1873-1930) introduced the ancient Chinese text to the world. The psychologist Carl Jung (1875-1961) linked the book's principle of synchronicity to the notion of meaningful coincidence and used it to the book's sequences of events for determining randomness in music composition. Eager Augustin (b. 1993) regarded I as "poetry", he never known your plus or system and similarity when exploring cybernetic theory or digital literary studies.
            </div>
          </div>
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
              First set down as a book with divination statements for various hexagrams, the main body of the work was originally known as the <em>Changes of Zhou</em> attributed to King Wen of the Zhou (c.11th century BCE). The basic text was gradually expanded to include a number of philosophical commentaries (the "Ten Wings") that are believed to be the works by authors during the Warring States period (475–221 BCE).<br /><br />
              The commentaries clarified the symbolism of the hexagrams and their constituent trigrams, explained the divinatory judgements and line readings, and invested them with meanings beyond their original significations. Confucian values and Daoist naturalism found their way into the text and, by the Han dynasty, around the 1st to 2nd century BCE, the book had become a Confucian classic, referred to as the <em>Book of Changes</em>.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 1) {
      return (
        <>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '120px 40px 0 40px'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '20px',
              letterSpacing: '0.2em',
              color: '#FFF',
              lineHeight: '1.8',
              fontWeight: '400'
            }}>
              ﹁繫辭﹂上傳第五章
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '110px',
              fontWeight: '300',
              color: '#FFF',
              lineHeight: '1.2',
              letterSpacing: '0.05em'
            }}>
              一陰一陽<br/>之謂道。
            </div>
          </div>
          <div style={{
            padding: '60px 40px ',
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '10px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              One <em>yin</em> and one <em>yang</em>; that is the <em>Dao</em>.
            </div>
            <div style={{
              fontSize: '20px',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              “Great Commentary”, Part I, Ch. 5
            </div>
          </div>
        </>
      );
    }
    
    if (index === 2) {
      return (
        <>
          {/* Top section - Yin Yang */}
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
              fontWeight: '400',
              color: '#FFF',
              marginBottom: '15px'
            }}>
              「陰陽」與「五行」
            </div>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#FFF',
              fontWeight: '300',
              marginBottom: '20px'
            }}>
              「陰」與「陽」原初分別代表光與影、山川或河流的陰面與陽面。「陰」傳達寒冷、雲霧、雨水和陰暗的意象，而「陽」則傳達溫暖、晴朗、陽光和明亮的意象。<br/><br/>
              「陰」與「陽」是相對的原始力量，需要彼此才能完整。這是透過對立的和諧互補而達成的，構成了道（道路）。<br/><br/>
              「陰」與「陽」的相互作用和交替產生了「五行」——木、火、土、金、水。這五個「元素」進一步代表了宇宙中一切事物的順序或「相生相剋」以及「相生相剋」的關係。因此，古代中國人發展出一套全面的符號關聯體系，以代表世界秩序中普遍存在的統一性和多樣性。
            </div>
          </div>

          {/* Bottom section - English */}
          <div style={{
            height: '50%',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '15px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              Yin Yang and Wu Xing
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              The terms yin 陰 and yang 陽, originally denote the light and the dark, or the shaded and the light sides of a mountain or a river. Yin conveys the idea of coldness, clouds, rain and anything feminine, while yang conveys the opposite idea of warmth, a clear sky, sunshine and anything masculine.<br/><br/>
              Yin and yang are opposing primal forces which need one another for completeness. This is harmony through the complementarity of opposites, which constitutes the Dao (the Way).<br/><br/>
              The interaction and alternation of yin and yang produce the wuxing 五行—the five phases or "elements" of Wood, Fire, Earth, Metal and Water. The five "elements" further represent the sequential orders of "mutual production" and "mutual conquest" of all things in the universe and relationships follow the sequential orders of "mutual production" and "mutual conquest". Hence, the ancient Chinese developed a comprehensive scheme of symbolic correlations to represent a pervading unity and mutuality of order of the world.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 3) {
      return (
        <>
          {/* Top section - Chinese */}
          <div style={{
            flex: 1,
            borderBottom: '1px solid #888',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '400',
              color: '#FFF',
              marginBottom: '20px'
            }}>
              易
            </div>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#FFF',
              fontWeight: '300'
            }}>
              太極（太極）作為原始源頭，既是萬物的起點，也是萬物的終點。創造性轉化的力量導致完成和實現。<br/><br/>
              陰陽文字，為宇宙自然變化過程的兩個方面。它們分別以一條斷線——和一條全線——表示。所有事物和現象都是從這二元對立的力量中自發產生的，並且不斷變化。<br/><br/>
              將「陰」與「陽」以四種可能的方式組合，就有了四象。透過以同樣的過程將陰和陽分別加到四象中的每一個上，就有了八卦。這八個三爻卦，有六十四個六爻卦。
            </div>
          </div>

          {/* Bottom section - English */}
          <div style={{
            flex: 1,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '15px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              Change and Transformation
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
The Supreme Ultimate <em>(taiji)</em> as primal source is both the starting point and the ending point of all things. The power of creative initiation leads to the power of completion and fulfilment.<br/><br/>
<em>Yin</em> and <em>yang</em> animate the natural processes of cosmic change. They are represented by a broken line – – and a full line — respectively. All things and phenomena arise spontaneously from this dualism of forces and are interconnected and constantly changing.<br/><br/>
By combining <em>yin</em> and <em>yang</em> in four possible ways, there are the four images. By adding <em>yin<em> and </em>yang</em> separately to each of the four images, there are the eight trigrams. By the same process of doubling the eight trigrams, there are the sixty-four hexagrams.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 4) {
      return (
        <>
          {/* Top section - Chinese */}
          <div style={{
            flex: 1,
            borderBottom: '1px solid #888',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '400',
              color: '#FFF',
              marginBottom: '20px'
            }}>
              六十四卦
            </div>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#FFF',
              fontWeight: '300'
            }}>
              《易經》中的六十四卦，象徵了宇宙變化的結構與形象。這個符號系統被運用於占卜中。<br/><br/>
              《周易》原文記錄了六十四卦各有的卦象、卦名、卦辭，以及說明每一爻變化的爻辭。<br/><br/>
              六十四卦中每一卦包含兩個單卦，單卦有各自的名稱與象徵意義。由於六爻皆具變動可能，因此每一卦皆呈現一系列可變化的處境序列。<br/><br/>
              對每一卦的詮釋需理解其兩個單掛及六爻相互之間的位置關係，以及卦與卦之間的聯繫。
            </div>
          </div>

          {/* Bottom section - English */}
          <div style={{
            flex: 1,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '15px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              The 64 Hexagrams
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              The 64 hexagrams in the <em>Book of Changes</em> represent symbolically the images and the structure of change in the universe. The system of symbols has been used for divination.<br/><br/>
              In the original <em>Changes of Zhou</em>, each of the 64 hexagrams is given an image, a name, a short prose description called a "judgement" and a reading for each line.<br/><br/>
              Each hexagram contains a pair of trigrams that have individual names and symbols associated with each of the eight trigrams. Each hexagram expresses a series of situations that can change from one into another.<br/><br/>
              Interpretation requires an understanding of the relationships between the trigrams and the lines within each hexagram and an understanding of the various relationships between different hexagrams.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 5) {
      return (
        <>
          {/* Top section - Chinese */}
          <div style={{
            flex: 1,
            borderBottom: '1px solid #888',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '400',
              color: '#FFF',
              marginBottom: '20px'
            }}>
              天、地、人
            </div>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#FFF',
              fontWeight: '300'
            }}>
              《易經》的內容強調了「天、地、人」三才的互動和合一，亦即在天地之間讓人類安身立命。它更着重提出德行是達致宇宙秩序與個人福祉的關鍵。<br/><br/>
                卜卦問事因此讓人們把自身處境與六十四卦的自然現象相互參照，通過分析卦象、卦辭與爻辭指引人們如何行事，藉以在不同處境中實現自我。這為判斷占卜結果的吉凶賦予了道德層面的意義。<br/><br/>
                如此一來，占卜以尋求啟示，使人得以參與天地變化的整體過程中，以達致和諧合一。這種思維方式彰顯了人類的能動力在掌握未來的重要性。
            </div>
          </div>

          {/* Bottom section - English */}
          <div style={{
            flex: 1,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '15px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              Heaven, Earth, and Humanity
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              The <em>Book of Changes</em> stresses the unity and dynamic interaction between the three cosmic powers of Heaven, Earth, and Humanity—the way Humanity finds its place between Heaven and Earth. It further emphasises morality as the key to cosmic order and individual wellbeing.<br/><br/>
              The practice of divination offers the opportunity for humans to relate their situations to the natural phenomena of the hexagrams. The images and the lines guide human actions for self-realisation in each divine situation. They provide a moral relevance to the judgements of fortune and misfortune.<br/><br/>
              In this way, the counsels for actions enable human participation in the totality of cosmic change for harmony and unity. This way of thinking underlines the importance of human agency in the art of knowing and mastering the future.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 6) {
      return (
        <>
          {/* Top section - Chinese */}
          <div style={{
            flex: 1,
            borderBottom: '1px solid #888',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '400',
              color: '#FFF',
              marginBottom: '20px'
            }}>
              《易經》與術數
            </div>
            <div style={{
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#FFF',
              fontWeight: '300'
            }}>
              《易經》揭示出古代中國人如何建構出一套數字體系，用作命理占卜以及解釋自然運行規律。<br/><br/>
「河圖」與「洛書」是兩幅中國古代的圖像，代表了對自然秩序的數字詮釋。這兩幅圖像自古流傳，至宋代（960–1279年）增補至《易經》之中。它們與「五行」以及各種對應系統如方位、顏色、干支曆法等相互關聯，以呈現天地萬物在整體規律中的相互依存性。            </div>
          </div>

          {/* Bottom section - English */}
          <div style={{
            flex: 1,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#FFF',
              marginBottom: '15px',
              fontFamily: '"neue-haas-unica", sans-serif'
            }}>
              The Book of Changes and Numerology
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
The Book of Changes reveals how the ancient Chinese developed a numerical system that could be used for divination and explaining the operations of nature.          <br/><br/>    Two ancient Chinese diagrams, Yellow River Chart and Writing from the Luo River, represent the numbers of the natural order. Both diagrams, as received from antiquity, had been appended to the Book of Changes by the Song period (960–1279). They were linked to the five phases (wuxing) and the different correlational systems—such as, cardinal point, colour, and the calendrical system of Chinese calendar—to represent the interconnectedness of all things in a holistic totality of order.
            </div>
          </div>
        </>
      );
    }
    
    if (index === 7) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '60px 40px',
          justifyContent: 'space-between'
        }}>
          {/* Chinese text at top-right */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '28px',
              lineHeight: '1.4',
              letterSpacing: '0.1em',
              color: '#FFF',
              fontWeight: '300'
            }}>
              <span style={{marginTop: "-18px"}}>  </span>﹁河圖﹂相傳是伏羲所創。<br/>圖中一至十以奇數︵陽︶<br/>與偶數︵陰︶成對排列。<br/>所有奇數相加總和是<br/>二十五，偶數相加是三十，<br/>全部數字總和是五十五。<br/>此圖揭示了這些數字<br/>如何與﹁五行﹂及對應的<br/>方位和顏色相互連結。
            </div>
          </div>

          {/* English text at bottom */}
          <div style={{
            fontSize: '14px',
            lineHeight: '1.4',
            color: '#FFF',
            fontFamily: '"neue-haas-unica", sans-serif',
            fontWeight: '300'
          }}>
The Yellow River Chart has been traditionally attributed to the legendary emperor Fu Xi. Here, the numbers 1 to 10 are so arranged that an odd number (yang) is paired with an even number (yin). All the odd numbers add up to 25, the even numbers to 30, and all the numbers to 55. This chart shows how these numbers are linked to the wuxing and the correlating cardinal points and colours.
          </div>
        </div>
      );
    }
    
    if (index === 8) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '60px 40px',
          justifyContent: 'space-between'
        }}>
          {/* Chinese text at top-right */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              fontSize: '28px',
              lineHeight: '1.4',
              letterSpacing: '0.1em',
              color: '#FFF',
              fontWeight: '300'
            }}>
              
              <span style={{marginTop: "-18px"}}>  </span>﹁洛書﹂相傳是一隻從<br/>洛河出現的神龜背上的圖。<br/>此圖為三階幻方，無論<br/>縱、橫、斜向任意行列，<br/>字之和數皆為十五。這是<br/>已知世上最早的幻方。
            </div>
          </div>

          {/* English text at bottom */}
          <div style={{
            fontSize: '14px',
            lineHeight: '1.4',
            color: '#FFF',
            fontFamily: '"neue-haas-unica", sans-serif',
            fontWeight: '300'
          }}>
The Writing from the Luo River is attributed to a mythical turtle with a diagram on its back emerging from the Luo River. This diagram is a magic square of the order of three, in which all the numbers in any row, column, or diagonal add up to 15. It is the earliest known magic square in the world.           </div>
        </div>
      );
    }
    
    if (index === 9) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '120px 40px',
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
                width: '80%',
                height: 'auto',
                maxHeight: '60%',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: '#FFF',
              fontFamily: '"neue-haas-unica", sans-serif',
              fontWeight: '300'
            }}>
              <span style={{ fontWeight: '500' }}>Fortune Teller</span><br/>
              Robert Ruxton (1876-1946)<br/>
              1902<br/>
              SOAS Library
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: '14px',
              lineHeight: '1.4',
              letterSpacing: '0.25em',
              color: '#FFF',
              fontWeight: '300'
            }}>
              <span style={{marginTop: '-6px'}}></span>︽算命師︾<br/>羅伯特·魯克斯頓<br/><span style={{marginTop: '-6px'}}></span>︵1876–1946年︶<br/>1902年 <br/>倫敦大學<br/>亞非學院圖書館
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return;
      
      scrollLockRef.current = true;
      
      if (e.deltaY > 0 && currentSlide < 9) {
        // Scroll down - next slide
        setCurrentSlide(prev => Math.min(prev + 1, 9));
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
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
                justifyContent: (index >= 1 && index <= 9) ? 'center' : 'space-between',
                padding: (index === 0) ? '120px 40px 60px' : (index >= 1 && index <= 9) ? '0' : '120px 40px 60px',
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
          pointerEvents: 'none',
          opacity: currentSlide > 0 ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
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
          paddingBottom: '55px'
        }}
      >
        {/* Navigation dots */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '30px'
        }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: currentSlide === index ? '#FFF' : 'transparent',
                border: currentSlide === index ? 'none' : '1px solid #FFF',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, border 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Next/Back button */}
        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontSize: '14px',
            letterSpacing: '0.1em',
            color: '#FFF',
            cursor: 'pointer'
          }}
          onClick={() => {
            if (currentSlide < 9) {
              setCurrentSlide(currentSlide + 1);
            } else {
              setCurrentSlide(0);
            }
          }}
        >
          {currentSlide === 9 ? (
            <>第一章 <span style={{ fontFamily: '"neue-haas-unica", sans-serif', fontWeight: '300', marginLeft: '-5px' }}>Back</span></>
          ) : (
            <>下一章 <span style={{ fontFamily: '"neue-haas-unica", sans-serif', fontWeight: '300', marginLeft: '-5px' }}>Next</span></>
          )}
        </div>
      </div>
    </div>
  );
}
