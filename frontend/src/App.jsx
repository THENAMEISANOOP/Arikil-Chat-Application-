import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotificationPage from './pages/NotificationsPage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import OnboardingPage from './pages/OnboardingPage';
import  { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import  {axiosInstance}  from './lib/axios';


const App = () => {
  // tanstack query
  const {data,isLoading,error}=useQuery({
    queryKey: "todos",
    queryFn: async () => {
      const res= await axiosInstance.get('/auth/me')
      return res.data
    },
    retry: false,
  })
  console.log(data)
  
  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
