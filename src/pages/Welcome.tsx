import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

// Direct styles to match Figma design
const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    textAlign: 'center',
  },
  avatarContainer: {
    marginBottom: '2rem',
  },
  textContainer: {
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '0.5rem',
  },
  paragraph: {
    color: '#555555',
    maxWidth: '28rem',
    marginBottom: '3rem',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    maxWidth: '20rem',
  },
  primaryButton: {
    backgroundColor: '#0077D8',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    width: '100%',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#0077D8',
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    width: '100%',
    cursor: 'pointer',
    border: '2px solid #0077D8',
    transition: 'all 0.2s ease',
  },
};

const Welcome = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to explore page
    if (isAuthenticated) {
      navigate('/explore');
    }
  }, [isAuthenticated, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        style={styles.avatarContainer}
        variants={itemVariants}
      >
        <Avatar expression="happy" size="xl" />
      </motion.div>

      <motion.div style={styles.textContainer} variants={itemVariants}>
        <h1 style={styles.heading}>Welcome to</h1>
        <Logo variant="primary" size="lg" />
      </motion.div>

      <motion.p 
        style={styles.paragraph}
        variants={itemVariants}
      >
        Explore exciting technology topics with fun, interactive lessons designed for young minds!
      </motion.p>

      <motion.div 
        style={styles.buttonContainer}
        variants={itemVariants}
      >
        <Button 
          variant="primary" 
          fullWidth
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth
          onClick={() => navigate('/onboarding')}
        >
          Continue as Guest
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;