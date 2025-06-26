import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { Milestone, AvatarExpression } from '../types';

// Mock course data
const coursesData = {
  'cyber-security': {
    title: 'CYBER SECURITY',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: false },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  },
  'coding': {
    title: 'CODING',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: true },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  },
  'networks': {
    title: 'NETWORKS',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: false },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  },
  'arts': {
    title: 'ARTS',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: false },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  },
  'engineering': {
    title: 'ENGINEERING',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: false },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  },
  'ai': {
    title: 'AI',
    milestones: [
      { number: '01', label: 'BEGINNER', expression: 'angry' as AvatarExpression, completed: true },
      { number: '10', label: 'INTERMEDIATE', expression: 'sleeping' as AvatarExpression, completed: true },
      { number: '20', label: 'ADVANCED', expression: 'happy' as AvatarExpression, completed: false },
      { number: '30', label: 'PRO', expression: 'cool' as AvatarExpression, completed: false },
      { number: '40', label: 'HERO', expression: 'starEyes' as AvatarExpression, completed: false },
      { number: '50', label: 'LEGEND', expression: 'excited' as AvatarExpression, completed: false }
    ]
  }
};

const LearningPath = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the course data or use a default
  const course = id && coursesData[id as keyof typeof coursesData] 
    ? coursesData[id as keyof typeof coursesData] 
    : null;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Avatar expression="confused" size="lg" className="mb-4" />
        <h1 className="text-2xl font-bold text-text-dark mb-2">Learning path not found</h1>
        <p className="text-text-light mb-6">We couldn't find the learning path you're looking for.</p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Back to Explore
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md mx-auto">
        {/* Back button */}
        <Button
          variant="iconButton"
          icon={<ChevronLeft size={20} />}
          onClick={() => navigate(`/course/${id}`)}
          className="mb-6"
        />

        {/* Course Title */}
        <div className="flex justify-center mb-10">
          <div className="bg-primary-blue text-white font-bold rounded-pill px-6 py-3 text-xl">
            {course.title} TRIP
          </div>
        </div>

        {/* Learning Path Visualization */}
        <div className="relative">
          {/* Dashed line connecting milestones */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-2 border-dashed border-primary-blue -translate-x-1/2 z-0"></div>
          
          {/* Milestones */}
          <div className="relative z-10">
            {course.milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.number}
                className="mb-16 flex items-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Position avatars on alternating sides */}
                <div className={`flex items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1 flex flex-col items-center">
                    <Avatar 
                      expression={milestone.expression} 
                      size="md"
                      className={milestone.completed ? 'opacity-100' : 'opacity-50'}
                    />
                  </div>
                  
                  <div className="flex-none">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold
                      ${milestone.completed 
                        ? 'bg-primary-blue text-white' 
                        : 'bg-white text-primary-blue border-2 border-primary-blue'}
                    `}>
                      {milestone.number}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center">
                    <p className={`font-bold text-sm ${milestone.completed ? 'text-primary-blue' : 'text-text-light'}`}>
                      {milestone.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPath;