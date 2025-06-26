import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../components/ui/Logo';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

// Direct styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '1.5rem',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    maxWidth: '440px',
    width: '100%',
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '0.75rem',
    textAlign: 'center' as const,
  },
  subtext: {
    color: '#555555',
    marginBottom: '2rem',
    textAlign: 'center' as const,
    fontSize: '1.1rem',
  },
  inputContainer: {
    width: '100%',
    maxWidth: '24rem',
    marginBottom: '2.5rem',
  },
  interestGrid: {
    width: '100%',
    maxWidth: '34rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  interestRow: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '1rem',
  },
  itemMargin: {
    marginBottom: '2.5rem',
  },
  logoContainer: {
    marginBottom: '2rem',
    // position: 'absolute',
    // top: '20px',
    // left: '20px',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: '24rem',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  interestQuestion: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '2.5rem',
    textAlign: 'center' as const,
  }
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user, updateUserInterests, updateUserName } = useAuth();

  const interests = [
    'CYBERSECURITY',
    'CODING',
    'NETWORKS',
    'ARTS',
    'AI',
    'ENGINEERING'
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNameContinue = () => {
    if (name.trim()) {
      updateUserName(name.trim());
      setStep(2);
    }
  };

  const handleInterestsContinue = () => {
    if (selectedInterests.length > 0) {
      console.log("Selected interests:", selectedInterests);
      updateUserInterests(selectedInterests);
      navigate('/explore');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Name Input Step
  const renderNameInput = () => (
    <motion.div 
      style={{
        ...styles.flexColumn,
        maxWidth: '100%',
        height: '100vh',
        justifyContent: 'center',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="name-step"
    >
      <motion.div 
        variants={itemVariants} 
        style={{
          marginBottom: '80px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Logo variant="primary" size="lg" />
      </motion.div>
      
      <div style={{
        position: 'relative',
        marginBottom: '10px',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute',
          top: 'calc(50% - 135px)',
          left: 'calc(50% - 230px - 62px)',
          zIndex: 0,
        }}>
          <motion.div variants={itemVariants}>
            <Avatar expression="confused" size="xl" />
      </motion.div>
        </div>
      
        <motion.div 
          variants={itemVariants} 
          style={{
            width: '100%',
            maxWidth: '580px',
            paddingTop: '30px',
          }}
        >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
            placeholder="What's your name?"
          className="text-center"
            style={{
              height: '60px',
              fontSize: '1.5rem',
              borderRadius: '50px',
              border: '1px solid #0077D8',
              boxShadow: '0 2px 6px rgba(0,119,216,0.1)',
            }}
        />
      </motion.div>
      </div>
      
      <motion.div variants={itemVariants} style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
      }}>
        <Button 
          variant="primary"
          onClick={handleNameContinue}
          disabled={!name.trim()}
          style={{
            width: '260px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            padding: '14px 20px',
            boxShadow: '0 4px 8px rgba(0,119,216,0.3)',
          }}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );

  // Interest Selection Step
  const renderInterestSelection = () => (
    <motion.div 
      style={{
        ...styles.flexColumn,
        maxWidth: '100%',
        height: '100vh',
        justifyContent: 'center',
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="interest-step"
    >
      <div style={styles.logoContainer}>
      <motion.div variants={itemVariants}>
          <Logo variant="primary" size="md" />
      </motion.div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        maxWidth: '750px',
        marginBottom: '50px',
        marginTop: '20px',
      }}>
        <motion.div variants={itemVariants} style={{ marginRight: '30px' }}>
          <Avatar expression="proud" size="xl" />
      </motion.div>
      
        <motion.div variants={itemVariants}>
          <h2 style={{
            ...styles.interestQuestion,
            fontSize: '2.5rem',
            textAlign: 'left',
            marginBottom: '0',
            lineHeight: '1.2',
          }}>What's your<br/>interest?</h2>
      </motion.div>
      </div>
      
      <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: '750px', padding: '0 20px' }}>
        <div style={{
          ...styles.interestRow,
          marginBottom: '20px',
        }}>
          {interests.slice(0, 3).map((interest) => (
            <Button
              key={interest}
              variant="interestTopic"
              selected={selectedInterests.includes(interest)}
              onClick={() => handleInterestToggle(interest)}
              style={{ 
                height: '50px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
              fullWidth
      >
              {interest}
            </Button>
          ))}
        </div>
        
        <div style={styles.interestRow}>
          {interests.slice(3, 6).map((interest) => (
          <Button
            key={interest}
            variant="interestTopic"
            selected={selectedInterests.includes(interest)}
            onClick={() => handleInterestToggle(interest)}
              style={{ 
                height: '50px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
              fullWidth
          >
            {interest}
          </Button>
        ))}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} style={styles.buttonContainer}>
        <Button 
          variant="primary"
          onClick={handleInterestsContinue}
          disabled={selectedInterests.length === 0}
          style={{
            width: '260px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            padding: '14px 20px',
            boxShadow: '0 4px 8px rgba(0,119,216,0.3)',
            marginTop: '20px',
          }}
        >
          Done
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <div style={styles.container}>
      {step === 1 ? renderNameInput() : renderInterestSelection()}
    </div>
  );
};

export default Onboarding;