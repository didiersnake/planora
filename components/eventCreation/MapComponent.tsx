"use client";
import { motion } from "framer-motion";
export default function MapComponent({ displayMap }: { displayMap: boolean }) {
  return (
    <>
      {displayMap && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-80 border border-neutral-200 rounded-3xl overflow-hidden"
        >
          <div className="w-full h-full" id="my-map"></div>
        </motion.div>
      )}
    </>
  );
}
