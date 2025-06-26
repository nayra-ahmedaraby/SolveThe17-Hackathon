import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, BarChart2, ChevronRight } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { Course } from '../types';

const MyLearning = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');

  // Sample course templates
  const coursesData = [
    {
      id: 'c1',
      title: 'Introduction to Coding',
      description: 'Learn the basics of coding with fun interactive lessons.',
      progress: 65,
      totalLessons: 12,
      isFavorite: false
    },
    {
      id: 'c2',
      title: 'Math Adventures',
      description: 'Explore mathematics through games and puzzles.',
      progress: 30,
      totalLessons: 10,
      isFavorite: false
    },
    {
      id: 'c3',
      title: 'Science Explorers',
      description: 'Discover the wonders of science with experiments.',
      progress: 10,
      totalLessons: 8,
      isFavorite: false
    }
  ];

  // Initialize courses with user interests
  const [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    console.log("User interests in MyLearning:", user?.interests); // Debug log
    
    // Define the mapping between interests and course titles
    const interestToCourseMap: Record<string, string> = {
      'CYBERSECURITY': 'Introduction to Coding',  // No exact match, map to a course we have
      'CODING': 'Introduction to Coding',
      'NETWORKS': 'Math Adventures',   // No exact match, map to a course we have
      'ARTS': 'Science Explorers',     // No exact match, map to a course we have
      'AI': 'Introduction to Coding',  // No exact match, map to a course we have
      'ENGINEERING': 'Science Explorers'
    };
    
    // Start with no favorites
    let userCourses = coursesData.map(course => ({
      ...course,
      isFavorite: false
    }));
    
    // Apply user interests to mark favorites
    if (user?.interests && user.interests.length > 0) {
      userCourses = userCourses.map(course => {
        // Check if this course should be favorited based on mapped interests
        const isFavorite = user.interests.some(interest => {
          const mappedCourseTitle = interestToCourseMap[interest];
          return mappedCourseTitle === course.title;
        });
        
        return { 
          ...course, 
          isFavorite: isFavorite 
        };
      });
      
      console.log("Updated MyLearning courses:", userCourses); // Debug log
    }
    
    setCourses(userCourses);
  }, [user?.interests]);

  const completedCourses: Course[] = [
    {
      id: 'c4',
      title: 'Alphabet Fun',
      description: 'Learn the alphabet through interactive games.',
      progress: 100,
      totalLessons: 6,
      isFavorite: false
    }
  ];

  const containerStyle = {
    backgroundColor: '#F8F9FE',
    minHeight: 'calc(100vh - 80px)'
  };

  const headerStyle = {
    backgroundColor: '#0077D8',
    color: 'white',
    borderRadius: '0 0 20px 20px',
    padding: '20px'
  };

  const tabStyle = {
    display: 'flex',
    marginBottom: '20px',
    padding: '8px',
    backgroundColor: 'white',
    borderRadius: '100px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  };

  const tabButtonStyle = (isActive: boolean) => ({
    flex: 1,
    padding: '10px 16px',
    borderRadius: '100px',
    background: isActive ? '#0077D8' : 'transparent',
    color: isActive ? 'white' : '#666',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });

  const displayedCourses = activeTab === 'inProgress' ? courses : completedCourses;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Avatar expression="excited" size="sm" />
            <div style={{ marginLeft: '18px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                Hi, {user?.name || 'Friend'}!
              </h2>
              <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.9 }}>
                Continue your learning journey
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px', 
              flex: 1, 
              marginRight: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <BookOpen size={24} />
              <p style={{ fontSize: '12px', margin: '6px 0 0 0' }}>Courses</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{courses.length}</p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px', 
              flex: 1, 
              marginRight: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <BarChart2 size={24} />
              <p style={{ fontSize: '12px', margin: '6px 0 0 0' }}>Progress</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>65%</p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px', 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Star size={24} />
              <p style={{ fontSize: '12px', margin: '6px 0 0 0' }}>Completed</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{completedCourses.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={tabStyle}>
          <button 
            style={tabButtonStyle(activeTab === 'inProgress')}
            onClick={() => setActiveTab('inProgress')}
          >
            In Progress
          </button>
          <button 
            style={tabButtonStyle(activeTab === 'completed')}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {displayedCourses.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayedCourses.map((course) => (
              <Card key={course.id} style={{ marginBottom: '16px' }}>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: '14px', margin: '4px 0 8px', color: '#666' }}>
                        {course.description}
                      </p>
                      
                      {course.progress < 100 && (
                        <>
                          <div style={{ 
                            height: '8px', 
                            backgroundColor: '#E6F1F8', 
                            borderRadius: '4px', 
                            marginBottom: '8px', 
                            overflow: 'hidden' 
                          }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${course.progress}%`, 
                              backgroundColor: '#0077D8', 
                              borderRadius: '4px' 
                            }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                            <span>{course.progress}% complete</span>
                            <span>{course.totalLessons} lessons</span>
                          </div>
                        </>
                      )}
                      
                      {course.progress === 100 && (
                        <div style={{ 
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: '#E6F9ED',
                          color: '#00BD56',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          Completed
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="primary" 
                      icon={<ChevronRight size={20} />}
                      onClick={() => {/* Navigate to course */}}
                      style={{
                        minWidth: '36px',
                        minHeight: '36px',
                        padding: '8px',
                        backgroundColor: '#6962FF'
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Avatar expression="thinking" size="lg" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px', color: '#333' }}>
              No {activeTab === 'inProgress' ? 'in-progress' : 'completed'} courses
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
              {activeTab === 'inProgress' 
                ? "Let's start learning something new!" 
                : "You haven't completed any courses yet. Keep going!"}
            </p>
            {activeTab === 'inProgress' && (
              <Button 
                variant="primary"
                onClick={() => {/* Navigate to explore */}}
              >
                Explore Courses
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;