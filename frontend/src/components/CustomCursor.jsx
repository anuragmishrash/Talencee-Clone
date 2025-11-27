import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// WHY: Custom animated cursor component to make the website unique
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // WHY: Track mouse movement to update cursor position
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // WHY: Detect when hovering over interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.style.cursor === 'pointer' ||
        e.target.onclick
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // WHY: Detect mouse clicks for animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          position: 'fixed',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)',
        }}
      />

      {/* Cursor ring/outline */}
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #F59E0B',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.7,
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)',
        }}
      />

      {/* Trailing effect */}
      <motion.div
        className="custom-cursor-trail"
        animate={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
          mass: 1,
        }}
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25), transparent)',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
    </>
  );
};

export default CustomCursor;
