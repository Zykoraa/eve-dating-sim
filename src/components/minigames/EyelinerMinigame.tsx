import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, RotateCcw, X, Award } from 'lucide-react';
import { useGameStore } from '../../state/useGameStore';
import { soundEngine } from '../../state/useAudioStore';
import confetti from 'canvas-confetti';

export const EyelinerMinigame: React.FC = () => {
  const { modifyStats, setViewMode } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('Gently trace along the dashed curve to draw Eve’s winged eyeliner.');

  // Initialize canvas with eye outline and guideline
  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Eye silhouette base
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(width * 0.45, height * 0.55, width * 0.3, height * 0.2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Iris
    ctx.fillStyle = 'rgba(192, 132, 252, 0.4)';
    ctx.beginPath();
    ctx.arc(width * 0.45, height * 0.55, height * 0.14, 0, Math.PI * 2);
    ctx.fill();

    // Eyelash baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width * 0.18, height * 0.55);
    ctx.quadraticCurveTo(width * 0.45, height * 0.35, width * 0.72, height * 0.53);
    ctx.stroke();

    // Target dotted winged curve
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(width * 0.55, height * 0.42);
    ctx.quadraticCurveTo(width * 0.72, height * 0.45, width * 0.88, height * 0.30);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGuide(ctx, canvas.width, canvas.height);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setDrawnPoints([{ x, y }]);
    soundEngine.playClick();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoints = [...drawnPoints, { x, y }];
    setDrawnPoints(newPoints);

    // Redraw
    drawGuide(ctx, canvas.width, canvas.height);

    // Draw user line
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    newPoints.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (drawnPoints.length < 10) {
      setFeedback('Too short! Try a smooth, sweeping stroke along the wing line.');
      return;
    }

    // Evaluate accuracy
    const canvas = canvasRef.current;
    if (!canvas) return;
    const endPoint = drawnPoints[drawnPoints.length - 1];
    const targetEndX = canvas.width * 0.88;
    const targetEndY = canvas.height * 0.30;

    const distance = Math.hypot(endPoint.x - targetEndX, endPoint.y - targetEndY);
    const calculatedScore = Math.max(60, Math.min(100, Math.round(100 - distance * 0.8)));
    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      soundEngine.playVictory();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      modifyStats({ glamRating: 15, confidence: 10 });
      setFeedback('Sharp enough to cut glass! Gorgeous winged eyeliner achieved. +15 Glam & +10 Confidence!');
    } else {
      soundEngine.playSparkle();
      modifyStats({ glamRating: 8, confidence: 5 });
      setFeedback('A soft, natural smoky wing! Good effort! +8 Glam & +5 Confidence.');
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setDrawnPoints([]);
    setScore(null);
    setFeedback('Gently trace along the dashed curve to draw Eve’s winged eyeliner.');
    drawGuide(ctx, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-pink-500/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-slate-100">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-pink-300">Winged Eyeliner Practice</h2>
              <span className="text-[11px] text-slate-400">Steady hands • Steady self-love</span>
            </div>
          </div>

          <button
            onClick={() => setViewMode('vanity')}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="relative bg-slate-950 rounded-2xl border border-white/10 p-2 shadow-inner overflow-hidden">
          <canvas
            ref={canvasRef}
            width={380}
            height={240}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="touch-none cursor-crosshair rounded-xl bg-slate-950"
          />
          <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 pointer-events-none">
            Dashed Pink: Target Cat-Eye Wing
          </div>
        </div>

        {/* Score & Feedback */}
        <div className="w-full my-4 p-3 bg-pink-950/30 border border-pink-500/30 rounded-2xl text-center space-y-1">
          {score !== null && (
            <div className="text-lg font-black font-mono text-pink-400 flex items-center justify-center gap-1.5">
              <Award className="w-5 h-5" />
              <span>Wing Precision: {score}%</span>
            </div>
          )}
          <p className="text-xs text-pink-200">{feedback}</p>
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => setViewMode('vanity')}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 hover:brightness-110 transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply to Vanity</span>
          </button>
        </div>
      </div>
    </div>
  );
};
