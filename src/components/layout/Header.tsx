import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../ui/Logo';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'EXPLORE', path: '/explore' },
    { name: 'MY LEARNING', path: '/my-learning' },
    { name: 'CHAT', path: '/chat' }
  ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#0077D8',
    color: 'white',
    width: '100%',
    boxShadow: '0 6px 24px 0 rgba(0,0,0,0.10)',
    position: 'relative',
    minHeight: '80px',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    minHeight: '80px',
  };

  const centerNavStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: 0,
    height: '100%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '48px',
    zIndex: 2,
  };

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    opacity: active ? 1 : 0.7,
    textDecoration: 'none',
    color: 'white',
    padding: '0 8px',
    transition: 'opacity 0.2s',
    borderBottom: active ? '3px solid white' : '3px solid transparent',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
  });

  const profileButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    marginTop: '8px',
    width: '200px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: '8px 0',
    zIndex: 10
  };

  const dropdownItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '10px 16px',
    color: '#333',
    textDecoration: 'none',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const mobileMenuButtonStyle = {
    display: 'flex',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    '@media (min-width: 768px)': {
      display: 'none'
    }
  };

  const mobileNavStyle: React.CSSProperties = {
    overflow: 'hidden',
  };

  const mobileNavContainerStyle: React.CSSProperties = {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
    display: 'block',
    padding: '10px 0',
    fontWeight: 600,
    color: 'white',
    opacity: active ? 1 : 0.8,
    textDecoration: 'none'
  });

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '8px 0'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/explore" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 3 }}>
          <Logo variant="textWhite" />
        </Link>

        {/* Centered Navigation */}
        <nav style={centerNavStyle}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={navLinkStyle(isActive(item.path))}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Profile Button (always visible on right) */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <button
            onClick={toggleDropdown}
            style={profileButtonStyle}
          >
            <Avatar size="sm" expression="happy" animate={false} />
            <span>{user?.name || 'Guest'}</span>
            <ChevronDown size={16} />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={dropdownStyle}
              >
                <Link
                  to="/profile"
                  style={dropdownItemStyle}
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  style={dropdownItemStyle}
                  onClick={() => setShowDropdown(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  style={dropdownItemStyle}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button (remove for desktop) */}
        {/* <button style={{ ...mobileMenuButtonStyle, display: 'flex', '@media (min-width: 768px)': { display: 'none' } }} onClick={toggleMobileMenu}>
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={mobileNavStyle}
          >
            <div style={mobileNavContainerStyle}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={mobileLinkStyle(isActive(item.path))}
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div style={dividerStyle}></div>
              <div style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Avatar size="sm" expression="happy" animate={false} />
                  <span>{user?.name || 'Guest'}</span>
                </div>
                <Link
                  to="/profile"
                  style={{ ...mobileLinkStyle(false), opacity: 0.8 }}
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  style={{ ...mobileLinkStyle(false), opacity: 0.8 }}
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ 
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    opacity: 0.8,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;