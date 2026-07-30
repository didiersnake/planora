import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageSquare, X } from "lucide-react";
import { PRESET_GIFS } from "@/lib/Constants";
import { EventResponse } from "@/lib/Types";

export default function EventCommentWall({
  setExpandedSection,
  selectedEvent,
  handleAddComment,
  newComment,
  setNewComment,
  setShowGifSelector,
  setSelectedGif,
  showGifSelector,
  selectedGif,
}: {
  setExpandedSection: (e: "none" | "wall" | "album") => void;
  selectedEvent: EventResponse;
  handleAddComment: (e: React.FormEvent) => void;
  newComment: string;
  setNewComment: (e: string) => void;
  setShowGifSelector: (e: boolean) => void;
  setSelectedGif: (e: string | null) => void;
  showGifSelector: boolean;
  selectedGif: string | null;
}) {
  return (
    // <motion.div
    //   key="expanded-wall"
    //   initial={{ opacity: 0, y: 15 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -15 }}
    //   className="space-y-6"
    //   id="dedicated_event_wall"
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
    //         <MessageSquare className="w-6 h-6 text-orange-600" />
    //         <span>Interactive Event Wall</span>
    //       </h3>
    //       <p className="text-xs text-slate-500">
    //         Join the vibe conversation for{" "}
    //         <span className="font-semibold text-slate-800">{selectedEvent.title}</span>
    //       </p>
    //     </div>
    //     <div className="flex items-center gap-3">
    //       <span className="text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-full font-mono">
    //         {selectedEvent.comments.length} Comments
    //       </span>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    //     {/* Left side: Post a comment form */}
    //     <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 h-fit">
    //       <div className="space-y-1">
    //         <h4 className="font-bold text-slate-900 text-sm">Post to the Wall</h4>
    //         <p className="text-xs text-slate-500">
    //           Ask a question, share transportation details, or post some hype!
    //         </p>
    //       </div>

    //       <form onSubmit={handleAddComment} className="space-y-4">
    //         <div className="space-y-1">
    //           <label className="text-xs font-semibold text-slate-700">Your Message</label>
    //           <textarea
    //             value={newComment}
    //             onChange={(e) => setNewComment(e.target.value)}
    //             placeholder="On va s'enjailler grave ! 🔥 Can't wait!"
    //             rows={4}
    //             className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <div className="flex justify-between items-center">
    //             <label className="text-xs font-semibold text-slate-700">
    //               Attach a Party GIF
    //             </label>
    //             <button
    //               type="button"
    //               onClick={() => setShowGifSelector(!showGifSelector)}
    //               className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold px-2 py-1 rounded-md transition cursor-pointer"
    //             >
    //               {showGifSelector ? "Hide GIFs" : "Browse GIFs"}
    //             </button>
    //           </div>

    //           {/* GIF Selection grid */}
    //           {showGifSelector && (
    //             <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 max-h-48 overflow-y-auto">
    //               <div className="grid grid-cols-3 gap-2">
    //                 {PRESET_GIFS.map((gif, index) => (
    //                   <div
    //                     key={index}
    //                     onClick={() => {
    //                       setSelectedGif(gif.url);
    //                       setShowGifSelector(false);
    //                     }}
    //                     className={`relative h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
    //                       selectedGif === gif.url
    //                         ? "border-orange-500"
    //                         : "border-transparent hover:border-slate-300"
    //                     }`}
    //                   >
    //                     <Image
    //                       src={gif.url}
    //                       alt={gif.label}
    //                       fill
    //                       className="object-cover"
    //                       referrerPolicy="no-referrer"
    //                     />
    //                     <span className="absolute bottom-0 inset-x-0 text-[8px] bg-slate-900/60 text-white text-center truncate px-0.5">
    //                       {gif.label}
    //                     </span>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           )}

    //           {/* Selected GIF banner */}
    //           {selectedGif && (
    //             <div className="flex items-center gap-2 bg-orange-50 p-2.5 rounded-xl border border-orange-100">
    //               <div className="relative w-12 h-12 rounded overflow-hidden border border-slate-200 flex-shrink-0">
    //                 <Image
    //                   src={selectedGif}
    //                   alt="Selected GIF"
    //                   fill
    //                   className="object-cover"
    //                   referrerPolicy="no-referrer"
    //                 />
    //               </div>
    //               <span className="text-[10px] text-orange-600 font-semibold leading-tight">
    //                 Selected GIF is ready to post!
    //               </span>
    //               <button
    //                 type="button"
    //                 onClick={() => setSelectedGif(null)}
    //                 className="text-red-500 hover:text-red-700 ml-auto p-1 hover:bg-red-50 rounded-full transition cursor-pointer"
    //               >
    //                 <X className="w-4 h-4" />
    //               </button>
    //             </div>
    //           )}
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md shadow-orange-100 cursor-pointer"
    //         >
    //           Post to Live Wall
    //         </button>
    //       </form>
    //     </div>

    //     {/* Right side: Spacious Wall Comments Feed */}
    //     <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
    //       <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
    //         Vibe Feed
    //       </h4>

    //       {selectedEvent.comments.length === 0 ? (
    //         <div className="text-center py-12 text-slate-400 space-y-2">
    //           <MessageSquare className="w-12 h-12 text-slate-200 mx-auto" />
    //           <p className="text-xs">No comments posted yet. Start the conversation!</p>
    //         </div>
    //       ) : (
    //         <div
    //           className="space-y-4 max-h-[550px] overflow-y-auto pr-2"
    //           id="expanded_comments_feed"
    //         >
    //           <AnimatePresence initial={false}>
    //             {selectedEvent.comments.map((comment) => (
    //               <motion.div
    //                 key={comment.id}
    //                 initial={{ opacity: 0, y: 15 }}
    //                 animate={{ opacity: 1, y: 0 }}
    //                 exit={{ opacity: 0 }}
    //                 className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 shadow-xs"
    //               >
    //                 <div className="flex items-center justify-between">
    //                   <div className="flex items-center gap-2">
    //                     <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-xs uppercase">
    //                       {comment.author.substring(0, 2)}
    //                     </div>
    //                     <div>
    //                       <p className="font-bold text-slate-800 text-xs leading-none">
    //                         {comment.author}
    //                       </p>
    //                       <p className="text-[10px] text-slate-400 mt-0.5">
    //                         Attendee / Guest
    //                       </p>
    //                     </div>
    //                   </div>
    //                   <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">
    //                     {comment.timestamp}
    //                   </span>
    //                 </div>

    //                 {comment.text && (
    //                   <p className="text-slate-600 text-xs md:text-sm leading-relaxed pl-1">
    //                     {comment.text}
    //                   </p>
    //                 )}

    //                 {comment.gif && (
    //                   <div className="relative h-44 w-full max-w-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-sm ml-1 mt-1">
    //                     <Image
    //                       src={comment.gif}
    //                       alt="GIF Comment"
    //                       fill
    //                       className="object-cover"
    //                       referrerPolicy="no-referrer"
    //                     />
    //                   </div>
    //                 )}
    //               </motion.div>
    //             ))}
    //           </AnimatePresence>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </motion.div>
    <></>
  );
}
