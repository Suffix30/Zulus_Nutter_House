import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WheelProps } from '../../types';
import { calculateSpinSpeed, calculateDeceleration, selectRandomPlayers, drawWheel } from '../../utils/wheelAnimation';
import './Wheel.css';

const Wheel: React.FC<WheelProps> = ({ isSpinning, names, onSpinComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const spinSpeedRef = useRef(0);
  const requestRef = useRef<number>();

  const spin = useCallback(() => {
    const currentSpinSpeed = spinSpeedRef.current;
    if (currentSpinSpeed > 0.1) {
      setRotation(oldRotation => oldRotation + currentSpinSpeed);
      spinSpeedRef.current = calculateDeceleration(currentSpinSpeed);
      requestRef.current = requestAnimationFrame(spin);
    } else {
      spinSpeedRef.current = 0;
      cancelAnimationFrame(requestRef.current!);
      if (isSpinning && onSpinComplete && names.length > 0) {
        const selectedPlayers = selectRandomPlayers(names, 1);
        onSpinComplete(selectedPlayers);
      }
    }
  }, [isSpinning, onSpinComplete, names]);

  useEffect(() => {
    if (isSpinning) {
      spinSpeedRef.current = calculateSpinSpeed();
      requestRef.current = requestAnimationFrame(spin);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isSpinning, spin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && names.length) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      drawWheel(ctx, names, rotation, centerX, centerY, radius);
    }
  }, [names, rotation]);

  return (
    <motion.div 
      className={`wheel-container ${isSpinning ? 'spinning' : ''}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="wheel-canvas"
      />
      <div className="wheel-pointer" />
    </motion.div>
  );
};

export default Wheel;