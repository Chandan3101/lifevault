import React, { useEffect, useState } from 'react';
import { useVault } from '../context/VaultContext';

export const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useVault();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: isDark
            ? 'radial-gradient(circle, rgba(22, 196, 127, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(22, 196, 127, 0.12) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 70%)',
          transition: 'left 0.05s ease-out, top 0.05s ease-out',
        }}
      />
    </div>
  );
};
