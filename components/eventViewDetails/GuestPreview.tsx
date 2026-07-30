"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Camera, MessageSquare, X, Check, Maximize2 } from "lucide-react";
import React from "react";
import { PRESET_GIFS, CATEGORIES } from "../../lib/Constants";
import { EventResponse } from "../../lib/Types";
import { externalApiClient } from "@/lib/services/api";
import dynamic from "next/dynamic";

// Disable SSR for the component containing your Leaflet maps
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function GuestPreview({
  selectedEvent,
  setRsvpName,
  handleRSVP,
  rsvpName,
  rsvpPhone,
  setRsvpPhone,
  rsvpStatus,
  setRsvpStatus,
  setExpandedSection,
  //   handleAddComment,
  newComment,
  setNewComment,
  setShowGifSelector,
  showGifSelector,
  setSelectedGif,
  //   handlePhotoUpload,
  selectedGif,
  getDaysRemaining,
}: {
  selectedEvent: EventResponse;
  setRsvpName: (e: string) => void;
  handleRSVP: (e: React.FormEvent) => void;
  rsvpName: string;
  rsvpPhone: string;
  setRsvpPhone: (e: string) => void;
  rsvpStatus: any;
  setRsvpStatus: (e: any) => void;
  setExpandedSection: (e: "none" | "wall" | "album") => void;
  //   handleAddComment: (e: React.FormEvent) => void;
  newComment: string;
  setNewComment: (e: string) => void;
  setShowGifSelector: (e: boolean) => void;
  showGifSelector: boolean;
  //   handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGif: any;
  getDaysRemaining: (e: string) => number;
  setSelectedGif: (e: any) => void;
}) {
  const [displayMap, setDisplayMap] = React.useState(true);
  const apiKey = "7bb8642466d54dc1b41a16f7fb9bf4b6";

  //Load leaflet map
  React.useEffect(() => {
    // if (!displayMap || !selectedMapPoint) return;

    let cancelled = false;

    const initMap = async () => {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;
      const lat = selectedEvent.location?.point?.coordinates[0];
      const long = selectedEvent.location?.point?.coordinates[1];
      console.log(lat, long);

      if (cancelled) return;
      const getLocationMapDisplay = () => {
        var map = L.map("my-map").setView([lat, long], 15);
        // var myAPIKey = "7bb8642466d54dc1b41a16f7fb9bf4b6";
        var isRetina = L.Browser.retina;

        var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`;
        var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`;

        L.tileLayer(isRetina ? retinaUrl : baseUrl, {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
          // apiKey: myAPIKey,
          maxZoom: 20,
          id: "osm-bright",
        }).addTo(map);

        L.marker([lat, long], {
          icon: L.icon({
            iconUrl: `https://api.geoapify.com/v2/icon/?type=awesome&color=red&size=24&scaleFactor=2&apiKey=${apiKey}`,
            iconSize: [15, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [25, 25],
          }),
        }).addTo(map);
      };

      getLocationMapDisplay();
    };

    void initMap();

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <motion.div
      key="guest-view-mode"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      id="guest_flyer_layout"
    >
      {/* Left Column: Event Card Flyer */}
      <div className="lg:col-span-7 space-y-6">
        <div
          className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg"
          id="guest_flyer_card"
        >
          {/* Interactive Cover Header */}
          <div className="relative h-64 md:h-80 w-full bg-slate-900">
            <Image
              src={selectedEvent.templatePath}
              alt={selectedEvent.title}
              fill
              className="object-cover opacity-90"
              referrerPolicy="no-referrer"
              unoptimized={
                true
                // selectedEvent.coverImage.startsWith("data:") ||
                // selectedEvent.coverImage.startsWith("blob:")
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

            {/* Dynamic Floating Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
                <span>{selectedEvent.eventCategory.icon}</span>
                <span className="uppercase tracking-wider">
                  {selectedEvent.eventCategory.name}
                </span>
              </span>

              <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {getDaysRemaining(selectedEvent.startAt)} Days Left
              </span>
            </div>

            {/* Overlaid Title */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight tracking-tight drop-shadow-sm">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-orange-200 font-medium flex items-center gap-1">
                <span>Hosted by</span>
                <span className="underline decoration-orange-400 decoration-2 underline-offset-2">
                  {selectedEvent.host}
                </span>
              </p>
            </div>
          </div>

          {/* Event Details Ribbon */}
          <div className="bg-orange-50 border-y border-orange-100 p-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-800 font-medium">
            <div className="space-y-1">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                Date
              </p>
              <p className="font-semibold">
                {new Date(selectedEvent.startAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="space-y-1 border-x border-orange-200/60">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                Time
              </p>
              <p className="font-semibold">{selectedEvent.startTime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                Dress Code
              </p>
              <p className="font-semibold truncate px-1">{selectedEvent.dressCode}</p>
            </div>
          </div>

          {/* Content Panel */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 font-display">About the Event</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            {/* West African Location Map & Coordinates info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>Event Landmark Location</span>
                  </h4>
                  <p className="text-xs text-slate-600">{selectedEvent.locationName}</p>
                </div>
              </div>

              {/* Interactive Pin-Drop Map */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-80 border border-neutral-200 rounded-3xl overflow-hidden"
              >
                <div className="w-full h-full" id="my-map"></div>
              </motion.div>
            </div>

            {/* Monetization & Mobile Money Regional Banner */}
            <div
              className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden"
              id="regional_momo_banner"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 text-slate-900 p-2 rounded-lg font-bold text-xs flex items-center justify-center">
                    MoMo
                  </div>
                  <div>
                    <h5 className="font-bold text-sm font-display">Payments Enabled</h5>
                  </div>
                </div>
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-md font-semibold font-mono uppercase">
                  {selectedEvent.currency || "FCFA"}
                </span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Admission Fee:</span>
                <span className="font-bold text-orange-400 text-base">
                  {selectedEvent.monetizationType === "Free" && "🎁 Free Entry"}
                  {selectedEvent.monetizationType === "Cash_at_event" &&
                    "🚪 Pay At The Door"}
                  {/* {selectedEvent.monetizationType === "Mobile_payment" &&
                    `${selectedEvent.momoDetails?.amount.toLocaleString()} ${selectedEvent.currency}`} */}
                </span>
              </div>

              {/* {selectedEvent.monetization === "momo" && selectedEvent.momoDetails && (
                  <div className="bg-slate-800/80 rounded-xl p-3 text-[11px] text-slate-300 flex items-center justify-between border border-slate-700/50">
                    <div>
                      <p className="text-slate-400 text-[9px] uppercase font-bold">
                        Operator Payout
                      </p>
                      <p className="font-semibold text-white flex items-center gap-1">
                        <span>🚀 {selectedEvent.momoDetails.operator}</span>
                        <span className="text-slate-500">|</span>
                        <span>{selectedEvent.momoDetails.phoneNumber}</span>
                      </p>
                    </div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-sm text-[9px] font-bold border border-green-500/30">
                      Native {regionConfig.emoji} Payments
                    </span>
                  </div>
                )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: RSVP Registration & Social Interaction */}
      <div className="lg:col-span-5 space-y-6">
        {/* RSVP Simulator Box */}
        <div
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4"
          id="rsvp_box"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 font-display text-lg">
              Secure Your Spot
            </h4>
            <p className="text-xs text-slate-500">
              No account required. Instant zero-install registration.
            </p>
          </div>

          {/* Capacity limit details */}
          {selectedEvent.maxCapacityEnabled && selectedEvent.guestList && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500">Event Capacity:</span>
                <p className="font-bold text-slate-800">
                  {selectedEvent.guestList?.length} / {selectedEvent.maxCapacity} Guests
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  (selectedEvent.maxCapacity || 0) - selectedEvent.guestList?.length <= 2
                    ? "bg-red-50 text-red-600 border border-red-200 animate-pulse"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {(selectedEvent.maxCapacity || 0) - selectedEvent.guestList.length <= 0
                  ? "Waitlist Open"
                  : `${(selectedEvent.maxCapacity || 0) - selectedEvent.guestList.length} spots left`}
              </span>
            </div>
          )}

          {/* RSVP Form */}
          <form onSubmit={handleRSVP} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="e.g. Koffi Kouamé"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Phone Number (WhatsApp or Mobile Money)
              </label>
              <input
                type="tel"
                required
                value={rsvpPhone}
                onChange={(e) => setRsvpPhone(e.target.value)}
                placeholder={`e.g.,225 55 55 55 55`}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* {selectedEvent.monetization === "Mobile_payment" && (
              <div className="text-[10px] text-slate-500 bg-orange-50/50 p-2.5 rounded-lg border border-orange-100 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>
                  Confirming this registration will trigger a mock checkout payment popup.
                  Under production, this launches {regionConfig.operators.join("/")} API.
                </span>
              </div>
            )} */}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all duration-200 shadow-md shadow-orange-100 flex items-center justify-center gap-1"
            >
              {selectedEvent.monetizationType === "Mobile_payment"
                ? "Pay & Register with Mobile Money"
                : "Confirm RSVP / Spot"}
            </button>
          </form>

          {/* Success / Waitlist alerts */}
          <AnimatePresence>
            {rsvpStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
                  rsvpStatus.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : rsvpStatus.type === "waitlist"
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Registration Update</span>
                </div>
                <p>{rsvpStatus.message}</p>
                <button
                  type="button"
                  onClick={() => setRsvpStatus(null)}
                  className="text-[10px] underline hover:opacity-80"
                >
                  Dismiss Alert
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Event Wall Comments section */}
        <div
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4"
          id="comment_wall_box"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 font-display flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>Interactive Event Wall</span>
            </h4>
            {/* <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-mono">
                {selectedEvent.comments.length} Posts
              </span>
              <button
                onClick={() => setExpandedSection("wall")}
                className="text-[10px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-lg border border-orange-100 transition flex items-center gap-1 cursor-pointer"
                id="expand_wall_btn"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Dedicated Page</span>
              </button>
            </div> */}
          </div>

          {/* Comment Input */}
          {/* <form onSubmit={handleAddComment} className="space-y-2"> */}
          {/* <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment, tip or question..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowGifSelector(!showGifSelector)}
                className="absolute right-2.5 bottom-2.5 text-xs bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold px-1.5 py-1 rounded-md"
                title="Add GIF"
              >
                GIF
              </button>
            </div> */}

          {/* GIF Selection grid */}
          {/* {showGifSelector && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                <p className="text-[10px] text-slate-500 font-bold">
                  Select a local Party GIF vibe:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_GIFS.map((gif: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedGif(gif.url);
                        setShowGifSelector(false);
                      }}
                      className={`relative h-12 rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedGif === gif.url
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={gif.url}
                        alt={gif.label}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 inset-x-0 text-[8px] bg-slate-900/60 text-white text-center">
                        {gif.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

          {/* Selected GIF banner */}
          {/* {selectedGif && (
              <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-xl border border-orange-100">
                <div className="relative w-10 h-10 rounded overflow-hidden">
                  <Image
                    src={selectedGif}
                    alt="Selected GIF"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-orange-600">
                  GIF Selected ready to post!
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedGif(null)}
                  className="text-red-500 hover:text-red-700 ml-auto"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )} */}
          {/* 
            <button
              type="submit"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1.5 rounded-xl text-xs transition"
            >
              Post Comment
            </button>
          </form> */}

          {/* Comment feed */}
          {/* <div
            className="space-y-3 max-h-64 overflow-y-auto pr-1 font-sans"
            id="comments_feed"
          >
            <AnimatePresence initial={false}>
              {selectedEvent.comments.map((comment: any) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{comment.author}</span>
                    <span className="text-[10px] text-slate-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  {comment.text && <p className="text-slate-600">{comment.text}</p>}
                  {comment.gif && (
                    <div className="relative h-28 w-full max-w-[200px] rounded-lg overflow-hidden border border-slate-200 mt-1">
                      <Image
                        src={comment.gif}
                        alt="GIF Comment"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div> */}
        </div>

        {/* Shared Photo Album section */}
        <div
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4"
          id="shared_album_box"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 font-display flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-orange-600" />
              <span>Collaborative Photo Album</span>
            </h4>
            {/* <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedSection("album")}
                className="text-[10px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-lg border border-orange-100 transition flex items-center gap-1 cursor-pointer"
                id="expand_album_btn"
              >
                <Maximize2 className="w-3 h-3" />
                <span>View Gallery</span>
              </button>
              <button
                onClick={() => handlePhotoUpload}
                className="text-[10px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                + Post Photo
              </button>
            </div> */}
          </div>

          {/* {selectedEvent.photos.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400 space-y-1">
              <p>No photos uploaded yet.</p>
              <p className="text-[10px] text-slate-500">
                Tap &ldquo;Post Photo&rdquo; to simulate guest uploads!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2" id="album_grid">
              {selectedEvent.photos.map((photo: any) => (
                <div
                  key={photo.id}
                  className="relative h-20 bg-slate-100 rounded-lg overflow-hidden group/photo border border-slate-200"
                >
                  <Image
                    src={photo.url}
                    alt="Party"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition flex items-end p-1">
                    <span className="text-[8px] text-white truncate">
                      {photo.uploadedBy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
}
