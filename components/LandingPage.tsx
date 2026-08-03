import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Share2,
  Smartphone,
  CheckCircle,
  MapPin,
  Users,
  Coins,
  HelpCircle,
  Flame,
} from "lucide-react";

interface LandingPageProps {
  onExploreEvents: () => void;
  onPlanEvent: () => void;
}

export default function LandingPage({ onExploreEvents, onPlanEvent }: LandingPageProps) {
  return (
    <motion.div
      key="landing-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-16 py-6"
      id="landing_page_view"
    >
      {/* Hero Section */}
      <section
        className="relative rounded-3xl overflow-hidden bg-slate-950 text-white py-16 px-6 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl border border-slate-900"
        id="landing_hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-600/25 via-slate-950 to-slate-950 z-0"></div>

        <div className="space-y-6 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-orange-500/20">
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            <span>Start Here, Meet Everywhere</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Bring People Together with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Planora
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
            Create beautiful gathering pages in seconds. Invite friends instantly via a
            single link. Share memories, manage guestlists, and collect payments in your
            regional currency. No app install required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={onExploreEvents}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40"
              id="hero_explore_cta"
            >
              <span>Explore Active Gatherings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPlanEvent}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2"
              id="hero_create_cta"
            >
              <span>Plan an Event</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-6 text-slate-400 text-xs">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span>Free to start</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span>Instant Mobile Payment</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span>Zero-Download for guests</span>
            </span>
          </div>
        </div>

        {/* Decorative Graphic */}
        <div
          className="relative w-full max-w-[320px] md:max-w-[400px] h-[340px] z-10 hidden lg:block"
          id="hero_visual"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-[40px] rotate-6 opacity-10 blur-xl"></div>

          {/* Glassmorphic floating card */}
          <div className="absolute top-4 left-4 right-4 bottom-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-orange-500">
                  LIVE FLYER
                </span>
                <h3 className="font-bold text-lg text-white mt-1">
                  Assinie Beach Rendezvous
                </h3>
                <p className="text-xs text-slate-400">By Koffi & Friends</p>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-lg font-mono">
                XOF
              </span>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Assinie KM 11.5</span>
                </span>
                <span className="font-bold text-white">15,000 FCFA</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>Capacity: 24/30 Confirmed</span>
                <span className="text-orange-400 font-bold">6 Spots left!</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50">
              <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-[10px] font-black text-white">
                M
              </div>
              <div className="text-left">
                <p className="text-[9px] text-slate-400">Regional Checkout</p>
                <p className="text-[11px] font-bold text-slate-200">
                  Multi-Region MoMo Integrated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="space-y-8" id="landing_features">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Crafted for Unforgettable Gatherings
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            No friction, no downloads, just seamless connections from the moment you share
            the invite link.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-orange-300 transition-all shadow-xs"
            id="feat_card_1"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Zero-Install Mobile Flyer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your invitees access a beautifully optimized flyer page directly via a link.
              They RSVP, pay, and chat in under 30 seconds.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-orange-300 transition-all shadow-xs"
            id="feat_card_2"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Native Mobile Money</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accept payments in your local currency. Collect advance payments securely,
              manage tickets, or specify pay-at-entrance and free events with ease.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-orange-300 transition-all shadow-xs"
            id="feat_card_3"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Smart Capacity & Waitlist
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set an automatic capacity limit. Once full, the waitlist queue opens up
              automatically and promotes guests if spots clear.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Experience Highlight */}
      <section
        className="bg-orange-50/50 rounded-3xl border border-orange-100 p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        id="landing_interactive"
      >
        <div className="md:col-span-7 space-y-4 text-left">
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Interactive social engagement</span>
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-950 tracking-tight">
            Keep the hype alive before and after the gathering
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Invitees can see who is attending the public guest list, post questions or
            hype messages with GIFs on the interactive Event Wall, and upload photos
            directly to the collaborative post-event digital album.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              {/* <Users className="w-4 h-4 text-orange-600" /> */}
              <span>Visible Guest List</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              {/* <Share2 className="w-4 h-4 text-orange-600" /> */}
              <span>Interactive Event Wall</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              {/* <Sparkles className="w-4 h-4 text-orange-600" /> */}
              <span>Shared Collaborative Album</span>
            </div>
          </div>
        </div>

        <div
          className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm"
          id="landing_interactive_interactive_wall"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-xs text-slate-900">
              Interactive Wall Vibe
            </span>
            <span className="text-[9px] bg-green-50 text-green-600 border border-green-200 px-1.5 py-0.5 rounded-sm">
              Active Now
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-800 text-[10px]">
                <span>Marie-Laure Kouamé</span>
                <span className="text-slate-400">Just now</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                On va s’enjailler grave à Assinie ! Poisson braisé chaud 🔥🏖️
              </p>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-800 text-[10px]">
                <span>Ange Koffi</span>
                <span className="text-slate-400">10m ago</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Est-ce que le dress code blanc s&apos;applique aussi aux tongs ? 😂
              </p>
            </div>
          </div>

          <button
            onClick={onExploreEvents}
            className="w-full bg-slate-900 text-white font-bold text-xs py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Join Live Event Discussions
          </button>
        </div>
      </section>

      {/* FAQs section */}
      <section className="space-y-6" id="landing_faq">
        <h3 className="text-xl font-bold font-display text-center text-slate-900">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span>Do my guests need to download an app?</span>
            </h4>
            <p className="text-xs text-slate-500 pl-5 leading-relaxed">
              No! Guests view your custom event web flyer directly from their standard
              mobile browser. They can register, post on the wall, view the location, and
              pay without installing anything.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span>How does Mobile Money payment work?</span>
            </h4>
            <p className="text-xs text-slate-500 pl-5 leading-relaxed">
              When creating the event, specify advanced payment and add your local Mobile
              Money details. During registration, guests are guided to perform a secure
              regional checkout matching their country.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span>Is my event public or private?</span>
            </h4>
            <p className="text-xs text-slate-500 pl-5 leading-relaxed">
              You decide! Private events are completely hidden from our platform explore
              directory and only accessible via the unique URL you share. Public events
              can be discovered by anyone.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span>How does the waitlist promote guests?</span>
            </h4>
            <p className="text-xs text-slate-500 pl-5 leading-relaxed">
              If an event has reached capacity, new RSVPs are added to the waitlist. If an
              existing attendee cancels or is removed by the organizer, the next guest in
              line is promoted automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section
        className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-4"
        id="landing_cta"
      >
        <h3 className="text-2xl font-bold font-display">
          Ready to throw a legendary event?
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Start planning your gathering in less than 2 minutes. No subscription fees, just
          absolute positive vibes.
        </p>
        <div className="pt-2">
          <button
            onClick={onPlanEvent}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-full text-sm transition shadow-lg shadow-orange-950/50"
            id="landing_cta_create_btn"
          >
            Create Your Gathering Now
          </button>
        </div>
      </section>
    </motion.div>
  );
}
