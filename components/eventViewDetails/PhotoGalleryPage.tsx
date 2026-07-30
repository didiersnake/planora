import { motion, AnimatePresence } from "framer-motion";
import { SocialEvent } from "@/lib/Types";
import { ArrowLeft, Camera, ChevronRight, ChevronLeft, X } from "lucide-react";
import Image from "next/image";
export default function PhotoGalleryPage({
  selectedEvent,
  setExpandedSection,
  handlePhotoUpload,
  setActivePhotoIndex,
  activePhotoIndex,
}: {
  selectedEvent: SocialEvent;
  setExpandedSection: (section: "none" | "wall" | "album") => void;
  handlePhotoUpload: () => void;
  setActivePhotoIndex: (index: number | null) => void;
  activePhotoIndex: number | null;
}) {
  return (
    // <motion.div
    //   key="expanded-album"
    //   initial={{ opacity: 0, y: 15 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -15 }}
    //   className="space-y-6"
    //   id="dedicated_event_album"
    // >
    //   {/* Header */}
    //   <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    //     <div className="space-y-1">
    //       <button
    //         type="button"
    //         onClick={() => setExpandedSection("none")}
    //         className="text-xs font-bold text-slate-500 hover:text-orange-600 flex items-center gap-1 transition cursor-pointer"
    //       >
    //         <ArrowLeft className="w-3.5 h-3.5" />
    //         <span>Back to Event Flyer</span>
    //       </button>
    //       <h3 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2 mt-1">
    //         <Camera className="w-6 h-6 text-orange-600" />
    //         <span>Collaborative Memory Album</span>
    //       </h3>
    //       <p className="text-xs text-slate-500">
    //         Shared snapshots and live memories for{" "}
    //         <span className="font-semibold text-slate-800">{selectedEvent.title}</span>
    //       </p>
    //     </div>

    //     <div className="flex items-center gap-3">
    //       <span className="text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-full font-mono">
    //         {selectedEvent.photos.length} Photos
    //       </span>
    //       <button
    //         onClick={handlePhotoUpload}
    //         className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1 cursor-pointer"
    //         id="album_upload_photo_btn"
    //       >
    //         <Camera className="w-3.5 h-3.5" />
    //         <span>+ Post Live Photo</span>
    //       </button>
    //     </div>
    //   </div>

    //   {/* Interactive Album Grid Gallery */}
    //   {selectedEvent.photos.length === 0 ? (
    //     <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 max-w-lg mx-auto">
    //       <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto">
    //         <Camera className="w-8 h-8" />
    //       </div>
    //       <div className="space-y-1">
    //         <h4 className="font-bold text-slate-800">No photos shared yet</h4>
    //         <p className="text-xs text-slate-500">
    //           Be the first to post a memory! Live photos are visible instantly to all
    //           event guests.
    //         </p>
    //       </div>
    //       <button
    //         onClick={handlePhotoUpload}
    //         className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-orange-700 transition cursor-pointer"
    //       >
    //         Upload Photo Now
    //       </button>
    //     </div>
    //   ) : (
    //     <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
    //       <h4 className="font-bold text-slate-900 text-sm">Event Gallery View</h4>
    //       <p className="text-xs text-slate-400">
    //         Click any image to open the high-fidelity immersive lightbox gallery.
    //       </p>

    //       <div
    //         className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    //         id="album_gallery_grid"
    //       >
    //         {selectedEvent.photos.map((photo, index) => (
    //           <motion.div
    //             key={photo.id}
    //             whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    //             onClick={() => setActivePhotoIndex(index)}
    //             className="group relative aspect-square bg-slate-100 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 shadow-xs"
    //           >
    //             <Image
    //               src={photo.url}
    //               alt="Party Memory"
    //               fill
    //               className="object-cover"
    //               referrerPolicy="no-referrer"
    //               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    //             />
    //             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3">
    //               <p className="text-[10px] font-bold text-white truncate">
    //                 Posted by {photo.uploadedBy}
    //               </p>
    //               <p className="text-[8px] text-slate-300 font-mono">Just now</p>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </div>
    //   )}

    //   {/* Immersive Photo Lightbox Modal */}
    //   <AnimatePresence>
    //     {activePhotoIndex !== null && (
    //       <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         onClick={() => setActivePhotoIndex(null)}
    //         className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none"
    //         id="lightbox_modal_backdrop"
    //       >
    //         {/* Close Button */}
    //         <button
    //           onClick={() => setActivePhotoIndex(null)}
    //           className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full border border-white/10 transition z-50 cursor-pointer"
    //           title="Close Lightbox"
    //         >
    //           <X className="w-5 h-5" />
    //         </button>

    //         {/* Left navigation arrow */}
    //         <button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             const prevIndex =
    //               (activePhotoIndex - 1 + selectedEvent.photos.length) %
    //               selectedEvent.photos.length;
    //             setActivePhotoIndex(prevIndex);
    //           }}
    //           className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 transition z-50 cursor-pointer"
    //           title="Previous Photo"
    //         >
    //           <ChevronLeft className="w-6 h-6" />
    //         </button>

    //         {/* Image & details frame */}
    //         <div
    //           onClick={(e) => e.stopPropagation()}
    //           className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center"
    //           id="lightbox_content_frame"
    //         >
    //           <div className="relative w-full aspect-video md:aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
    //             <Image
    //               src={selectedEvent.photos[activePhotoIndex].url}
    //               alt="Lightbox Party Snap"
    //               fill
    //               className="object-contain"
    //               referrerPolicy="no-referrer"
    //               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    //             />
    //           </div>

    //           {/* Lightbox Footer Info */}
    //           <div className="w-full text-center text-white mt-4 space-y-1">
    //             <p className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">
    //               Photo {activePhotoIndex + 1} of {selectedEvent.photos.length}
    //             </p>
    //             <p className="text-sm font-semibold">
    //               Posted by {selectedEvent.photos[activePhotoIndex].uploadedBy}
    //             </p>
    //             <p className="text-[10px] text-slate-400 font-mono">
    //               {selectedEvent.photos[activePhotoIndex].uploadedAt
    //                 ? new Date(
    //                     selectedEvent.photos[activePhotoIndex].uploadedAt,
    //                   ).toLocaleDateString()
    //                 : "Active Session Live Snap"}
    //             </p>
    //           </div>
    //         </div>

    //         {/* Right navigation arrow */}
    //         <button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             const nextIndex = (activePhotoIndex + 1) % selectedEvent.photos.length;
    //             setActivePhotoIndex(nextIndex);
    //           }}
    //           className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 transition z-50 cursor-pointer"
    //           title="Next Photo"
    //         >
    //           <ChevronRight className="w-6 h-6" />
    //         </button>
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </motion.div>

    <></>
  );
}
