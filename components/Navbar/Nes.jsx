"use client";
import React, { useEffect, useState } from 'react';

const ScrollColorToggle = () => {
  const [isBlackBackground, setIsBlackBackground] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Adjust this threshold based on your design
      const threshold = 100;

      if (scrollPosition > threshold && isBlackBackground) {
        setIsBlackBackground(false);
      } else if (scrollPosition <= threshold && !isBlackBackground) {
        setIsBlackBackground(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlackBackground]);

  const backgroundColor = isBlackBackground ? 'black' : 'white';
  const textColor = isBlackBackground ? 'white' : 'black';

  return (
    <div
      style={{
        position:"fixed",
        backgroundColor,
        color: textColor,
        padding: '20px',
        textAlign: 'center',
        height: '200vh', // Add some content to make scrolling visible
      }}
    >
      Scroll to toggle colors!
    </div>
  );
};

export default ScrollColorToggle;
