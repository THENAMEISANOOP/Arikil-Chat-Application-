import { Routes, Route ,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotificationPage from './pages/NotificationsPage';
import CallPage from './pages/CallPage';
import ChatPage from './pages/ChatPage';
import OnboardingPage from './pages/OnboardingPage';
import  { Toaster } from 'react-hot-toast';

import PageLoader from './components/PageLoader';

import useAuthUser from './hooks/useAuthUser';


const App = () => {
  // transtack query
  const {isLoading,authUser}=useAuthUser();

  const isAuthenticated=Boolean(authUser);
  const isOnboarded=authUser?.isonboarded
  
  
  if(isLoading) return <PageLoader/>

  


  
  return (
    <div className='h-screen' data-theme="dark" >
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ):(
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        ) } />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login"/>} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login"/>} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login"/>} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
