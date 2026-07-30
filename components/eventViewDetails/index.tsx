import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Eye, Shield } from "lucide-react";
import { Guest, Comment, Photo, EventResponse } from "../../lib/Types";
import { AFRICAN_REGIONS } from "../../lib/Constants";
import GuestPreview from "./GuestPreview";
import OrganizerAdminView from "./OrganizerAdminView";
import { useAuth } from "@/lib/authContext";
import { EventPageSkeleton } from "../Loader";

interface EventPageProps {
  selectedEvent: EventResponse;
  events: EventResponse[];
  onBackToDashboard: () => void;
  onUpdateEvent: (updatedEvent: EventResponse) => void;
  initialSection?: "none" | "wall" | "album";
}

export default function EventDetailsPageComponent({
  selectedEvent,
  events,
  onBackToDashboard,
  onUpdateEvent,
  initialSection = "none",
}: EventPageProps) {
  //   const eventRegionId = selectedEvent.region || "west";
  //   const regionConfig = AFRICAN_REGIONS.find((r) => r.id === eventRegionId) || AFRICAN_REGIONS[0];
  //   const eventCurrency = selectedEvent.currency || regionConfig.currency || "FCFA (XOF)";

  const [viewMode, setViewMode] = useState<"organizer" | "guest">("guest");
  const [expandedSection, setExpandedSection] = useState<"none" | "wall" | "album">(
    initialSection,
  );
  const { isLoading } = useAuth();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Guest RSVP simulator states
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState<{
    type: "success" | "waitlist" | "error";
    message: string;
  } | null>(null);
  const [rsvpEmail, setRsvpEmail] = useState("");

  // Wall comment and GIF states
  const [newComment, setNewComment] = useState("");
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [showGifSelector, setShowGifSelector] = useState(false);

  // Days remaining helper
  const getDaysRemaining = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // RSVP simulator logic
  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;

    // Check capacity limit
    const confirmedGuests = selectedEvent.guestList?.length || 0;
    const isFull =
      selectedEvent.maxCapacityEnabled &&
      selectedEvent.maxCapacity &&
      confirmedGuests >= selectedEvent.maxCapacity;

    if (isFull && !selectedEvent.waitListEnabled) {
      setRsvpStatus({
        type: "error",
        message: "This event is fully booked and the waitlist is closed.",
      });
      return;
    }

    const rsvpStatusType = isFull ? "waitlist" : "confirmed";

    const newGuest: Guest = {
      id: "g-" + Date.now(),
      name: rsvpName,
      phone: rsvpPhone,
      status: rsvpStatusType,
      registeredAt: new Date().toISOString(),
      email: rsvpEmail,
    };

    const updatedGuests = selectedEvent.guestList && [
      ...selectedEvent.guestList,
      newGuest,
    ];
    const updatedEvent = { ...selectedEvent, guests: updatedGuests };

    onUpdateEvent(updatedEvent);

    setRsvpStatus({
      type: rsvpStatusType === "confirmed" ? "success" : "waitlist",
      message:
        rsvpStatusType === "confirmed"
          ? `Félicitations ${rsvpName}! You are officially registered for the event.`
          : `Capacity reached! ${rsvpName}, you have been added to the Waitlist at Position #${updatedGuests?.filter((g) => g.status === "waitlist").length}.`,
    });

    setRsvpName("");
    setRsvpPhone("");
  };

  // Add Comment logic
  //   const handleAddComment = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!newComment.trim() && !selectedGif) return;

  //     const commentObj: Comment = {
  //       id: "c-" + Date.now(),
  //       author: viewMode === "organizer" ? `${selectedEvent.host} (Host)` : "Guest",
  //       text: newComment,
  //       gif: selectedGif || undefined,
  //       timestamp: "Just now",
  //     };

  //     const updatedComments = [commentObj, ...selectedEvent.comments];
  //     const updatedEvent = { ...selectedEvent, comments: updatedComments };

  //     onUpdateEvent(updatedEvent);

  //     setNewComment("");
  //     setSelectedGif(null);
  //     setShowGifSelector(false);
  //   };

  // Upload Photo Action (Mock)
  //   const handlePhotoUpload = () => {
  //     const samplePartyImages = [
  //       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
  //       "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80",
  //       "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
  //       "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&q=80",
  //     ];
  //     const randomImg =
  //       samplePartyImages[Math.floor(Math.random() * samplePartyImages.length)];

  //     const newPhoto: Photo = {
  //       id: "p-" + Date.now(),
  //       url: randomImg,
  //       uploadedBy: viewMode === "organizer" ? "Host" : "Guest Friend",
  //       uploadedAt: new Date().toISOString(),
  //     };

  //     const updatedPhotos = [newPhoto, ...selectedEvent.photos];
  //     const updatedEvent = { ...selectedEvent, photos: updatedPhotos };

  //     onUpdateEvent(updatedEvent);
  //   };

  return (
    <>
      {isLoading ? (
        <EventPageSkeleton />
      ) : (
        <motion.div
          key="event-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
          id="event_detail_workspace"
        >
          {/* Back to dashboard and view mode selectors */}
          {expandedSection === "none" && (
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200"
              id="detail_nav_control"
            >
              <button
                onClick={onBackToDashboard}
                className="text-sm font-semibold text-neutral-600 hover:text-orange-600 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>

              {/* Simulated Viewer Selector (Highlights the zero-install guest flyer concept) */}
              <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200 self-start sm:self-center">
                <button
                  onClick={() => setViewMode("guest")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    viewMode === "guest"
                      ? "bg-orange-600 text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Guest View (Flyer)</span>
                </button>
                <button
                  onClick={() => setViewMode("organizer")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    viewMode === "organizer"
                      ? "bg-orange-600 text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Organizer Admin</span>
                </button>
              </div>
            </div>
          )}

          {/* View layout */}
          <AnimatePresence mode="wait">
            {expandedSection === "wall" ? (
              /* ========================================================
             DEDICATED FULL-SCREEN EVENT WALL VIEW
             ======================================================== */
              //   <EventCommentWall
              //     setExpandedSection={setExpandedSection}
              //     selectedEvent={selectedEvent}
              //     handleAddComment={handleAddComment}
              //     newComment={newComment}
              //     setNewComment={setNewComment}
              //     setShowGifSelector={setShowGifSelector}
              //     setSelectedGif={setSelectedGif}
              //     showGifSelector={showGifSelector}
              //     selectedGif={selectedGif}
              //   />
              <></>
            ) : expandedSection === "album" ? (
              /* ========================================================
             DEDICATED FULL-SCREEN PHOTO GALLERY / ALBUM VIEW
             ======================================================== */
              //   <PhotoGalleryPage
              //     selectedEvent={selectedEvent}
              //     setExpandedSection={setExpandedSection}
              //     handlePhotoUpload={handlePhotoUpload}
              //     setActivePhotoIndex={setActivePhotoIndex}
              //     activePhotoIndex={activePhotoIndex}
              //   />
              <></>
            ) : viewMode === "guest" ? (
              /* ========================================================
             GUEST PREVIEW: ZERO-INSTALL MOBILE-FIRST FLYER
             ======================================================== */
              <GuestPreview
                selectedEvent={selectedEvent}
                rsvpName={rsvpName}
                rsvpPhone={rsvpPhone}
                handleRSVP={handleRSVP}
                rsvpStatus={rsvpStatus}
                setRsvpName={setRsvpName}
                setRsvpPhone={setRsvpPhone}
                setRsvpStatus={setRsvpStatus}
                setExpandedSection={setExpandedSection}
                // handleAddComment={handleAddComment}
                newComment={newComment}
                setNewComment={setNewComment}
                setShowGifSelector={setShowGifSelector}
                showGifSelector={showGifSelector}
                setSelectedGif={setSelectedGif}
                // handlePhotoUpload={handlePhotoUpload}
                selectedGif={selectedGif}
                getDaysRemaining={getDaysRemaining}
              />
            ) : (
              /* ========================================================
             ORGANIZER ADMIN VIEW (MANAGE GUEST LIST & WAITLIST)
             ======================================================== */
              <OrganizerAdminView
                selectedEvent={selectedEvent}
                onUpdateEvent={onUpdateEvent}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
