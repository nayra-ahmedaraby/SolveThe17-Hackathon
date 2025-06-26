import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';

// Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
    display: 'flex',
  },
  sidebar: {
    display: 'none',
    backgroundColor: '#E6F1F8', // light blue background
    width: '16rem',
    padding: '1.5rem',
    '@media (min-width: 768px)': {
      display: 'block',
    }
  },
  sidebarTitle: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#333333',
    marginBottom: '1.5rem',
  },
  filterSection: {
    marginBottom: '1.5rem',
  },
  filterTitle: {
    fontWeight: '500',
    color: '#333333',
    marginBottom: '0.5rem',
  },
  filterOption: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
  filterRadio: {
    marginRight: '0.5rem',
  },
  main: {
    flex: 1,
    padding: '1.5rem',
  },
  welcomeSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  welcomeText: {
    marginLeft: '1rem',
  },
  welcomeHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
  },
  welcomeSubtext: {
    color: '#555555',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#A0A0A0',
  },
  searchInput: {
    width: '100%',
    paddingLeft: '2.5rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    border: '1px solid #CCCCCC',
    borderRadius: '0.75rem',
    outline: 'none',
    fontSize: '0.875rem',
  },
  mobileFilter: {
    marginBottom: '1.5rem',
    display: 'block',
    '@media (min-width: 768px)': {
      display: 'none',
    }
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #CCCCCC',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: '1.5rem',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    }
  },
  noResultsContainer: {
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  noResultsText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333333',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  noResultsSubtext: {
    color: '#555555',
  }
};

// Mock data
const coursesData: Course[] = [
  {
    id: 'cyber-security',
    title: 'CYBER SECURITY',
    description: 'CYBERSECURITY IS HOW WE PROTECT COMPUTERS AND KEEP INFORMATION SAFE FROM PEOPLE WHO MIGHT TRY TO STEAL IT OR CAUSE PROBLEMS.',
    progress: 1,
    totalLessons: 50,
    isFavorite: false
  },
  {
    id: 'coding',
    title: 'CODING',
    description: 'CODING IS HOW WE TELL COMPUTERS WHAT TO DO. IT\'S LIKE GIVING INSTRUCTIONS TO A ROBOT USING SPECIAL WORDS AND SYMBOLS.',
    progress: 1,
    totalLessons: 50,
    isFavorite: true
  },
  {
    id: 'networks',
    title: 'NETWORKS',
    description: 'NETWORKS CONNECT COMPUTERS SO THEY CAN SHARE INFORMATION. IT\'S LIKE HAVING ROADS BETWEEN HOUSES SO PEOPLE CAN VISIT EACH OTHER.',
    progress: 1,
    totalLessons: 50,
    isFavorite: false
  },
  {
    id: 'arts',
    title: 'ARTS',
    description: 'ART IS A WAY PEOPLE USE THEIR IMAGINATION TO CREATE THINGS THAT ARE BEAUTIFUL OR THAT EXPRESS IDEAS AND FEELINGS.',
    progress: 1,
    totalLessons: 50,
    isFavorite: false
  },
  {
    id: 'engineering',
    title: 'ENGINEERING',
    description: 'ENGINEERING IS WHEN PEOPLE USE SCIENCE AND MATH TO DESIGN AND BUILD THINGS THAT SOLVE PROBLEMS, LIKE BRIDGES, MACHINES, OR SOFTWARE.',
    progress: 1,
    totalLessons: 50,
    isFavorite: true
  },
  {
    id: 'ai',
    title: 'AI',
    description: 'AI, OR ARTIFICIAL INTELLIGENCE, IS ABOUT MAKING COMPUTERS SMART ENOUGH TO DO THINGS THAT USUALLY NEED HUMAN INTELLIGENCE.',
    progress: 1,
    totalLessons: 50,
    isFavorite: false
  }
];

const Explore = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorite' | 'enrolled' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Initialize courses with favorites based on user interests
  useEffect(() => {
    console.log("User interests:", user?.interests); // Debug log
    
    const interestToCourseMap: Record<string, string> = {
      'CYBERSECURITY': 'CYBER SECURITY',
      'CODING': 'CODING',
      'NETWORKS': 'NETWORKS',
      'ARTS': 'ARTS',
      'AI': 'AI',
      'ENGINEERING': 'ENGINEERING'
    };
    
    // First, reset all default favorites to false
    let initialCourses = coursesData.map(course => ({
      ...course,
      isFavorite: false
    }));
    
    // Then mark as favorite based on user interests
    if (user?.interests && user.interests.length > 0) {
      initialCourses = initialCourses.map(course => {
        // Check if this course should be favorited based on mapped interests
        const isFavorite = user.interests.some(interest => {
          // Get the course title that corresponds to this interest
          const mappedCourseTitle = interestToCourseMap[interest];
          return mappedCourseTitle === course.title;
        });
        
        return {
          ...course,
          isFavorite: isFavorite
        };
      });
      
      console.log("Updated courses with favorites:", initialCourses); // Debug log
    }
    
    setCourses(initialCourses);
  }, [user?.interests]);

  const handleToggleFavorite = (courseId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, isFavorite: !course.isFavorite } 
          : course
      )
    );
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const filteredCourses = courses.filter(course => {
    // Apply filter
    if (filter === 'favorite' && !course.isFavorite) return false;
    if (filter === 'enrolled' && course.progress <= 0) return false;
    if (filter === 'completed' && course.progress < course.totalLessons) return false;
    
    // Apply search
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Generate CSS media queries for responsive sidebar
  const getResponsiveStyle = (baseStyle: React.CSSProperties, mediaKey: string): React.CSSProperties => {
    // Note: This is just for type safety, actual media queries are handled by CSS
    return baseStyle;
  };

  return (
    <div style={styles.container}>
      {/* Sidebar - visible on desktop only */}
      <aside style={{ 
        ...styles.sidebar,
        display: window.innerWidth >= 768 ? 'block' : 'none'
      }}>
        <h2 style={styles.sidebarTitle}>All Courses</h2>
        
        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>Filter By</h3>
          <div>
            <div style={styles.filterOption}>
              <input 
                type="radio" 
                id="filter-all" 
                name="filter" 
                checked={filter === 'all'} 
                onChange={() => setFilter('all')}
                style={styles.filterRadio}
              />
              <label htmlFor="filter-all">All</label>
            </div>
            <div style={styles.filterOption}>
              <input 
                type="radio" 
                id="filter-favorite" 
                name="filter" 
                checked={filter === 'favorite'} 
                onChange={() => setFilter('favorite')}
                style={styles.filterRadio}
              />
              <label htmlFor="filter-favorite">Favorite</label>
            </div>
            <div style={styles.filterOption}>
              <input 
                type="radio" 
                id="filter-enrolled" 
                name="filter" 
                checked={filter === 'enrolled'} 
                onChange={() => setFilter('enrolled')}
                style={styles.filterRadio}
              />
              <label htmlFor="filter-enrolled">Enrolled</label>
            </div>
            <div style={styles.filterOption}>
              <input 
                type="radio" 
                id="filter-completed" 
                name="filter" 
                checked={filter === 'completed'} 
                onChange={() => setFilter('completed')}
                style={styles.filterRadio}
              />
              <label htmlFor="filter-completed">Completed</label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Message */}
        <div style={styles.welcomeSection}>
          <Avatar expression="happy" size="md" />
          <div style={{ marginLeft: '20px' }}>
            <h1 style={styles.welcomeHeading}>Welcome!</h1>
            <p style={styles.welcomeSubtext}>Try clicking on any topic to start learning</p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <div style={styles.searchIcon}>
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Mobile Filter - visible on mobile only */}
        <div style={{ 
          ...styles.mobileFilter,
          display: window.innerWidth < 768 ? 'block' : 'none'
        }}>
          <select 
            style={styles.mobileFilterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="favorite">Favorites</option>
            <option value="enrolled">Enrolled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Course Grid */}
        <div style={{
          ...styles.courseGrid,
          gridTemplateColumns: window.innerWidth < 640 ? 'repeat(1, minmax(0, 1fr))' :
                              window.innerWidth < 1024 ? 'repeat(2, minmax(0, 1fr))' :
                              'repeat(3, minmax(0, 1fr))'
        }}>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                title={course.title}
                description={course.description}
                progress={course.progress}
                totalLessons={course.totalLessons}
                isFavorite={course.isFavorite}
                onToggleFavorite={() => handleToggleFavorite(course.id)}
                onClick={() => handleCardClick(course.id)}
                style={{
                  backgroundColor: '#E6F1F8',
                  border: '1px solid #0077D8'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div style={styles.noResultsContainer}>
            <Avatar expression="confused" size="lg" />
            <h3 style={styles.noResultsText}>No courses found</h3>
            <p style={styles.noResultsSubtext}>Try changing your filters or search query</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;