"use client";

import Image from "next/image";
import { CATEGORIES } from "@/lib/Constants";
import { Category } from "@/lib/Types";
export default function EventPreview({
  newCover,
  newCategory,
  newTitle,
  newHost,
  newDate,
  newStartTime,
  newEndTime,
  newLocationName,
  newDressCode,
  newMonetization,
  newMomoAmount,
  newMaxCapacityEnabled,
  newMaxCapacity,
  newWaitlistEnabled,
  categories,
  newMomoOperator,
}: {
  newCover: string;
  newCategory: string;
  categories: Category[];
  newTitle: string;
  newHost: string;
  newDate: string;
  newStartTime: string;
  newEndTime: string;
  newLocationName: string;
  newDressCode: string;
  newMonetization: string;
  newMomoAmount: string;
  newMaxCapacityEnabled: boolean;
  newMaxCapacity: string;
  newWaitlistEnabled: boolean;
  newMomoOperator: string;
}) {
  return (
    <>
      <div className="lg:col-span-5 hidden lg:block">
        <div
          className="sticky top-24 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl animate-fadeIn"
          id="creation_live_flyer_preview"
        >
          <div className="relative h-48 bg-slate-900">
            {newCover ? (
              <Image
                src={newCover}
                alt="Selected canvas cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-wider uppercase opacity-75">
                  Flyer cover will show here
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>

            {/* Live Badge and Draft watermark */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <span className="bg-orange-600 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                {categories.find((c) => c.categoryCode === newCategory)?.name || "Vibe"}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-neutral-900/75 border border-white/20 text-orange-400 font-mono text-[9px] px-2 py-1 rounded shadow backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></span>
                <span>DRAFT PREVIEW</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-xl font-bold tracking-tight font-display drop-shadow-md truncate">
                {newTitle || "Draft Event Title"}
              </h4>
              <p className="text-xs text-slate-300 drop-shadow-sm font-sans">
                Organized by <span className="font-bold">{newHost || "Host Name"}</span>
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4 font-sans text-xs text-neutral-600">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  📅 Date
                </span>
                <span className="font-bold text-neutral-800">
                  {newDate
                    ? new Date(newDate).toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })
                    : "Not selected"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  ⏰ Heure
                </span>
                <span className="font-bold text-neutral-800">
                  {newStartTime || "14:00"} - {newEndTime || "23:00"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                📍 Location Landmark
              </span>
              <p className="font-bold text-neutral-800 truncate">
                {newLocationName || "No Landmark Selected yet"}
              </p>
            </div>

            {newDressCode && (
              <div className="bg-orange-50/50 border border-orange-100 p-2.5 rounded-xl flex items-center gap-2">
                <span className="text-base">👔</span>
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                    Dress Code Accents
                  </span>
                  <span className="font-semibold text-orange-800">{newDressCode}</span>
                </div>
              </div>
            )}

            <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Monetization Type
                </span>
                <span className="font-bold text-neutral-800">
                  {newMonetization === "momo"
                    ? `📱 Mobile Money (${newMomoOperator})`
                    : newMonetization === "door"
                      ? "🚪 Pay at the Door"
                      : "🎁 Free Admission"}
                </span>
              </div>
              {newMonetization === "momo" && (
                <div className="text-right">
                  <span className="bg-orange-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                    {parseInt(newMomoAmount).toLocaleString()} XOF
                  </span>
                </div>
              )}
            </div>

            {/* Simulating capacity warning */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>
                Max Guests: {newMaxCapacityEnabled ? newMaxCapacity : "Unlimited"}
              </span>
              <span>Waitlist: {newWaitlistEnabled ? "Enabled 🟢" : "Disabled 🔴"}</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                disabled
                className="w-full py-2.5 bg-orange-600/10 border border-orange-600/20 text-orange-700 font-bold rounded-xl text-center cursor-not-allowed opacity-75"
              >
                ✨ Interactive Guest RSVP Locked
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
