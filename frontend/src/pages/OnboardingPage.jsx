import { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Loader2, MapPin, RefreshCw, Settings2, User, Heart } from "lucide-react";
import { LANGUAGES } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [hearts, setHearts] = useState([]);

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (hearts.length < 8) {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [hearts]);

  useEffect(() => {
    if (hearts.length > 10) {
      setHearts(prev => prev.slice(1));
    }
  }, [hearts]);

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
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
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-200"
      >
        <div className="p-6 sm:p-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-pink-500 p-2 rounded-full inline-flex"
            >
              <Heart className="size-6 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-700 mt-4">
              Complete Your Love Profile
            </h1>
            <p className="text-pink-500 mt-2">
              Help us find your perfect match by completing your profile
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {/* IMAGE PREVIEW */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative size-32 rounded-full bg-pink-100 overflow-hidden border-2 border-pink-300"
              >
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <User className="size-12 text-pink-400" />
                  </div>
                )}
                <motion.div 
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-30 opacity-0 flex items-center justify-center transition-opacity"
                >
                  <Settings2 className="text-white size-6" />
                </motion.div>
              </motion.div>

              {/* Generate Random Avatar BTN */}
              <motion.button
                type="button"
                onClick={handleRandomAvatar}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-pink-200 transition-all"
              >
                <RefreshCw className="size-4" />
                Generate Random Avatar
              </motion.button>
            </motion.div>

            {/* FULL NAME */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="w-full pl-10 p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  placeholder="Your full name"
                />
              </div>
            </motion.div>

            {/* BIO */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all h-24"
                placeholder="Tell others about yourself and what you're looking for"
              />
            </motion.div>

            {/* LANGUAGES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* NATIVE LANGUAGE */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-1">
                  Native Language
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-1">
                  Learning Language
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* LOCATION */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-pink-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full pl-10 p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition-all"
                  placeholder="City, Country"
                />
              </div>
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <Heart className="h-5 w-5" />
                  Complete Profile
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Saving...
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;