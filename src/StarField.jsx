import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';

const STAR_COUNT = 40;
const COLORS = [
  'text-blue-100',
  'text-blue-200',
  'text-yellow-200',
  'text-white/80',
];
const SIZES = ['w-3 h-3', 'w-2 h-2', 'w-4 h-4', 'w-2.5 h-2.5'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function StarField() {
  const starsRef = useRef([]);

  useEffect(() => {
    starsRef.current.forEach((el, i) => {
      if (!el) return;
      // Fade-in initial
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1, delay: i * 0.03 });
      // Scintillement infini
      gsap.to(el, {
        opacity: random(0.5, 1),
        scale: random(0.7, 1.2),
        yoyo: true,
        repeat: -1,
        duration: random(1.5, 3.5),
        delay: random(0, 2),
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const top = random(0, 100);
        const left = random(0, 100);
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = SIZES[Math.floor(Math.random() * SIZES.length)];
        return (
          <Star
            key={i}
            ref={el => (starsRef.current[i] = el)}
            className={`absolute ${color} ${size}`}
            style={{ top: `${top}%`, left: `${left}%`, opacity: 0 }}
            strokeWidth={1}
            fill="currentColor"
          />
        );
      })}
    </div>
  );
} 