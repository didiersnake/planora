"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
// Custom components
import LandingPage from "@/components/LandingPage";

// Types
import { SocialEvent } from "@/lib/Types";

// Skeletons / loaders
import {
  DashboardSkeleton,
  EventPageSkeleton,
  EventCreationSkeleton,
} from "@/components/Loader";

export default function Home() {
  const [events, setEvents] = useState<SocialEvent[]>([]);
  // const [selectedEvent, setSelectedEvent] = useState<SocialEvent | null>(null);
  // const [initialSection, setInitialSection] = useState<"none" | "wall" | "album">("none");
  const [activeTab, setActiveTab] = useState<
    "landing" | "dashboard" | "eventView" | "create"
  >("landing");
  const router = useRouter();
  // Simulated Loaders Transition States
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [loadingTab, setLoadingTab] = useState<
    "landing" | "dashboard" | "eventView" | "create" | null
  >(null);

  // Load storage state on mount
  // useEffect(() => {
  //   const saved = localStorage.getItem("social_events_data");
  //   if (saved) {
  //     try {
  //       const parsed = JSON.parse(saved);
  //       setTimeout(() => {
  //         setEvents(parsed);
  //       }, 0);
  //     } catch (e) {
  //       console.error("Failed to parse social_events_data", e);
  //     }
  //   } else {
  //     localStorage.setItem("social_events_data", JSON.stringify([PRELOADED_EVENT]));
  //     setTimeout(() => {
  //       setEvents([PRELOADED_EVENT]);
  //     }, 0);
  //   }

  //   // Elegant initial page load simulation so user can appreciate the loader skeletons
  //   const timer = setTimeout(() => {
  //     setHasLoadedFromStorage(true);
  //   }, 850);

  //   return () => clearTimeout(timer);
  // }, []);

  // Save changes helper
  // const saveEvents = (updated: SocialEvent[]) => {
  //   setEvents(updated);
  //   localStorage.setItem("social_events_data", JSON.stringify(updated));
  // };

  // // Navigates cleanly between tabs with a highly visible themed loader skeleton
  // const navigateToTab = (
  //   tab: "landing" | "dashboard" | "eventView" | "create",
  //   targetEvent: SocialEvent | null = null,
  //   section: "none" | "wall" | "album" = "none",
  // ) => {
  //   setIsLoadingComponent(true);
  //   setLoadingTab(tab);

  //   setTimeout(() => {
  //     setActiveTab(tab);
  //     if (targetEvent !== undefined) {
  //       setSelectedEvent(targetEvent);
  //     }
  //     setInitialSection(section);
  //     setIsLoadingComponent(false);
  //     setLoadingTab(null);
  //   }, 600); // Polished simulated network delay
  // };

  // // Event Updates (Adding guest, adding comment, posting photo)
  // const handleUpdateEvent = (updatedEvent: SocialEvent) => {
  //   const updatedList = events.map((ev) =>
  //     ev.id === updatedEvent.id ? updatedEvent : ev,
  //   );
  //   saveEvents(updatedList);
  //   setSelectedEvent(updatedEvent);
  // };

  // // Create Event Action
  // const handlePublishEvent = (createdEvent: SocialEvent) => {
  //   const updated = [createdEvent, ...events];
  //   saveEvents(updated);
  //   navigateToTab("eventView", createdEvent);
  // };

  // // Delete Event Action
  // const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
  //     const updated = events.filter((ev) => ev.id !== id);
  //     saveEvents(updated);
  //     if (selectedEvent?.id === id) {
  //       setSelectedEvent(null);
  //       setActiveTab("dashboard");
  //     }
  //   }
  // };

  return (
    <div
      className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900"
      id="app_root"
    >
      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6" id="main_content">
        <AnimatePresence mode="wait">
          {/* 1. Initial Page Load (Full Page Skeleton) */}
          {
            // !hasLoadedFromStorage ? (
            //   <motion.div
            //     key="initial-skeleton"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     exit={{ opacity: 0 }}
            //     transition={{ duration: 0.15 }}
            //   >
            //     <DashboardSkeleton />
            //   </motion.div>
            // ) :
            isLoadingComponent ? (
              /* 2. Transition Skeletons */
              <motion.div
                key={`loading-tab-${loadingTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {loadingTab === "landing" && <DashboardSkeleton />}
                {loadingTab === "dashboard" && <DashboardSkeleton />}
                {loadingTab === "eventView" && <EventPageSkeleton />}
                {loadingTab === "create" && <EventCreationSkeleton />}
              </motion.div>
            ) : (
              /* 3. Fully Loaded Active Component Views */
              <motion.div
                key={`tab-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <LandingPage
                  onExploreEvents={() => router.push("/home")}
                  onPlanEvent={() => router.push("/events/create")}
                  // featuredEventsCount={events.length}
                />

                {/* {activeTab === "dashboard" && (
                <HomePage
                  events={events}
                  onSelectEvent={(event) => navigateToTab("eventView", event, "none")}
                  onSelectEventWithSection={(event, section) =>
                    navigateToTab("eventView", event, section)
                  }
                  onDeleteEvent={handleDeleteEvent}
                  onCreateClick={() => navigateToTab("create")}
                />
              )} */}

                {/* {activeTab === "create" && (
                <EventCreation
                  onCreate={handlePublishEvent}
                  onCancel={() => navigateToTab("dashboard", null)}
                />
              )} */}

                {/* {activeTab === "eventView" && selectedEvent && (
                <EventPage
                  key={`${selectedEvent.id}-${initialSection}`}
                  selectedEvent={selectedEvent}
                  events={events}
                  onBackToDashboard={() => navigateToTab("dashboard", null)}
                  onUpdateEvent={handleUpdateEvent}
                  initialSection={initialSection}
                />
              )} */}
              </motion.div>
            )
          }
        </AnimatePresence>
      </main>
    </div>
  );
}
