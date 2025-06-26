import React from 'react';

type LogoVariant = 'primary' | 'textWhite' | 'textBlack';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const Logo = ({ variant = 'primary', className = '', size = 'md', style = {} }: LogoProps) => {
  // Font size mapping
  const fontSizeMap = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.75rem'
  };

  // Height mapping
  const heightMap = {
    sm: '32px',
    md: '40px',
    lg: '56px'
  };

  // Letter spacing for the text
  const letterSpacing = '0.05em';

  // For the primary variant (blue capsule with white text)
  if (variant === 'primary') {
    return (
      <div 
        className={`inline-flex items-center justify-center font-bold ${className}`}
        style={{
          backgroundColor: '#0077D8',
          color: 'white',
          borderRadius: '9999px',
          padding: size === 'sm' ? '0.3rem 0.8rem' : size === 'md' ? '0.5rem 1.2rem' : '0.6rem 1.5rem',
          fontSize: fontSizeMap[size],
          height: heightMap[size],
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: letterSpacing,
          boxShadow: '0 2px 6px rgba(0,119,216,0.25)',
          fontWeight: 'bold',
          ...style
        }}
      >
        MINIMIND
      </div>
    );
  }

  // For text-only variants
  const textColor = variant === 'textWhite' ? 'white' : 'black';
  
  return (
    <div 
      className={`font-bold ${className}`}
      style={{
        color: textColor,
        fontSize: fontSizeMap[size],
        letterSpacing: letterSpacing,
        fontWeight: 'bold',
        ...style
      }}
    >
      MINIMIND
    </div>
  );
};

export default Logo;