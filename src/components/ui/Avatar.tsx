import React from 'react';
import { AvatarExpression } from '../../types';

interface AvatarProps {
  expression?: AvatarExpression | 'curious';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

const Avatar = ({ 
  expression = 'neutral', 
  size = 'md', 
  className = '',
  style = {},
  animate = true 
}: AvatarProps) => {
  // Map sizes to dimensions
  const sizePx = {
    xs: '32px',
    sm: '48px',
    md: '72px',
    lg: '120px',
    xl: '160px'
  };

  // Map expressions to image files in the public directory
  // Use the actual file names from the asset/faces folder
  const expressionToImage = {
    neutral: '/asset/faces/default.png',
    happy: '/asset/faces/joyful.png',
    angry: '/asset/faces/angry.png',
    thinking: '/asset/faces/confused.png',
    cool: '/asset/faces/proud.png',
    excited: '/asset/faces/smile.png',
    starEyes: '/asset/faces/joyful.png',
    confused: '/asset/faces/confused2.png',
    sleeping: '/asset/faces/sleep.png',
    // Add 'curious' expression and map it to an existing image
    curious: '/asset/faces/confused.png',
    frown: '/asset/faces/frown.png',
    smile: '/asset/faces/smile.png',
    proud: '/asset/faces/proud.png'
  };

  // Make sure we have a valid image path, fallback to default if not
  const imagePath = expressionToImage[expression as keyof typeof expressionToImage] || '/asset/faces/default.png';

  return (
    <div 
      className={className}
      style={{
        width: sizePx[size],
        height: sizePx[size],
        borderRadius: '50%',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: 'none',
        position: 'relative',
        border: 'none',
        padding: 0,
        ...style
      }}
    >
      <img 
        src={imagePath} 
        alt={`Avatar with ${expression} expression`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          display: 'block',
          border: 'none',
          margin: '0 auto'
        }}
      />
      </div>
  );
};

export default Avatar;