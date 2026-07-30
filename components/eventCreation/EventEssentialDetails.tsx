"use client";
import { ArrowRight } from "lucide-react";

export default function EventDetails({
  detailsSubStep,
  setDetailsSubStep,
  newTitle,
  setNewTitle,
  setNewHost,
  newHost,
  newDescription,
  setNewEndTime,
  setNewStartTime,
  newDate,
  setNewDescription,
  setNewDate,
  newDressCode,
  newEndTime,
  setNewDressCode,
  setCreationStep,
  newStartTime,
}: {
  detailsSubStep: "essentials" | "location" | "settings";
  setDetailsSubStep: (e: "essentials" | "location" | "settings") => void;
  setNewTitle: (e: string) => void;
  newTitle: string;
  setNewHost: (e: string) => void;
  newHost: string;
  newDescription: string;
  setNewEndTime: (e: string) => void;
  setNewStartTime: (e: string) => void;
  newDate: string;
  setNewDescription: (e: string) => void;
  setNewDate: (e: string) => void;
  newDressCode: string;
  newEndTime: string;
  setNewDressCode: (e: string) => void;
  setCreationStep: (e: 1 | 2 | 3) => void;
  newStartTime: string;
}) {
  return (
    <>
      {
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Nuit du Maquis Chic"
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">
                Organizer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newHost}
                onChange={(e) => setNewHost(e.target.value)}
                placeholder="e.g., Didier Djakoua"
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700">
              Description / Program Details
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Write a welcoming description, entry specifics, dress code guidelines, or menu expectations."
              rows={4}
              className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">
                Dress Code Accents
              </label>
              <input
                type="text"
                value={newDressCode}
                onChange={(e) => setNewDressCode(e.target.value)}
                placeholder="e.g., Plage Chic / White Theme"
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Event Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Start Time</label>
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div>
            {/* <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">End Time</label>
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all"
              />
            </div> */}
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setCreationStep(2)}
              className="text-neutral-400 font-bold px-4 py-2 hover:text-neutral-600 transition-colors text-xs font-sans"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setDetailsSubStep("location")}
              disabled={!newHost || !newTitle || !newDate || !newStartTime}
              className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 disabled:opacity-50 transition-colors text-xs flex items-center gap-1.5"
            >
              <span>Next: Map Pin-Drop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      }
    </>
  );
}
