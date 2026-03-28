import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Server, Shield, AlertTriangle, Lock, UserX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const logEntries = [
  { time: '14:02', action: 'Banned 412 accounts', server: 'AlphaHub', icon: UserX },
  { time: '14:04', action: 'Locked 6 channels', server: 'DevDen', icon: Lock },
  { time: '14:07', action: 'Role cleanup completed', server: 'ModZone', icon: Shield },
  { time: '14:09', action: 'Anti-spam triggered', server: 'ChillStack', icon: AlertTriangle },
  { time: '14:12', action: 'Raid detection alert', server: 'GamingHub', icon: Activity },
  { time: '14:15', action: 'Mass ban executed', server: 'TechTalk', icon: UserX },
  { time: '14:18', action: 'Channel unlock', server: 'AlphaHub', icon: Lock },
  { time: '14:22', action: 'Audit log exported', server: 'DevDen', icon: Server },
];

const FeedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const logPanelRef = useRef<HTMLDivElement>(null);
  const imageCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Log panel animation
      gsap.fromTo(
        logPanelRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: logPanelRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image cards animation
      imageCardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: '8vh', opacity: 0, rotateZ: -1 },
            {
              y: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 0.8,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feed"
      className="relative bg-primary-dark py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-[#F2F4FF] tracking-wider mb-4">
            Live Raid Feed
          </h2>
          <p className="font-mono text-sm text-[#A7B0D5] max-w-md mx-auto">
            Recent actions across servers using NoxxRaider.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Log Panel */}
          <div
            ref={logPanelRef}
            className="border border-[#B14BFF]/30 bg-[#0B0E1F]/60 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#B14BFF]/20">
              <Activity className="w-5 h-5 text-[#B14BFF]" />
              <span className="font-mono text-sm text-[#F2F4FF]">System Activity</span>
            </div>
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
              {logEntries.map((entry, i) => (
                <div
                  key={i}
                  className="log-entry flex items-center gap-3 hover:bg-[#B14BFF]/5 transition-colors"
                >
                  <entry.icon className="w-4 h-4 text-[#B14BFF] flex-shrink-0" />
                  <span className="text-[#A7B0D5] text-xs">[{entry.time}]</span>
                  <span className="text-[#F2F4FF] text-sm flex-1">{entry.action}</span>
                  <span className="text-[#B14BFF] text-xs">— {entry.server}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Cards */}
          <div className="space-y-6">
            <div
              ref={(el) => { imageCardsRef.current[0] = el; }}
              className="relative aspect-video border border-[#B14BFF]/30 overflow-hidden group"
            >
              <img
                src="/feed_image_01.jpg"
                alt="Moderation Dashboard"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060B]/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-xs text-[#A7B0D5]">
                  Moderation team dashboard
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                ref={(el) => { imageCardsRef.current[1] = el; }}
                className="relative aspect-video border border-[#B14BFF]/30 overflow-hidden group"
              >
                <img
                  src="/feed_image_02.jpg"
                  alt="Server Lockdown"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060B]/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-mono text-xs text-[#A7B0D5]">
                    Server lockdown
                  </span>
                </div>
              </div>

              <div
                ref={(el) => { imageCardsRef.current[2] = el; }}
                className="relative aspect-video border border-[#B14BFF]/30 overflow-hidden group"
              >
                <img
                  src="/feed_image_03.jpg"
                  alt="Audit Review"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060B]/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-mono text-xs text-[#A7B0D5]">
                    Post-raid audit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedSection;
