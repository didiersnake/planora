"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { User, X, Globe } from "lucide-react";
import { useAuth } from "@/lib/authContext";

interface UserSession {
  name: string;
  email: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

const LoginModal = () => {
  // Login Form inputs
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const { showLoginModal, setShowLoginModal, user, setUser, isLoggedIn, setIsLoggedIn } =
    useAuth();
  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || !loginEmail) return;

    setUser({
      name: loginName,
      email: loginEmail,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(loginName)}&background=ea580c&color=fff`,
      phone: "+1 (555) 123-4567",
    });
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setLoginName("");
    setLoginEmail("");
  };
  return (
    <div>
      {/* Simulated Sleek Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50"
            id="login_modal_backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-200 shadow-2xl space-y-6 relative"
              id="login_modal_card"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5 text-center">
                <div className="mx-auto w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-2">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Sign In to GbanzanVibe
                </h3>
                <p className="text-xs text-slate-500">
                  Sign in to coordinate gatherings & manage guest list waitlists.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="e.g. Koffi Kouadio"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white text-xs transition"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. koffi@gbanzanvibe.ci"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white text-xs transition"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed">
                  <Globe className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>
                    No password required for local session development. Simulated client
                    login is saved instantly in your browser session.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md shadow-orange-100"
                >
                  Sign In Instantly
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;
