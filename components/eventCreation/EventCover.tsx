"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import React, { useEffect } from "react";
import { Category } from "@/lib/Types";

export default function EventCovers({
  handleCategorySelect,
  setCreationStep,
  newCategory,
  newCover,
  fileInputRef,
  handleCustomCoverUpload,
  categories,
  covers,
  isCustomCover,
  setIsCustomCover,
  setNewCover,
}: {
  handleCategorySelect: (catId: string) => void;
  setCreationStep: (step: 1 | 2 | 3) => void;
  newCategory: string;
  newCover: string;
  categories: Category[];
  covers: string[];
  setIsCustomCover: (cover: boolean) => void;
  creationStep: number;
  setNewCover: (cover: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleCustomCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCustomCover: boolean | string;
}) {
  return (
    <>
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6 animate-fadeIn"
        id="full_step_cover"
      >
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
            Thematic Art Canvas
          </span>
          <h3 className="text-2xl font-bold font-display text-neutral-900 mt-2 tracking-tight">
            Select your digital flyer background
          </h3>
          <p className="text-neutral-500 text-xs">
            Browse high-resolution curated cover art. Filter by event categories or see
            all covers available for your vibe.
          </p>
        </div>

        {/* Custom Device Upload Box */}
        <div className="bg-orange-50/40 border border-dashed border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 justify-center sm:justify-start">
              <Upload className="w-4 h-4 text-orange-600" />
              <span>Have your own flyer design?</span>
            </h4>
            <p className="text-[10px] text-neutral-500 font-sans">
              Upload any image from your device to use as a custom flyer cover art.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 hover:border-orange-300 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Device</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomCoverUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Filter Category Tabs for cover images */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-neutral-100 pb-4">
          <button
            type="button"
            onClick={() => handleCategorySelect(newCategory)}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200"
          >
            {categories.find((c) => c.categoryCode === newCategory)?.name}
          </button>
          {categories
            .filter((c) => c.categoryCode !== newCategory)
            .map((cat) => (
              <button
                key={cat.categoryCode}
                type="button"
                onClick={() => handleCategorySelect(cat.categoryCode)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200 bg-white"
              >
                {cat.name}
              </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Custom Uploaded Cover Card */}
          {isCustomCover && (
            <motion.div
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setNewCover(newCover)}
              className="relative h-44 rounded-2xl overflow-hidden cursor-pointer border-3 border-orange-600 ring-4 ring-orange-50"
            >
              {newCover !== "" && (
                <Image
                  src={newCover}
                  alt="Custom uploaded flyer cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  unoptimized={true}
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-neutral-900/10 to-transparent"></div>

              {/* Selected Overlay */}
              <div className="absolute inset-0 bg-orange-600/10 flex items-center justify-center">
                <span className="bg-orange-600 text-white rounded-full p-2 shadow-lg scale-110">
                  <Check className="w-5 h-5" />
                </span>
              </div>

              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-orange-600 px-2 py-0.5 rounded-sm backdrop-blur-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Custom Uploaded Cover
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setNewCover("");
                  setIsCustomCover(false);
                }}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-md transition-all flex items-center justify-center cursor-pointer"
                title="Remove custom cover"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* Default Cover Cards */}
          {covers.map((imgUrl, index) => {
            const isSelected = newCover === imgUrl;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setNewCover(imgUrl)}
                className={`relative h-44 rounded-2xl overflow-hidden cursor-pointer border-3 transition-all ${
                  isSelected
                    ? "border-orange-600 ring-4 ring-orange-50"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt="Flyer cover backdrop"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  unoptimized={
                    true
                    // newCover.startsWith("data:") || newCover.startsWith("blob:")
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-neutral-900/10 to-transparent"></div>

                {/* Selected Overlay */}
                {isSelected ? (
                  <div className="absolute inset-0 bg-orange-600/10 flex items-center justify-center">
                    <span className="bg-orange-600 text-white rounded-full p-2 shadow-lg scale-110">
                      <Check className="w-5 h-5" />
                    </span>
                  </div>
                ) : (
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-neutral-900/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Layout Option {index + 1}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-neutral-100 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCreationStep(1)}
            className="text-neutral-400 font-bold px-4 py-2 hover:text-neutral-600 transition-colors text-xs font-sans"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (newCover) {
                setCreationStep(3);
              }
            }}
            disabled={!newCover}
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 disabled:opacity-50 transition-colors text-xs flex items-center gap-1.5"
          >
            <span>Configure Logistics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
