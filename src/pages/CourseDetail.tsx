import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

// Mock course data
const coursesData = {
  'cyber-security': {
    title: 'CYBER SECURITY',
    overview: {
      title: 'WHAT IS CYBERSECURITY?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'CYBERSECURITY IS HOW WE PROTECT COMPUTERS AND THE INFORMATION INSIDE THEM. IT\'S LIKE HAVING GUARDS AND LOCKS FOR YOUR DIGITAL STUFF. HACKERS ARE PEOPLE WHO TRY TO BREAK INTO COMPUTERS WITHOUT PERMISSION. GOOD CYBERSECURITY KEEPS HACKERS OUT AND KEEPS YOUR INFORMATION SAFE.'
    },
    didYouKnow: 'HACKERS ONCE BROKE INTO A TOY COMPANY\'S WEBSITE AND STOLE INFORMATION ABOUT KIDS! THAT\'S WHY CYBERSECURITY IS SO IMPORTANT - IT PROTECTS PEOPLE\'S PRIVATE INFORMATION.',
    icon: '🔒'
  },
  'coding': {
    title: 'CODING',
    overview: {
      title: 'WHAT IS CODING?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'CODING IS HOW WE TELL COMPUTERS WHAT TO DO. IT\'S LIKE GIVING INSTRUCTIONS TO A ROBOT USING SPECIAL WORDS AND SYMBOLS. WHEN YOU WRITE CODE, YOU\'RE CREATING A SET OF STEPS FOR THE COMPUTER TO FOLLOW. CODING LETS US MAKE WEBSITES, GAMES, APPS, AND SO MANY OTHER COOL THINGS!'
    },
    didYouKnow: 'THE FIRST COMPUTER PROGRAMMER WAS A WOMAN NAMED ADA LOVELACE. SHE WROTE INSTRUCTIONS FOR A COMPUTER THAT WASN\'T EVEN BUILT YET, BACK IN THE 1800s!',
    icon: '💻'
  },
  'networks': {
    title: 'NETWORKS',
    overview: {
      title: 'WHAT ARE NETWORKS?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'NETWORKS CONNECT COMPUTERS SO THEY CAN SHARE INFORMATION. IT\'S LIKE HAVING ROADS BETWEEN HOUSES SO PEOPLE CAN VISIT EACH OTHER. THE INTERNET IS THE BIGGEST NETWORK IN THE WORLD! WHEN YOU SEND A MESSAGE OR LOOK AT A WEBSITE, YOUR COMPUTER IS USING NETWORKS TO TALK TO OTHER COMPUTERS.'
    },
    didYouKnow: 'THE INTERNET STARTED AS A PROJECT BY THE US GOVERNMENT TO KEEP COMPUTERS CONNECTED EVEN IF SOME PARTS WERE DAMAGED. IT WAS FIRST CALLED ARPANET!',
    icon: '🌐'
  },
  'arts': {
    title: 'ARTS',
    overview: {
      title: 'WHAT ARE DIGITAL ARTS?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'DIGITAL ARTS USE COMPUTERS TO CREATE BEAUTIFUL IMAGES, ANIMATIONS, AND DESIGNS. ARTISTS USE SPECIAL SOFTWARE INSTEAD OF PAINTBRUSHES AND PAPER. DIGITAL ART IS USED IN MOVIES, VIDEO GAMES, WEBSITES, AND MANY OTHER PLACES. YOU CAN CREATE AMAZING THINGS WITH JUST A COMPUTER!'
    },
    didYouKnow: 'DIGITAL ARTISTS CREATED ALL THE COOL CHARACTERS YOU SEE IN ANIMATED MOVIES LIKE "FROZEN" AND "TOY STORY" USING COMPUTER PROGRAMS!',
    icon: '🎨'
  },
  'engineering': {
    title: 'ENGINEERING',
    overview: {
      title: 'WHAT IS ENGINEERING?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'ENGINEERING IS WHEN PEOPLE USE SCIENCE AND MATH TO DESIGN AND BUILD THINGS THAT SOLVE PROBLEMS. ENGINEERS CREATE EVERYTHING FROM BRIDGES AND BUILDINGS TO ROBOTS AND COMPUTER CHIPS. THEY THINK ABOUT HOW THINGS WORK AND HOW TO MAKE THEM BETTER!'
    },
    didYouKnow: 'THE TALLEST BUILDING IN THE WORLD, THE BURJ KHALIFA, WAS DESIGNED BY ENGINEERS TO WITHSTAND STRONG DESERT WINDS AND EARTHQUAKES!',
    icon: '🔧'
  },
  'ai': {
    title: 'AI',
    overview: {
      title: 'WHAT IS AI?',
      subtitle: 'OVERVIEW - CONCEPT EXPLANATION',
      content: 'AI, OR ARTIFICIAL INTELLIGENCE, IS ABOUT MAKING COMPUTERS SMART ENOUGH TO DO THINGS THAT USUALLY NEED HUMAN INTELLIGENCE. AI CAN RECOGNIZE PICTURES, UNDERSTAND SPEECH, PLAY GAMES, AND EVEN LEARN NEW THINGS! IT\'S LIKE TEACHING COMPUTERS TO THINK A LITTLE BIT LIKE PEOPLE.'
    },
    didYouKnow: 'AI CAN NOW CREATE ARTWORK AND WRITE STORIES! SOME ART CONTESTS HAVE EVEN BEEN WON BY PAINTINGS CREATED BY AI PROGRAMS!',
    icon: '🤖'
  }
};

const CourseDetail = () => {
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
        <h1 className="text-2xl font-bold text-text-dark mb-2">Course not found</h1>
        <p className="text-text-light mb-6">We couldn't find the course you're looking for.</p>
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
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Button
          variant="iconButton"
          icon={<ChevronLeft size={20} />}
          onClick={() => navigate('/explore')}
          className="mb-6"
        />

        {/* Course Title */}
        <h1 className="text-3xl font-bold text-text-dark mb-8">{course.title}</h1>

        {/* Overview Section */}
        <motion.div 
          className="bg-primary-light rounded-xl p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start">
            <div className="text-4xl mr-4">{course.icon}</div>
            <div>
              <h2 className="text-xl font-bold text-text-dark">{course.overview.title}</h2>
              <p className="text-sm text-text-light mb-4">{course.overview.subtitle}</p>
              <p className="text-text-dark">{course.overview.content}</p>
            </div>
          </div>
        </motion.div>

        {/* Did You Know Section */}
        <motion.div 
          className="bg-primary-light rounded-xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start">
            <div className="text-4xl mr-4">📌</div>
            <div>
              <h2 className="text-xl font-bold text-text-dark mb-2">DID YOU KNOW?</h2>
              <p className="text-text-dark">{course.didYouKnow}</p>
            </div>
          </div>
        </motion.div>

        {/* Let's Play Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            variant="primary" 
            onClick={() => navigate(`/path/${id}`)}
          >
            Let's Play
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;