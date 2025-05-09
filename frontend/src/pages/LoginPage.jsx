import { useState } from "react";
import { Heart, Mail, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
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
            <div className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6">
              <span>{error.response?.data?.message || "An error occurred"}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-700">Welcome Back</h2>
              <p className="text-pink-500 mt-2">
                Sign in to continue your love journey
              </p>
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
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
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
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Sign In
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-pink-600 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-rose-600 hover:underline">
                Create one
              </Link>
            </div>
          </form>
        </div>

        {/* Image Section - Right */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="relative aspect-square max-w-xs mx-auto">
              <img 
                src="/i.png" 
                alt="Couple illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mt-6">Find Your Perfect Match</h2>
            <p className="text-pink-100 mt-2">
              Connect with like-minded people and start your love story
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;