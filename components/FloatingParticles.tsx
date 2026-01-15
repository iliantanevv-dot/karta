
import React from 'react';

const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20 text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          {['✨', '💫', '🌸', '🌈', '🎨', '🌟'][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
