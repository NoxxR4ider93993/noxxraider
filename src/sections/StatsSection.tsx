import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '< 90ms', label: 'Average response' },
  { value: '50,000+', label: 'Bans/hour capacity' },
  { value: '99.99%', label: 'Uptime' },
  { value: '24/7', label: 'Monitoring' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        { scale: 0.85, opacity: 0, rotateZ: -3 },
        { scale: 1, opacity: 1, rotateZ: 0, ease: 'none' },
        0
      );

      // Stats blocks
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          scrollTl.fromTo(
            stat,
            { opacity: 0, y: '6vh', scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, ease: 'none' },
            i * 0.02
          );
        }
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.to(
        portraitRef.current,
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      statsRef.current.forEach((stat) => {
        if (stat) {
          scrollTl.to(stat, { opacity: 0, y: '-4vh', ease: 'power2.in' }, 0.7);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatPosition = (index: number) => {
    const positions = [
      'left-[15vw] top-[18vh]',
      'right-[15vw] top-[18vh]',
      'left-[15vw] bottom-[18vh]',
      'right-[15vw] bottom-[18vh]',
    ];
    return positions[index];
  };

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section-pinned bg-primary-dark flex items-center justify-center"
    >
      {/* Horizontal Glow Band */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-32 bg-horizontal-glow pointer-events-none" />

      {/* Center Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22vw] max-w-[280px] h-[34vh] max-h-[380px] border border-[#B14BFF]/40 glow-accent"
        style={{ background: 'rgba(11, 14, 31, 0.6)' }}
      >
        <img
          src="/stats_center.jpg"
          alt="Stats"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stat Blocks */}
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          ref={(el) => { statsRef.current[i] = el; }}
          className={`absolute ${getStatPosition(i)} text-center`}
        >
          <div className="hud-card min-w-[140px] px-6 py-4">
            <div className="font-display text-[clamp(24px,4vw,48px)] font-black text-[#B14BFF] tracking-wider glow-text">
              {stat.value}
            </div>
            <div className="font-mono text-xs tracking-wider text-[#A7B0D5] uppercase mt-2">
              {stat.label}
            </div>
          </div>
        </div>
      ))}

      {/* Section Label */}
      <div className="absolute top-[10vh] left-1/2 -translate-x-1/2">
        <span className="font-mono text-xs tracking-[0.14em] text-[#A7B0D5] uppercase">
          Performance Metrics
        </span>
      </div>
    </section>
  );
};

export default StatsSection;
