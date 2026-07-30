"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { CATEGORIES } from "../../lib/Constants";
import { useEffect } from "react";
import { eventService } from "@/lib/services/eventService";
import { useAuth } from "@/lib/authContext";
import React from "react";
import { Category } from "@/lib/Types";

export default function EventCategory({
  creationStep,
  setCreationStep,
  newCategory,
  handleCategorySelect,
  setIsLoading,
  setCategories,
  categories,
}: {
  creationStep: number;
  setCreationStep: (step: 1 | 2 | 3) => void;
  categories: Category[];
  newCategory: string | null;
  setIsLoading: (loading: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  handleCategorySelect: (catId: string) => void;
}) {
  return (
    <>
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6 animate-fadeIn"
        id="full_step_category"
      >
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
            Vibe Selection
          </span>
          <h3 className="text-2xl font-bold font-display text-neutral-900 mt-2 tracking-tight">
            What is the Vibe of your Gathering?
          </h3>
          <p className="text-neutral-500 text-xs">
            Choose the category that matches your event type. This defines the preloaded
            styles, maps, and music presets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const isActive = newCategory === cat.categoryCode;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.995 }}
                // onClick={() => handleCategorySelect(cat.id)}
                onClick={() => handleCategorySelect(cat.categoryCode)}
                className={`relative cursor-pointer border-2 p-5 rounded-2xl transition-all duration-200 text-left flex items-center  gap-4 ${
                  isActive
                    ? "border-orange-600 bg-orange-50/20 shadow-sm"
                    : "border-neutral-100 bg-white hover:border-orange-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "bg-neutral-50 text-neutral-600"
                  }`}
                >
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <span>{cat.name}</span>
                    {isActive && (
                      <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    )}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (newCategory) {
                setCreationStep(2);
              }
            }}
            disabled={!newCategory}
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 disabled:opacity-50 transition-colors text-xs flex items-center gap-1.5"
          >
            <span>Choose Flyer Art</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
