import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  ArrowRight,
  Trash2,
  Globe,
  CreditCard,
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronDown,
  MessageSquare,
  Camera,
} from "lucide-react";
import { Category, EventResponse } from "../lib/Types";
import { useAuth } from "@/lib/authContext";
import { DashboardSkeleton } from "./Loader";

interface HomePageProps {
  events: EventResponse[];
  categories: Category[];
  onSelectEvent: (event: EventResponse) => void;
  // onSelectEventWithSection: (
  //   event: EventResponse,
  //   section: "none" | "wall" | "album",
  // ) => void;
  onCreateClick: () => void;
}

export default function HomePage({
  events,
  onSelectEvent,
  categories,
  // onSelectEventWithSection,
  onCreateClick,
}: HomePageProps) {
  // Search & Advanced Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { isLoading } = useAuth();

  // Countdown Calculator
  const getDaysRemaining = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // Memoized filter logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Text Search matching title, host, description
      const matchesSearch = searchTerm
        ? event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // 2. Category Match
      const matchesCategory = filterCategory
        ? event.eventCategory?.id?.toString() === filterCategory
        : true;

      // 3. Location Match
      // const matchesLocation = filterLocation
      //   ? event.locationName.toLowerCase().includes(filterLocation.toLowerCase()) ||
      //     (event.landmarkPin?.name &&
      //       event.landmarkPin.name.toLowerCase().includes(filterLocation.toLowerCase()))
      //   : true;

      // 4. Date Match
      const matchesDate = filterDate
        ? new Date(event.startAt).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString()
        : true;

      // return matchesSearch && matchesCategory && matchesLocation && matchesDate;
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, searchTerm, filterCategory, filterDate]);

  // Count active advanced filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterCategory) count++;
    if (filterLocation) count++;
    if (filterDate) count++;
    return count;
  }, [filterCategory, filterLocation, filterDate]);

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterLocation("");
    setFilterDate("");
  };

  return (
    <>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
          id="dashboard_view"
        >
          {/* Elegant Promo Card */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl"
            id="promo_hero_banner"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/30 via-slate-900 to-slate-900 z-0"></div>
            <div className="space-y-4 z-10 flex-1">
              <span className="bg-orange-500/20 text-orange-400 text-xs px-3 pt-[3px] pb-[3px] inline-block mb-4 ml-0 rounded-full font-semibold border border-orange-500/30">
                Zero-Install Guest Experience ⚡
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight max-w-lg">
                Plan vibrant local events with instant sharing & regional mobile money
                checkout
              </h2>
              <p className="text-slate-300 text-sm max-w-md">
                Design beautiful customized flyers, handle capacity limits automatically
                with waitlists, drop pins on interactive landmark maps, and collect RSVPs
                without downloads.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onCreateClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-950"
                >
                  Start Creating Now
                </button>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                  <Check className="w-4 h-4 text-orange-500" />
                  <span>No subscription needed</span>
                </div>
              </div>
            </div>

            <div
              className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 z-10 hidden md:block"
              id="promo_hero_decor"
            >
              <div className="absolute inset-0 rounded-2xl bg-orange-600/10 border border-orange-500/20 rotate-3 animate-pulse"></div>
              <div className="absolute inset-2 rounded-2xl bg-slate-800 border border-slate-700 -rotate-3 overflow-hidden flex flex-col">
                <div className="h-2/3 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
                    alt="Assinie Cover"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-orange-600 px-1.5 py-0.5 rounded-sm">
                    BEACH DAY
                  </span>
                </div>
                <div className="p-2 space-y-1">
                  <div className="h-3 w-3/4 bg-slate-700 rounded-sm"></div>
                  <div className="h-2 w-1/2 bg-slate-700 rounded-sm"></div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-3 w-1/3 bg-slate-700 rounded-sm"></div>
                    <div className="h-3 w-5 bg-orange-500/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Interactive Search Bar & Filters Section */}
          <section
            className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-xs space-y-4"
            id="dashboard_search_controls"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Text Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by event title, host name or description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:outline-none focus:bg-white transition-all text-slate-800 font-medium"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter details toggle button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                    showFilters || activeFiltersCount > 0
                      ? "bg-orange-50 border-orange-200 text-orange-600"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                  id="filter_toggle_btn"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-orange-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`}
                  />
                </button>

                {/* General Reset button */}
                {(searchTerm || activeFiltersCount > 0) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
                    title="Reset Search and Filters"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden md:inline">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Expandable Advanced Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                  id="advanced_filters_panel"
                >
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Category Selector */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">
                        Category Theme
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white transition text-slate-800 font-medium"
                      >
                        <option value="" className="m-1">
                          All Category Themes
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location Input */}
                    {/* <div className="space-y-1">
                      <label className="font-semibold text-slate-700">
                        Location / Landmark Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={filterLocation}
                          onChange={(e) => setFilterLocation(e.target.value)}
                          placeholder="e.g. Assinie, Cocody..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white transition text-slate-800 font-medium"
                        />
                        {filterLocation && (
                          <button
                            onClick={() => setFilterLocation("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div> */}

                    {/* Date Input */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">
                        Gathering Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white transition text-slate-800 font-medium"
                        />
                        {filterDate && (
                          <button
                            onClick={() => setFilterDate("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Events Grid Section */}
          <div className="space-y-4" id="active_events_section">
            <div className="flex items-center justify-between">
              {/* <div>
            <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
              Active Events ({filteredEvents.length} of {events.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Tap an event to edit or preview the interactive guest experience.
            </p>
          </div> */}
              <div></div>
              <div className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                ⚡ Client Sync Ready
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <div
                className="border border-dashed border-neutral-300 rounded-2xl p-12 text-center space-y-3"
                id="no_events_placeholder"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-neutral-700">
                  No events match your search
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  We couldn&apos;t find any events that match your search filters. Try
                  adjusting your search query or reset your advanced filters.
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleResetFilters}
                    className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-orange-700 transition shadow-lg shadow-orange-100"
                  >
                    Clear Search & Filters
                  </button>
                  <button
                    onClick={onCreateClick}
                    className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                id="events_grid_container"
              >
                {filteredEvents.map((event) => {
                  const daysRemaining = getDaysRemaining(event.startAt);
                  const isPreloaded = event.id === "preloaded-assie-beach";
                  const template = decodeURIComponent(event.templatePath);
                  console.log("path", template);

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{
                        y: -6,
                        scale: 1.015,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }}
                      onClick={() => onSelectEvent(event)}
                      className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full relative"
                    >
                      {/* Event Category Tag Floating */}
                      <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs text-neutral-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-neutral-200/50 flex items-center gap-1">
                        <span>{event.eventCategory?.icon || "🎉"}</span>
                        <span>{event.eventCategory?.name || "Social"}</span>
                      </span>

                      {/* Event Cover Image */}
                      <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                        {event.templatePath && (
                          <Image
                            src={template}
                            alt={event.title}
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            fill
                            className="object-cover group-hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                            unoptimized={
                              true
                              // event.templatePath.startsWith("data:") ||
                              // event.templatePath.startsWith("blob:")
                            }
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent"></div>

                        {/* Countdown Indicator */}
                        <div className="absolute bottom-3 right-3 bg-orange-600 text-white text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 shadow-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {daysRemaining > 0
                              ? `${daysRemaining} days left`
                              : "Happening Today"}
                          </span>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-neutral-900 group-hover:text-orange-600 transition-colors text-lg leading-tight line-clamp-1">
                            {event.title}
                          </h4>
                          <p className="text-xs text-neutral-500 flex items-center gap-1">
                            <span>Hosted by</span>
                            <span className="font-semibold text-neutral-700">
                              {event.host}
                            </span>
                            {isPreloaded && (
                              <span className="bg-orange-50 text-orange-600 text-[9px] px-1.5 rounded border border-orange-100 font-bold">
                                Featured
                              </span>
                            )}
                          </p>
                          {/* <p className="text-xs text-neutral-600 line-clamp-2 pt-1">
                            {event.description}
                          </p> */}
                        </div>

                        <div className="space-y-2 pt-2 border-t border-neutral-100">
                          {/* Date and Time */}
                          <div className="flex items-center text-xs text-neutral-600 gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-orange-500" />
                            <span>
                              {new Date(event.startAt).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-neutral-300">•</span>
                            <span>{event.startTime}</span>
                          </div>

                          {/* Location landmark */}
                          <div className="flex items-center text-xs text-neutral-600 gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-orange-500" />
                            <span className="truncate">{event.locationName}</span>
                          </div>

                          {/* Monetization & Capacity */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 bg-neutral-50 text-neutral-700 border border-neutral-200">
                              {event.monetizationType === "Free" && "🎁 Free Admission"}
                              {event.monetizationType === "Cash_at_event" &&
                                "🚪 Pay at Door"}
                              {event.monetizationType === "Mobile_payment" && (
                                <>
                                  <CreditCard className="w-3 h-3 text-orange-600" />
                                  <span>
                                    {event?.amount?.toLocaleString() || 0}{" "}
                                    {event?.currency || "FCFA"}
                                  </span>
                                </>
                              )}
                            </span>

                            <div className="flex items-center gap-1 text-neutral-500 text-xs">
                              <Users className="w-3.5 h-3.5" />
                              <span>{event.guestCount} Joined</span>
                              {event.maxCapacityEnabled && (
                                <span className="text-neutral-400">
                                  / {event.maxCapacity} limit
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Direct Vibe Links */}
                          {/* <div className="flex items-center gap-2 pt-2 border-t border-dashed border-neutral-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectEventWithSection(event, "wall");
                              }}
                              className="flex-1 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-neutral-200 hover:border-orange-200 text-neutral-600 rounded-xl py-1.5 px-2 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                              <span>Event Wall ({event.comments.length})</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectEventWithSection(event, "album");
                              }}
                              className="flex-1 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-neutral-200 hover:border-orange-200 text-neutral-600 rounded-xl py-1.5 px-2 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5 text-orange-500" />
                              <span>Album ({event.photos.length})</span>
                            </button>
                          </div> */}
                        </div>
                      </div>

                      {/* Interactive Footer Panel */}
                      <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-neutral-400" />
                          {event.isPrivate ? "Private Link" : "Public Flyer"}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-orange-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            Preview <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
