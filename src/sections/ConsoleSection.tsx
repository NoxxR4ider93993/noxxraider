import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, MessageSquare, Users, Lock, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const responseCards = [
  { icon: MessageSquare, label: 'Deleted 1,247 messages', position: 'tl' },
  { icon: Users, label: 'Users scanned: 8,903', position: 'tr' },
  { icon: Lock, label: 'Channels locked: 12', position: 'bl' },
  { icon: Clock, label: 'Undo available: 24h', position: 'br' },
];

const ConsoleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const commandBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Portrait
      scrollTl.fromTo(
        portraitRef.current,
        { y: '18vh', opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Command bar
      scrollTl.fromTo(
        commandBarRef.current,
        { y: '10vh', opacity: 0, scaleX: 0.85 },
        { y: 0, opacity: 1, scaleX: 1, ease: 'none' },
        0.05
      );

      // Response cards with stagger
      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { scale: 0.85, opacity: 0, y: '4vh' },
            { scale: 1, opacity: 1, y: 0, ease: 'none' },
            0.1 + i * 0.03
          );
        }
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.to(
        portraitRef.current,
        { y: '-10vh', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(
        commandBarRef.current,
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card) => {
        if (card) {
          scrollTl.to(card, { scale: 0.95, opacity: 0, y: '-3vh', ease: 'power2.in' }, 0.7);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardPosition = (position: string) => {
    switch (position) {
      case 'tl':
        return 'left-[12vw] top-[22vh]';
      case 'tr':
        return 'right-[12vw] top-[22vh]';
      case 'bl':
        return 'left-[12vw] bottom-[22vh]';
      case 'br':
        return 'right-[12vw] bottom-[22vh]';
      default:
        return '';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="console"
      className="section-pinned bg-primary-dark grid-bg flex items-center justify-center"
    >
      {/* Center Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[28vw] max-w-[350px] h-[44vh] max-h-[450px] border border-[#B14BFF]/40"
        style={{ background: 'rgba(11, 14, 31, 0.6)' }}
      >
        <img
          src="/console_center.jpg"
          alt="Console"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Command Input Bar */}
      <div
        ref={commandBarRef}
        className="absolute left-1/2 top-[72%] -translate-x-1/2 w-[44vw] max-w-[600px] min-w-[300px]"
      >
        <div className="relative flex items-center gap-3 px-4 py-3 border border-[#B14BFF]/40 bg-[#0B0E1F]/80 backdrop-blur-sm">
          <Terminal className="w-5 h-5 text-[#B14BFF] flex-shrink-0" />
          <span className="font-mono text-sm text-[#F2F4FF]">
            /cleanup spam --channel #general --confirm
          </span>
          <span className="absolute right-4 w-2 h-5 bg-[#B14BFF] animate-pulse" />
        </div>
        <p className="font-mono text-xs text-[#A7B0D5] mt-2 text-center">
          Type commands to control your server
        </p>
      </div>

      {/* Response Cards */}
      {responseCards.map((card, i) => (
        <div
          key={card.label}
          ref={(el) => { cardsRef.current[i] = el; }}
          className={`absolute ${getCardPosition(card.position)} hud-card w-[18vw] min-w-[180px] flex items-center gap-3`}
        >
          <card.icon className="w-5 h-5 text-[#B14BFF] flex-shrink-0" />
          <span className="font-mono text-sm text-[#F2F4FF]">{card.label}</span>
        </div>
      ))}

      {/* Section Label */}
      <div className="absolute top-[10vh] left-1/2 -translate-x-1/2">
        <span className="font-mono text-xs tracking-[0.14em] text-[#A7B0D5] uppercase">
          Command Console
        </span>
      </div>
    </section>
  );
};

export default ConsoleSection;
