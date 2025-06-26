import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'interestTopic' | 'socialLogin' | 'icon';

interface ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  selected?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const Button = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  selected = false,
  fullWidth = false,
  style = {},
}: ButtonProps) => {
  const getButtonStyles = (): React.CSSProperties => {
    // Base styles
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      transition: 'all 0.2s',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
      outline: 'none',
    };

    // Variant-specific styles
    const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: '#0077D8',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',
        padding: '0.875rem 1.75rem',
        boxShadow: '0 2px 8px rgba(0,119,216,0.3)',
        fontSize: '1.05rem',
        letterSpacing: '0.02em',
      },
      secondary: {
        backgroundColor: 'white',
        color: '#0077D8',
        border: '2px solid #0077D8',
        borderRadius: '9999px',
        padding: '0.75rem 1.5rem',
      },
      interestTopic: selected 
        ? {
            backgroundColor: '#0077D8',
            color: 'white',
            border: '1px solid #0077D8',
            borderRadius: '9999px',
            padding: '0.625rem 1.25rem',
            fontSize: '1rem',
            letterSpacing: '0.03em',
            boxShadow: '0 2px 6px rgba(0,119,216,0.25)',
          }
        : {
            backgroundColor: 'white',
            color: '#0077D8',
            border: '1px solid #0077D8',
            borderRadius: '9999px',
            padding: '0.625rem 1.25rem',
            fontSize: '1rem',
            letterSpacing: '0.03em',
          },
      socialLogin: {
        backgroundColor: 'white',
        color: '#333333',
        border: '1px solid #CCCCCC',
        borderRadius: '0.75rem',
        padding: '0.5rem 1rem',
      },
      icon: {
        backgroundColor: 'white',
        color: '#0077D8',
        border: '1px solid #0077D8',
        borderRadius: '9999px',
        padding: '0.5rem',
        minWidth: '2.5rem',
        minHeight: '2.5rem',
      },
    };

    return { ...baseStyles, ...variantStyles[variant], ...style };
  };

  // If it's just an icon button with no children, center the icon
  const iconOnly = icon && !children;

  return (
    <motion.button
      type={type}
      className={className}
      style={getButtonStyles()}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={disabled ? {} : { scale: 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    >
      {icon && (iconPosition === 'left' || iconOnly) && 
        <span style={{ marginRight: children && iconPosition === 'left' ? '0.5rem' : '0' }}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && !iconOnly && 
        <span style={{ marginLeft: '0.5rem' }}>{icon}</span>}
    </motion.button>
  );
};

export default Button;