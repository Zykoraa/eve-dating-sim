import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
  color: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface ParticleAtmosphereProps {
  background: string;
}

export const ParticleAtmosphere: React.FC<ParticleAtmosphereProps> = ({ background }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const bg = background.toLowerCase();
    const isPetals = bg.includes('park') || bg.includes('cafe');
    const isRain = bg.includes('rooftop') || bg.includes('street');
    const isClub = bg.includes('club') || bg.includes('punk');

    // Generate particles
    const count = isRain ? 45 : isPetals ? 25 : isClub ? 35 : 20;
    const particles: Particle[] = Array.from({ length: count }, () => {
      if (isRain) {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: -0.5 - Math.random() * 1,
          speedY: 8 + Math.random() * 6,
          size: 1.5 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.4,
          color: '#38bdf8',
        };
      } else if (isPetals) {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: 0.8 + Math.random() * 1.2,
          speedY: 0.6 + Math.random() * 1.0,
          size: 4 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.5,
          color: Math.random() > 0.5 ? '#f472b6' : '#c084fc',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
        };
      } else if (isClub) {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: -0.8 - Math.random() * 1.2,
          size: 2 + Math.random() * 4,
          opacity: 0.2 + Math.random() * 0.4,
          color: Math.random() > 0.5 ? '#ec4899' : '#a855f7',
        };
      } else {
        // Golden room dust motes
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -0.2 - Math.random() * 0.4,
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.2 + Math.random() * 0.35,
          color: '#fef08a',
        };
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y > height) p.y = -10;
        if (p.y < -10) p.y = height;
        if (p.x > width) p.x = -10;
        if (p.x < -10) p.x = width;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (isPetals) {
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (isRain) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.speedY * 2);
          ctx.stroke();
        } else {
          // Circular glow mote
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [background]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
