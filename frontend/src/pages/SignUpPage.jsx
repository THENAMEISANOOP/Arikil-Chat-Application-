import { useState } from "react";
import { Heart, Mail, Lock, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-pink-200 flex flex-col lg:flex-row"
      >
        {/* Form Section - Left */}
        <div className="w-full lg:w-1/2 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-pink-500 p-2 rounded-full"
            >
              <Heart className="size-6 text-white" />
            </motion.div>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
              LoveConnect
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6 text-sm"
            >
              {error.response?.data?.message || "An error occurred"}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-700">Create Account</h2>
              <p className="text-pink-500 mt-1">Start your love journey with us</p>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>
              <p className="text-xs text-pink-400 mt-1">At least 6 characters</p>
            </div>

            {/* Terms */}
            <div className="flex items-start text-xs">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 border border-pink-300 rounded bg-pink-50 focus:ring-2 focus:ring-pink-300"
                required
              />
              <label htmlFor="terms" className="ml-2 text-pink-600">
                I agree to the <span className="text-pink-700 font-medium">Terms</span> and <span className="text-pink-700 font-medium">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-200 mt-4"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Start Matching Now</span>
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <div className="text-center text-sm text-pink-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-rose-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Image Section - Right */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center p-8">
          <div className="text-center text-white">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square max-w-xs mx-auto"
            >
              <img 
                src="/i.png" 
                alt="Couple illustration"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mt-6">Your Love Journey Begins</h2>
            <p className="text-pink-100 mt-2">
              Connect with like-minded people and find your perfect match
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;