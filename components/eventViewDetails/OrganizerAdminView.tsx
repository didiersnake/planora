import { motion } from "framer-motion";
import { SocialEvent } from "../../lib/Types";
import { Share2 } from "lucide-react";
import { EventResponse } from "../../lib/Types";
export default function OrganizerAdminView({
  selectedEvent,
  onUpdateEvent,
}: {
  selectedEvent: EventResponse;
  onUpdateEvent: (updatedEvent: EventResponse) => void;
}) {
  return (
    <motion.div
      key="organizer-view-mode"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-6"
      id="organizer_admin_view"
    >
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Organizer Dashboard Admin
          </h3>
          <p className="text-xs text-slate-500">
            Manage invitations, view waitlists, or edit event specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">Share flyer link:</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/events/${selectedEvent.slug}`,
              );
              alert("Flyer link copied to clipboard!");
            }}
            className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-700 flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin_metrics">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            Total Registered
          </p>
          <p className="text-xl font-bold text-slate-800">
            {selectedEvent.guestList?.length} Guests
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            Confirmed Spots
          </p>
          <p className="text-xl font-bold text-green-600">
            {selectedEvent.guestList?.filter((g) => g.status === "confirmed").length} /{" "}
            {selectedEvent.maxCapacity || "No Limit"}
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <p className="text-[10px] uppercase font-bold text-slate-400">
            Waitlisted Guests
          </p>
          <p className="text-xl font-bold text-amber-500">
            {selectedEvent.guestList?.filter((g) => g.status === "waitlist").length}{" "}
            Pending
          </p>
        </div>
        {/* <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <p className="text-[10px] uppercase font-bold text-slate-400">Total Comments</p>
          <p className="text-xl font-bold text-slate-800">
            {selectedEvent.comments.length} Posts
          </p>
        </div> */}
      </div>

      {/* Complete Guest List Table */}
      <div className="space-y-3" id="admin_guest_table">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 font-display text-sm">
            Guest List & Automatic Waitlist Queue
          </h4>
          <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
            Autosorted by Date
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="p-3">Guest Name</th>
                <th className="p-3">Phone / Mobile Money</th>
                <th className="p-3">Registered At</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedEvent.guestList?.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">{guest.name}</td>
                  <td className="p-3 text-slate-600 font-mono">{guest.phone}</td>
                  <td className="p-3 text-slate-400">
                    {new Date(guest.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        guest.status === "confirmed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {guest.status === "confirmed" ? "Confirmed Spot" : "On Waitlist"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {/* <button
                      onClick={() => {
                        // Remove guest
                        const updatedGuests = selectedEvent.guestList?.filter(
                          (g) => g.id !== guest.id,
                        );

                        // Promote next waitlisted guest if confirmed spot became available
                        if (
                          guest.status === "confirmed" &&
                          selectedEvent.maxCapacityEnabled
                        ) {
                          const waitlistIndex = updatedGuests?.findIndex(
                            (g) => g.status === "waitlist",
                          );
                          if (waitlistIndex !== -1) {
                            updatedGuests?[waitlistIndex]?.status = "confirmed";
                          }
                        }

                        const updatedEvent = {
                          ...selectedEvent,
                          guests: updatedGuests,
                        };
                        onUpdateEvent(updatedEvent);
                      }}
                      className="text-red-500 hover:text-red-700 font-bold px-1 py-0.5 rounded transition"
                      title="Remove Guest"
                    >
                      Remove
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
