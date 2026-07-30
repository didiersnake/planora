"use client";

import { AnimatePresence, motion } from "framer-motion";
export default function ContentHolder({ children }: { children: React.ReactNode }) {
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

            /* 2. Transition Skeletons */
            // <motion.div
            //   key={`loading-tab-${loadingTab}`}
            //   initial={{ opacity: 0 }}
            //   animate={{ opacity: 1 }}
            //   exit={{ opacity: 0 }}
            //   transition={{ duration: 0.15 }}
            // >
            //   {loadingTab === "landing" && <DashboardSkeleton />}
            //   {loadingTab === "dashboard" && <DashboardSkeleton />}
            //   {loadingTab === "eventView" && <EventPageSkeleton />}
            //   {loadingTab === "create" && <EventCreationSkeleton />}
            // </motion.div>

            /* 3. Fully Loaded Active Component Views */
            <motion.div
              key={`animated-tab`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {children}
            </motion.div>
          }
        </AnimatePresence>
      </main>
    </div>
  );
}
