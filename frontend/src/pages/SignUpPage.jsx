import { useState, useEffect } from "react";
import { Heart, Mail, Lock, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [hearts, setHearts] = useState([]);
  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries(['authUser']),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  // Create floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (hearts.length < 10) { // Limit number of hearts
        setHearts(prev => [
          ...prev,
          {
            id: Date.now(),
            left: Math.random() * 100,
            size: Math.random() * 10 + 5,
            duration: Math.random() * 5 + 5
          }
        ]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [hearts]);

  // Remove hearts after animation completes
  useEffect(() => {
    if (hearts.length > 10) {
      setHearts(prev => prev.slice(1));
    }
  }, [hearts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      {/* Floating hearts background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -100 }}
          transition={{
            duration: heart.duration,
            ease: "linear"
          }}
          className="absolute text-pink-300"
          style={{
            left: `${heart.left}%`,
            bottom: '-10px',
            fontSize: `${heart.size}px`
          }}
          onAnimationComplete={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
        >
          ❤
        </motion.div>
      ))}

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-pink-200 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col">
          {/* LOGO */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-pink-500 p-2 rounded-full"
            >
              <Heart className="size-6 text-white" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500"
            >
              LoveConnect
            </motion.span>
          </motion.div>

          {/* ERROR MESSAGE IF ANY */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6"
              >
                <span>{error.response?.data?.message || "An error occurred"}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-pink-700">Find Your Perfect Match</h2>
                  <p className="text-sm text-pink-500 mt-2">
                    Join our community and start your love story today!
                  </p>
                </motion.div>

                <div className="space-y-4">
                  {/* FULLNAME */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-pink-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="pl-10 w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </motion.div>
                  
                  {/* EMAIL */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-pink-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="pl-10 w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </motion.div>
                  
                  {/* PASSWORD */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-pink-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Create Password"
                      className="pl-10 w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all duration-300"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-start"
                  >
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-pink-300 rounded bg-pink-50 focus:ring-3 focus:ring-pink-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-pink-600">
                        I agree to the{" "}
                        <a className="font-medium text-pink-600 hover:underline" href="#">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.span>
                      Start Matching Now
                    </>
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <p className="text-sm text-pink-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-rose-600 hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </motion.div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center p-10 relative overflow-hidden">
          {/* Animated floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute text-white opacity-20"
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`
              }}
            >
              ❤
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-white relative z-10"
          >
            {/* Illustration */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square max-w-sm mx-auto"
            >
              <img 
                src="/i.png" 
                alt="Couple in love illustration" 
                className="w-full h-full object-contain" 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-4 mt-6"
            >
              <h2 className="text-2xl font-bold">Your Love Journey Begins Here</h2>
              <p className="opacity-90">
                Connect with like-minded singles, build meaningful relationships, and find your perfect match.
              </p>
              
              <motion.div 
                className="flex justify-center gap-2 mt-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <Heart className="h-5 w-5 fill-current opacity-80" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;