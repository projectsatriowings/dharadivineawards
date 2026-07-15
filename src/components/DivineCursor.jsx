import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function DivineCursor() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // If it's a touch device, disable cursor trail to keep mobile performance optimal
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Inject CSS to hide default cursor globally
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      body, a, button, [role="button"], select, input, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    let animationFrameId;
    let particles = [];
    let mouse = { x: 0, y: 0, active: false, hovering: false };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Check if hovering over clickable/interactive element
      const target = e.target;
      if (target) {
        const isClickable = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') || 
          target.closest('.cursor-pointer') ||
          target.closest('.btn') ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        mouse.hovering = !!isClickable;
      }

      // Spawn 1-2 particles per mouse movement
      if (Math.random() < 0.6) {
        particles.push(createParticle(mouse.x, mouse.y));
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    function createParticle(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.8;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4, // float upwards slightly
        size: 2 + Math.random() * 3,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.015,
        // Saffron/gold colors matching the theme
        color: Math.random() < 0.6 ? '#E2B857' : '#F58A27',
        type: Math.random() < 0.3 ? 'star' : 'dot'
      };
    }

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      
      // Shadow & fill
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(64, 28, 12, 0.4)';
      ctx.fillStyle = color;
      ctx.fill();
      
      // Outline to stand out on white
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = `rgba(64, 28, 12, ${alpha * 0.25})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      
      ctx.restore();
    }

    let cursorPulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cursorPulse += 0.05;

      // Update and draw particles first (so they sit behind the custom cursor tip)
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, 4, p.size, p.size / 2.5, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          
          // Shadow & fill
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(64, 28, 12, 0.4)';
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Outline to stand out on white
          ctx.shadowColor = 'transparent';
          ctx.strokeStyle = `rgba(64, 28, 12, ${p.alpha * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          
          ctx.restore();
        }

        return true;
      });

      // Draw custom glowing cursor pointer & aura
      if (mouse.active) {
        const targetRadius = mouse.hovering ? 20 + Math.sin(cursorPulse) * 2 : 12;
        const targetInnerSize = mouse.hovering ? 6 : 4;
        
        ctx.save();
        
        // 1. Draw glowing outer halo
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, targetRadius
        );
        gradient.addColorStop(0, 'rgba(226, 184, 87, 0.35)');
        gradient.addColorStop(0.5, 'rgba(245, 138, 39, 0.12)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(mouse.x, mouse.y, targetRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw custom interactive ring if hovering
        if (mouse.hovering) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(226, 184, 87, 0.45)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // 3. Draw bright golden center dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, targetInnerSize / 2, 0, Math.PI * 2);
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#F58A27';
        ctx.fillStyle = '#E2B857';
        ctx.fill();

        // Subtle dark outline on the center dot to ensure it pops on pure white
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(64, 28, 12, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      styleEl.remove();
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999
      }}
    />,
    document.body
  );
}
