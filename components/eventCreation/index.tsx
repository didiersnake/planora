import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, X, MapPin, CreditCard } from "lucide-react";
import EventCategory from "./EventCategory";
import EventCovers from "./EventCover";
import EventDetails from "./EventEssentialDetails";
import EventGeolocation from "./EventGeolocation";
import EventPaymentAndCapacity from "./EventPayment&Capacity";
import EventPreview from "./EventPreview";
import { eventService } from "@/lib/services/eventService";
import { useAuth } from "@/lib/authContext";
import { Category, LocationDetails } from "../../lib/Types";
import { EventCreationSkeleton } from "../Loader";
import { extractObjectKey } from "@/lib/utils";

interface EventCreationProps {
  onCreate: (event: FormData) => void;
  onCancel: () => void;
}

export default function EventCreation({ onCreate, onCancel }: EventCreationProps) {
  const [creationStep, setCreationStep] = useState<1 | 2 | 3>(1);
  const [detailsSubStep, setDetailsSubStep] = useState<
    "essentials" | "location" | "settings"
  >("essentials");

  // Form States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newCategory, setNewCategory] = useState<string>("beach");
  const [newCover, setNewCover] = useState<string>("");
  const [newTitle, setNewTitle] = useState("");
  const [newHost, setNewHost] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDressCode, setNewDressCode] = useState("");
  const [newDate, setNewDate] = useState("2026-08-08");
  const [newStartTime, setNewStartTime] = useState("14:00");
  const [newEndTime, setNewEndTime] = useState("23:00");
  const [newLocationName, setNewLocationName] = useState("");
  const [newRegion, setNewRegion] = useState<string>("west");
  const [newCurrency, setNewCurrency] = useState<string>("FCFA (XOF)");
  const [newIsPrivate, setNewIsPrivate] = useState(false);
  const [newMonetization, setNewMonetization] = useState<
    "Free" | "Mobile_payment" | "Cash_at_event"
  >("Free");
  const [newMomoOperator, setNewMomoOperator] = useState<string>("Wave");
  const [newMomoPhone, setNewMomoPhone] = useState("");
  const [newMomoAmount, setNewMomoAmount] = useState("5000");

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [newMaxCapacityEnabled, setNewMaxCapacityEnabled] = useState(false);
  const [newMaxCapacity, setNewMaxCapacity] = useState("50");
  const [newWaitlistEnabled, setNewWaitlistEnabled] = useState(true);

  const [isCustomCover, setIsCustomCover] = useState(false);

  const { isLoading, setIsLoading } = useAuth();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [covers, setCovers] = React.useState<string[]>([]);
  const [selectedCover, setSelectedCover] = useState<File>();

  useEffect(() => {
    //TODO: Add logic to laod category from storage
    if (creationStep === 1) {
      const fetchCategories = async () => {
        setIsLoading(true);
        return await eventService.getAllEventCategories();
      };

      fetchCategories()
        .then((data) => {
          setCategories(data);
          setIsLoading(false);
          console.log(data);
        })
        .catch((error) => console.error("Failed to fetch document types:", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //TODO: Add logic to laod category from storage
    if (creationStep === 2) {
      const fetchCategories = async () => {
        setIsLoading(true);
        return await eventService.getCoversByCategoryCode(newCategory);
      };

      fetchCategories()
        .then((data) => {
          console.log(data);
          setCovers(data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Failed to fetch document types:", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creationStep, newCategory]);

  // Change Category Handler
  const handleCategorySelect = (catId: string) => {
    setNewCategory(catId);
    // const covers = COVERS_BY_CATEGORY[catId] || DEFAULT_COVERS;
    // setNewCover(covers[0]);
    // setCreationStep(2);
  };

  const handleCustomCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setNewCover(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    setIsCustomCover(true);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !selectedLocation) {
      console.log(" New title or location can't be empty");
      return;
    }

    const coverObject = extractObjectKey(newCover);
    const request = new FormData();
    if (selectedCover) {
      request.append("file", selectedCover);
    }
    request.append("title", newTitle);
    request.append("host", newHost);
    request.append("description", newDescription);
    request.append("categoryCode", newCategory);
    request.append("templateCoverUUID", coverObject);
    request.append("dressCode", newDressCode);
    request.append("date", new Date(newDate).toISOString());
    request.append("startTime", newStartTime);
    request.append("locationName", newLocationName);

    // request.append("location", JSON.stringify(locationDetails));
    request.append("location.placeId", selectedLocation?.place_id);
    request.append("location.name", selectedLocation?.name);
    request.append("location.streetAddress", selectedLocation?.street);
    request.append("location.longitude", String(selectedLocation?.lon));
    request.append("location.latitude", String(selectedLocation?.lat));
    request.append("location.stateCode", selectedLocation?.state_code);
    request.append("location.countryCode", selectedLocation?.country_code);
    request.append("location.county", selectedLocation?.county);
    request.append("location.city", selectedLocation?.city);
    request.append("location.state", selectedLocation?.state);

    request.append("isPrivate", String(newIsPrivate));
    request.append("feeType", newMonetization);
    // request.append("currency", createdEvent.currency || "");
    request.append("maxCapacityEnabled", String(newMaxCapacityEnabled));
    request.append("maxCapacity", String(newMaxCapacity));
    request.append("waitListEnabled", String(newWaitlistEnabled));

    onCreate(request);
  };

  return (
    <>
      {isLoading ? (
        <EventCreationSkeleton />
      ) : (
        <motion.div
          key="create-event-flow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
          id="create_event_workspace"
        >
          {/* Header / Nav Panel */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs"
            id="create_header_nav"
          >
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-600" />
                <span>Event Creator Studio</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Design a beautiful customized digital flyer with zero install
                requirements.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-xs font-bold text-neutral-500 hover:text-red-600 border border-neutral-200 hover:border-red-100 bg-neutral-50 hover:bg-red-50 px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5"
              id="cancel_create_btn"
            >
              <X className="w-3.5 h-3.5" />
              <span>Discard Draft & Return</span>
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div
            className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs"
            id="create_stepper_progress"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {/* Step 1 button */}
              <div
                onClick={() => setCreationStep(1)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  creationStep === 1
                    ? "bg-orange-50 border border-orange-100 text-orange-700 font-bold font-sans"
                    : "hover:bg-neutral-50 border border-transparent font-sans text-neutral-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold ${
                    creationStep >= 1
                      ? "bg-orange-600 text-white"
                      : "border border-neutral-300 text-neutral-500"
                  }`}
                >
                  1
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Step 1
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    Choose Vibe Category
                  </span>
                </div>
              </div>

              {/* Step 2 button */}
              <div
                onClick={() => newCategory && setCreationStep(2)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  creationStep === 2
                    ? "bg-orange-50 border border-orange-100 text-orange-700 font-bold font-sans"
                    : "hover:bg-neutral-50 border border-transparent font-sans text-neutral-600"
                } ${!newCategory ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold ${
                    creationStep >= 2
                      ? "bg-orange-600 text-white"
                      : "border border-neutral-300 text-neutral-500"
                  }`}
                >
                  2
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Step 2
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    Select Flyer Cover Art
                  </span>
                </div>
              </div>

              {/* Step 3 button */}
              <div
                onClick={() => newCategory && newCover && setCreationStep(3)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  creationStep === 3
                    ? "bg-orange-50 border border-orange-100 text-orange-700 font-bold font-sans"
                    : "hover:bg-neutral-50 border border-transparent font-sans text-neutral-600"
                } ${!newCategory || !newCover ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold ${
                    creationStep === 3
                      ? "bg-orange-600 text-white"
                      : "border border-neutral-300 text-neutral-500"
                  }`}
                >
                  3
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Step 3
                  </span>
                  <span className="text-sm font-bold text-neutral-800">
                    Logistics & Map Settings
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Split Screen Layout (Left: Form steps, Right: LIVE FLYER PREVIEW) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            id="creation_workspace_grid"
          >
            {/* Left Form Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: CATEGORY SELECTION */}
              {creationStep === 1 && (
                <EventCategory
                  setCategories={setCategories}
                  setIsLoading={setIsLoading}
                  categories={categories}
                  creationStep={creationStep}
                  setCreationStep={setCreationStep}
                  newCategory={newCategory}
                  handleCategorySelect={handleCategorySelect}
                />
              )}

              {/* STEP 2: COVER SELECTION */}
              {creationStep === 2 && (
                <EventCovers
                  categories={categories}
                  setIsCustomCover={setIsCustomCover}
                  covers={covers}
                  handleCategorySelect={handleCategorySelect}
                  creationStep={creationStep}
                  setCreationStep={setCreationStep}
                  newCategory={newCategory}
                  newCover={newCover}
                  setNewCover={setNewCover}
                  isCustomCover={isCustomCover}
                  handleCustomCoverUpload={handleCustomCoverUpload}
                  fileInputRef={fileInputRef}
                />
              )}
              {/* STEP 3: DETAILS FORM */}
              {creationStep === 3 && (
                <div
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6 animate-fadeIn"
                  id="full_step_details"
                >
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                      Event Blueprint
                    </span>
                    <h3 className="text-2xl font-bold font-display text-neutral-900 mt-2 tracking-tight">
                      Define your logistical rules
                    </h3>
                  </div>

                  {/* Form Step-Tabs inside step 3 */}
                  <div
                    className="flex border-b border-neutral-100 gap-4 text-xs font-bold pt-2 font-sans"
                    id="full_specs_tabs"
                  >
                    <button
                      type="button"
                      onClick={() => setDetailsSubStep("essentials")}
                      className={`pb-3 transition flex items-center gap-1.5 ${detailsSubStep === "essentials" ? "text-orange-600 border-b-2 border-orange-600" : "text-neutral-500 hover:text-neutral-800"}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1. Essentials</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailsSubStep("location")}
                      className={`pb-3 transition flex items-center gap-1.5 ${detailsSubStep === "location" ? "text-orange-600 border-b-2 border-orange-600" : "text-neutral-500 hover:text-neutral-800"}`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>2. Landmark Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailsSubStep("settings")}
                      className={`pb-3 transition flex items-center gap-1.5 ${detailsSubStep === "settings" ? "text-orange-600 border-b-2 border-orange-600" : "text-neutral-500 hover:text-neutral-800"}`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>3. Checkout & Waitlist</span>
                    </button>
                  </div>

                  <form onSubmit={handlePublish} className="space-y-6">
                    {/* SUBSTEP A: ESSENTIALS */}
                    {detailsSubStep === "essentials" && (
                      <EventDetails
                        detailsSubStep={detailsSubStep}
                        setDetailsSubStep={setDetailsSubStep}
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                        setNewHost={setNewHost}
                        newHost={newHost}
                        newDescription={newDescription}
                        setNewEndTime={setNewEndTime}
                        setNewStartTime={setNewStartTime}
                        newDate={newDate}
                        setNewDescription={setNewDescription}
                        setNewDate={setNewDate}
                        newDressCode={newDressCode}
                        newEndTime={newEndTime}
                        setNewDressCode={setNewDressCode}
                        setCreationStep={setCreationStep}
                        newStartTime={newStartTime}
                      />
                    )}
                    {/* SUBSTEP B: LOCATION PIN MAP */}
                    {detailsSubStep === "location" && (
                      <EventGeolocation
                        detailsSubStep={detailsSubStep}
                        newLocationName={newLocationName}
                        setNewLocationName={setNewLocationName}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        setDetailsSubStep={setDetailsSubStep}
                      />
                    )}

                    {/* SUBSTEP C: PAYMENTS & CAPACITY */}
                    {detailsSubStep === "settings" && (
                      <EventPaymentAndCapacity
                        detailsSubStep={detailsSubStep}
                        setDetailsSubStep={setDetailsSubStep}
                        newMonetization={newMonetization}
                        setNewMonetization={setNewMonetization}
                        newMomoOperator={newMomoOperator}
                        setNewMomoOperator={setNewMomoOperator}
                        newMomoPhone={newMomoPhone}
                        setNewMomoPhone={setNewMomoPhone}
                        newRegion={newRegion}
                        newCurrency={newCurrency}
                        setNewMomoAmount={setNewMomoAmount}
                        setNewMaxCapacityEnabled={setNewMaxCapacityEnabled}
                        setNewMaxCapacity={setNewMaxCapacity}
                        newMomoAmount={newMomoAmount}
                        newMaxCapacity={newMaxCapacity}
                        newMaxCapacityEnabled={newMaxCapacityEnabled}
                        newWaitlistEnabled={newWaitlistEnabled}
                        setNewWaitlistEnabled={setNewWaitlistEnabled}
                        newIsPrivate={newIsPrivate}
                        setNewIsPrivate={setNewIsPrivate}
                      />
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Right Mockup Column: Real-time Live Flyer Preview */}
            <EventPreview
              categories={categories}
              newCover={newCover}
              newCategory={newCategory}
              newTitle={newTitle}
              newHost={newHost}
              newDate={newDate}
              newStartTime={newStartTime}
              newEndTime={newEndTime}
              newLocationName={newLocationName}
              newDressCode={newDressCode}
              newMonetization={newMonetization}
              newMomoAmount={newMomoAmount}
              newMaxCapacityEnabled={newMaxCapacityEnabled}
              newMaxCapacity={newMaxCapacity}
              newWaitlistEnabled={newWaitlistEnabled}
              newMomoOperator={newMomoOperator}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
