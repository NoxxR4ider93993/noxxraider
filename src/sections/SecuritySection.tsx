import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, RotateCcw, Lock, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  { icon: Gauge, label: 'Rate Limits', desc: 'Prevents API abuse', position: 'top' },
  { icon: RotateCcw, label: 'Undo Window', desc: '24h rollback', position: 'bottom' },
  { icon: Lock, label: 'Role Gates', desc: 'Admin-only commands', position: 'left' },
  { icon: ClipboardList, label: 'Audit Logs', desc: 'Full transparency', position: 'right' },
];

const SecuritySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
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
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Ring
      scrollTl.fromTo(
        ringRef.current,
        { scale: 0.9, opacity: 0, rotateZ: -10 },
        { scale: 1, opacity: 1, rotateZ: 0, ease: 'none' },
        0
      );

      // Security cards with stagger (clockwise from top)
      cardsRef.current.forEach((card, i) => {
        if (card) {
          const isVertical = i === 0 || i === 1;
          scrollTl.fromTo(
            card,
            {
              opacity: 0,
              scale: 0.9,
              y: isVertical ? '4vh' : 0,
              x: !isVertical ? (i === 2 ? '-4vw' : '4vw') : 0,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              ease: 'none',
            },
            0.05 + i * 0.03
          );
        }
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.to(
        portraitRef.current,
        { opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(
        ringRef.current,
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card) => {
        if (card) {
          scrollTl.to(card, { opacity: 0, scale: 0.98, ease: 'power2.in' }, 0.7);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardPosition = (position: string) => {
    switch (position) {
      case 'top':
        return 'left-1/2 -translate-x-1/2 top-[12vh]';
      case 'bottom':
        return 'left-1/2 -translate-x-1/2 bottom-[12vh]';
      case 'left':
        return 'left-[10vw] top-1/2 -translate-y-1/2';
      case 'right':
        return 'right-[10vw] top-1/2 -translate-y-1/2';
      default:
        return '';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="security"
      className="section-pinned bg-primary-dark bg-radial-center flex items-center justify-center"
    >
      {/* Shield Ring SVG */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] pointer-events-none"
        viewBox="0 0 200 200"
      >
        <circle
          ref={ringRef}
          cx="100"
          cy="100"
          r="95"
          className="shield-ring"
          style={{
            strokeDasharray: '10 5',
            opacity: 0.6,
          }}
        />
      </svg>

      {/* Center Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26vw] max-w-[320px] h-[40vh] max-h-[440px] border border-[#B14BFF]/40 glow-accent"
        style={{ background: 'rgba(11, 14, 31, 0.6)' }}
      >
        <img
          src="/security_center.jpg"
          alt="Security"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Security Cards */}
      {securityFeatures.map((feature, i) => (
        <div
          key={feature.label}
          ref={(el) => { cardsRef.current[i] = el; }}
          className={`absolute ${getCardPosition(feature.position)} hud-card w-[18vw] min-w-[180px] text-center`}
        >
          <feature.icon className="w-6 h-6 text-[#B14BFF] mx-auto mb-2" />
          <h3 className="font-display text-sm tracking-wider text-[#F2F4FF] mb-1">
            {feature.label}
          </h3>
          <p className="font-mono text-xs text-[#A7B0D5]">{feature.desc}</p>
        </div>
      ))}

      {/* Section Label */}
      <div className="absolute top-[10vh] left-1/2 -translate-x-1/2">
        <span className="font-mono text-xs tracking-[0.14em] text-[#A7B0D5] uppercase">
          Security & Safety
        </span>
      </div>
    </section>
  );
};

export default SecuritySection;
