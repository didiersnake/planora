"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Plus,
  LogOut,
  Globe,
  Twitter,
  Instagram,
  Check,
  Facebook,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { eventService } from "@/lib/services/eventService";
import { Country } from "@/lib/Types";

interface UserSession {
  name: string;
  email: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}
const Navbar = () => {
  const router = useRouter();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, setUser, setShowLoginModal, isLoggedIn, country, setCountry } = useAuth();
  const [countries, setCountries] = useState<Country[]>([]); // State to hold the list of countries

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown reference to handle clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Log Out
  const handleSignOut = () => {
    setUser(null);
    setShowUserDropdown(false);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await eventService.getCountries();
        return response;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries().then((countries) => {
      if (countries && countries.length > 0) {
        const defaultCountry = countries.find(
          (country: Country) => country.code.toLowerCase() === "ci",
        );
        if (defaultCountry) {
          setCountry(defaultCountry);
          setCountries(countries);
        }
      }
    });
  }, [setCountry, setCountries]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div>
      {/* Top Header Navigation */}
      <header
        className="border-b border-neutral-200 bg-white sticky top-0 z-40"
        id="app_header"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
            id="brand_logo_section"
          >
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="font-bold text-xl tracking-tight italic uppercase text-neutral-900">
              <span className="text-orange-600 font-black">Planora</span>
            </span>
          </div>

          {/* Center Navigation Links for quick access */}
          <nav
            className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-600"
            id="navbar_links"
          >
            {/* <button
                onClick={() => router.push("/landing")}
                className={`hover:text-orange-600 transition ${activeTab === "landing" ? "text-orange-600 border-b-2 border-orange-600 pb-1" : ""}`}
              >
                Overview
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className={`hover:text-orange-600 transition ${activeTab === "dashboard" ? "text-orange-600 border-b-2 border-orange-600 pb-1" : ""}`}
              >
                Explore Gatherings
              </button>
              <button
                onClick={() => router.push("/create")}
                className={`hover:text-orange-600 transition ${activeTab === "create" ? "text-orange-600 border-b-2 border-orange-600 pb-1" : ""}`}
              >
                Plan Event
              </button> */}
          </nav>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-4 sm:gap-6" id="header_actions">
            {/* Social Media Icons on Navbar */}
            <div
              className="hidden lg:flex items-center gap-3 text-neutral-400 border-r border-slate-200 pr-5"
              id="navbar_social_icons"
            >
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600 transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Country Dropdown for local context (flag + name) */}
            <div
              className="relative"
              ref={countryDropdownRef}
              id="navbar_country_dropdown"
            >
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-full font-bold text-xs transition-all cursor-pointer select-none"
                id="country_dropdown_trigger"
              >
                <span className="text-sm leading-none flex-shrink-0">
                  {country ? country.flag : "🌍"}
                </span>
                <span className="max-w-[110px] truncate hidden sm:inline-block font-sans text-[11px] font-semibold text-neutral-700">
                  {country ? country.name : "Global"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              <AnimatePresence>
                {showCountryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50 text-xs overflow-hidden"
                    id="country_dropdown_menu"
                  >
                    <div className="border-t border-neutral-100 my-1"></div>

                    <div className="max-h-60 overflow-y-auto">
                      {countries.map((countryItem: Country) => {
                        const isSelected = country?.code === countryItem.code;
                        return (
                          <button
                            key={countryItem.code}
                            onClick={() => {
                              setCountry(countryItem);
                              setShowCountryDropdown(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 font-semibold flex items-center justify-between transition ${
                              isSelected
                                ? "text-orange-600 bg-orange-50/50 font-bold"
                                : "text-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm leading-none">
                                {countryItem.flag}
                              </span>
                              <span className="truncate">{countryItem.name}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-orange-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Sign In & User Shortcut Dropdown */}
            <div className="relative" ref={dropdownRef} id="navbar_auth_section">
              {isLoggedIn && user ? (
                <div className="flex items-center gap-2">
                  {/* User Profile Shortcut Trigger */}
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-1.5 focus:outline-none hover:opacity-90 transition p-1 rounded-lg"
                    id="user_profile_trigger"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-orange-500 bg-neutral-100">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 max-w-[100px] truncate hidden sm:inline-block">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-neutral-500" />
                  </button>

                  {/* Dropdown menu items */}
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-50 text-xs"
                        id="user_profile_dropdown"
                      >
                        <div className="px-3.5 py-2 border-b border-neutral-100 mb-1">
                          <p className="font-bold text-neutral-800 truncate">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-neutral-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            router.push("/home");
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 hover:text-orange-600 font-semibold text-neutral-600 flex items-center gap-2 transition"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Explore Gatherings</span>
                        </button>

                        <button
                          onClick={() => {
                            router.push("/create");
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-neutral-50 hover:text-orange-600 font-semibold text-neutral-600 flex items-center gap-2 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Plan an Event</span>
                        </button>

                        <div className="border-t border-neutral-100 my-1"></div>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 transition"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Simulated login triggers */
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-xs font-bold text-neutral-700 hidden md:inline-block hover:text-orange-600 border border-slate-300 hover:border-orange-500 rounded-md px-4 py-2 transition"
                  id="sign_in_trigger"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Main Plan an Event Action Button */}
            <button
              onClick={() => router.push("/events/create")}
              className="px-4 sm:px-5 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-all duration-200 text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-orange-100"
              id="plan_event_btn"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plan Event</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
