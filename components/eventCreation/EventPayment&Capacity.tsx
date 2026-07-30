"use client";

import { AFRICAN_REGIONS } from "@/lib/Constants";
import { Sparkles } from "lucide-react";

export default function EventPaymentAndCapacity({
  detailsSubStep,
  setDetailsSubStep,
  newMonetization,
  setNewMonetization,
  newMomoOperator,
  setNewMomoOperator,
  newMomoPhone,
  setNewMomoPhone,
  newRegion,
  newCurrency,
  setNewMomoAmount,
  setNewMaxCapacityEnabled,
  setNewMaxCapacity,
  newMomoAmount,
  newMaxCapacity,
  newMaxCapacityEnabled,
  newWaitlistEnabled,
  setNewWaitlistEnabled,
  newIsPrivate,
  setNewIsPrivate,
}: any) {
  return (
    <>
      {
        <div className="space-y-4">
          {/* Monetization */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700">
              Monetization Settings
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Free", label: "🎁 Free Admission" },
                { id: "Cash_at_event", label: "🚪 Pay at the Door" },
                { id: "Mobile_payment", label: "📱 Mobile Money" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setNewMonetization(
                      opt.id as "Free" | "Mobile_payment" | "Cash_at_event",
                    )
                  }
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                    newMonetization === opt.id
                      ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                      : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Money Details Panel */}
          {newMonetization === "momo" && (
            <div className="animate-[fadeIn_0.8s_ease-in-out] bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-3">
              <h5 className="text-xs font-bold text-neutral-800">
                Configure Payout Account (
                {AFRICAN_REGIONS.find((r) => r.id === newRegion)?.operators.join(" / ") ||
                  "Wave / MTN / Orange"}
                )
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase font-sans">
                    Operator
                  </label>
                  <select
                    value={newMomoOperator}
                    onChange={(e) => setNewMomoOperator(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    {(
                      AFRICAN_REGIONS.find((r) => r.id === newRegion)?.operators || [
                        "Wave",
                        "Orange Money",
                        "MTN MoMo",
                      ]
                    ).map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase font-sans">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMomoPhone}
                    onChange={(e) => setNewMomoPhone(e.target.value)}
                    placeholder={
                      AFRICAN_REGIONS.find((r) => r.id === newRegion)?.placeholderPhone ||
                      "+225 07..."
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase font-sans">
                    Price per ticket ({newCurrency})
                  </label>
                  <input
                    type="number"
                    required
                    value={newMomoAmount}
                    onChange={(e) => setNewMomoAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Capacity Limit & Waitlist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 border border-neutral-200 rounded-2xl p-4 bg-neutral-50">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-700">
                  Set Max Guest Capacity
                </label>
                <input
                  type="checkbox"
                  checked={newMaxCapacityEnabled}
                  onChange={(e) => setNewMaxCapacityEnabled(e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-neutral-300 focus:ring-orange-500 rounded-sm"
                />
              </div>
              {newMaxCapacityEnabled && (
                <input
                  type="number"
                  value={newMaxCapacity}
                  onChange={(e) => setNewMaxCapacity(e.target.value)}
                  placeholder="50"
                  className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-orange-500"
                />
              )}
            </div>

            <div className="space-y-2 border border-neutral-200 rounded-2xl p-4 bg-neutral-50 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold text-neutral-700">
                    Enable Waitlist
                  </label>
                  <p className="text-[10px] text-neutral-500 font-sans">
                    Automatically Queue guests when capacity is reached.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={newWaitlistEnabled}
                  onChange={(e) => setNewWaitlistEnabled(e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-neutral-300 focus:ring-orange-500 rounded-sm"
                />
              </div>
            </div>
          </div>

          {/* Privacy Check */}
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 p-3 rounded-2xl">
            <input
              type="checkbox"
              checked={newIsPrivate}
              onChange={(e) => setNewIsPrivate(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-neutral-300 focus:ring-orange-500 rounded-sm"
            />
            <div className="text-[11px] font-sans">
              <p className="font-bold text-neutral-700">
                Make Event Private (Secret Web URL only)
              </p>
              <p className="text-neutral-500">
                Only people with the direct universal link can RSVP and view details.
              </p>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="pt-4 flex justify-between items-center border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setDetailsSubStep("location")}
              className="text-neutral-400 font-bold px-4 py-2 hover:text-neutral-600 transition-colors text-xs font-sans"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-100 transition-all text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish & Share Event Flyer</span>
            </button>
          </div>
        </div>
      }
    </>
  );
}
