import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/layout/Header';

// Pages
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Explore from './pages/Explore';
import CourseDetail from './pages/CourseDetail';
import LearningPath from './pages/LearningPath';
import MyLearning from './pages/MyLearning';
import Chat from './pages/Chat';
import ChatAssistant from './components/ChatAssistant';

// Context
import { AuthProvider } from './context/AuthContext';

// App-wide styles
const appStyles = {
  container: {
    fontFamily: 'Nunito, sans-serif',
    minHeight: '100vh',
    backgroundColor: 'white',
    color: '#333333'
  }
};

const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show header only on main application pages
    const publicRoutes = ['/', '/welcome', '/onboarding', '/signin', '/signup'];
    setShowHeader(!publicRoutes.includes(location.pathname));
  }, [location]);

  return (
    <AuthProvider>
      <div style={appStyles.container}>
        {showHeader && <Header />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/path/:id" element={<LearningPath />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/chat" element={<ChatAssistant />} />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
};

export default App;