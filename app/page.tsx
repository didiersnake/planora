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

// Initial preloaded event to make it look full and functional from day one
// const PRELOADED_EVENT: SocialEvent = {
//   id: "preloaded-assie-beach",
//   title: "Beach Party Chic & Grillades",
//   hostName: "Didier Djakoua",
//   description:
//     "Rejoignez-nous pour une journée exceptionnelle à Assinie-Mafia ! Au programme : farniente, baignade, poisson braisé cuit au feu de bois, cocktails tropicaux et les meilleurs mixes Afro-deep de notre DJ invité. Venez avec votre plus belle tenue de plage blanche !",
//   category: "beach",
//   coverImage:
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
//   dressCode: "Plage Chic (Tout en Blanc)",
//   date: "2026-08-01",
//   startTime: "13:00",
//   endTime: "22:00",
//   locationName: "Assinie-Mafia KM 11.5, en face du Lodge",
//   landmarkPin: { x: 420, y: 260, name: "Assinie-Mafia KM 11.5 Beachfront" },
//   isPrivate: false,
//   monetization: "momo",
//   momoDetails: {
//     operator: "Wave",
//     phoneNumber: "+225 07 09 88 55 22",
//     amount: 15000,
//   },
//   maxCapacityEnabled: true,
//   maxCapacity: 30,
//   waitlistEnabled: true,
//   guests: [
//     {
//       id: "g1",
//       name: "Marie-Laure Kouamé",
//       phone: "+225 07 01 02 03",
//       status: "confirmed",
//       registeredAt: "2026-07-13T10:00:00Z",
//     },
//     {
//       id: "g2",
//       name: "Koffi Ange Yao",
//       phone: "+225 05 55 44 33",
//       status: "confirmed",
//       registeredAt: "2026-07-13T10:15:00Z",
//     },
//     {
//       id: "g3",
//       name: "Zahra Touré",
//       phone: "+225 01 12 23 34",
//       status: "confirmed",
//       registeredAt: "2026-07-13T11:00:00Z",
//     },
//     {
//       id: "g4",
//       name: "Aminata Sylla",
//       phone: "+225 07 88 77 66",
//       status: "confirmed",
//       registeredAt: "2026-07-13T11:20:00Z",
//     },
//     {
//       id: "g5",
//       name: "Jean-Marc N’Guessan",
//       phone: "+225 07 33 22 11",
//       status: "confirmed",
//       registeredAt: "2026-07-13T12:00:00Z",
//     },
//   ],
//   comments: [
//     {
//       id: "c1",
//       author: "Marie-Laure",
//       text: "On va s’enjailler grave ! Les grillades d’Assinie c’est le top du top ! 🔥",
//       timestamp: "3h ago",
//     },
//     {
//       id: "c2",
//       author: "Koffi Ange",
//       text: "Est-ce que le maillot de bain blanc est obligatoire ? 😂 J’ai hâte !",
//       timestamp: "2h ago",
//     },
//   ],
//   photos: [
//     {
//       id: "p1",
//       url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
//       uploadedBy: "Organizer",
//       uploadedAt: "2026-07-13T09:00:00Z",
//     },
//     {
//       id: "p2",
//       url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
//       uploadedBy: "Organizer",
//       uploadedAt: "2026-07-13T09:05:00Z",
//     },
//   ],
//   features: {
//     eventWall: true,
//     sharedAlbum: true,
//     guestListVisible: true,
//   },
// };

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
