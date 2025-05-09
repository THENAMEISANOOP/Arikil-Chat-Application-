import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { Loader2, MapPin, RefreshCw, User, Heart } from "lucide-react";
import { LANGUAGES } from "../constants";
import { motion } from "framer-motion";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile saved successfully!");
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
    toast.success("New avatar generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-pink-200"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-pink-500 p-2 rounded-full inline-flex"
            >
              <Heart className="size-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-pink-700">
              Complete Your Profile
            </h1>
            <p className="text-pink-500">
              Help us find your perfect match
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative size-28 rounded-full bg-pink-100 overflow-hidden border-2 border-pink-300"
              >
                {formState.profilePic ? (
                  <img 
                    src={formState.profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <User className="size-10 text-pink-400" />
                  </div>
                )}
              </motion.div>
              
              {/* Improved Random Avatar Button */}
              <motion.button
                type="button"
                onClick={handleRandomAvatar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full 
                          font-medium flex items-center gap-2 shadow-md hover:shadow-pink-200 transition-all
                          text-sm border border-pink-300 hover:from-pink-500 hover:to-rose-500"
              >
                <RefreshCw className="size-4" />
                <span>Generate Random Avatar</span>
              </motion.button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-pink-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-pink-400" />
                    </div>
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-pink-200 rounded-lg 
                                focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                {/* Native Language */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-pink-700">
                    Native Language
                  </label>
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="w-full text-sm p-2.5 border border-pink-200 rounded-lg 
                              focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    required
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Location */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-pink-700">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-pink-400" />
                    </div>
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-pink-200 rounded-lg 
                                focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Learning Language */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-pink-700">
                    Learning Language
                  </label>
                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="w-full text-sm p-2.5 border border-pink-200 rounded-lg 
                              focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    required
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bio - Full Width */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">
                About You
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="w-full text-sm p-3 border border-pink-200 rounded-lg 
                          focus:ring-2 focus:ring-pink-300 focus:border-pink-300 h-28"
                placeholder="Tell us about yourself and what you're looking for"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 
                        rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg
                        hover:from-pink-600 hover:to-rose-600"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <>
                  <Heart className="size-5" />
                  <span>Save Profile</span>
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