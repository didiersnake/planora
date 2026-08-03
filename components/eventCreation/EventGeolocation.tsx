"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  X,
  Info,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { externalApiClient } from "@/lib/services/api";
import dynamic from "next/dynamic";

// Disable SSR for the component containing your Leaflet maps
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});
export default function EventGeolocation({
  detailsSubStep,
  newLocationName,
  setNewLocationName,
  selectedLocation,
  setSelectedLocation,
  setDetailsSubStep,
}: any) {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isResolvingUrl, setIsResolvingUrl] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);
  const [urlParseError, setUrlParseError] = useState("");
  const [urlParseSuccess, setUrlParseSuccess] = useState(false);
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPredictionsDropdown, setShowPredictionsDropdown] = useState(false);
  const [selectedMapPoint, setSelectedMapPoint] = useState<{
    lat: number;
    long: number;
  }>({ lat: 3.8943, long: 11.5433 });

  const { country } = useAuth();

  const apiKey = "7bb8642466d54dc1b41a16f7fb9bf4b6";

  // const mapLatLngToXY = (lat: number, lng: number): { x: number; y: number } => {
  //   const region = AFRICAN_REGIONS.find((r) => r.id === newRegion) || AFRICAN_REGIONS[0];
  //   const { minLat, maxLat, minLng, maxLng } = region.boundingBox;

  //   // Map to custom blueprint width (0 to 500) and height (0 to 250)
  //   const x = Math.max(
  //     20,
  //     Math.min(480, Math.round(((lng - minLng) / (maxLng - minLng)) * (420 - 50) + 50)),
  //   );
  //   const y = Math.max(
  //     20,
  //     Math.min(230, Math.round(((maxLat - lat) / (maxLat - minLat)) * (260 - 60) + 60)),
  //   );
  //   return { x, y };
  // };

  // Helper: extract coordinates from a Google Maps or WhatsApp Location URL
  const extractCoordinates = (
    text: string,
  ): { lat: number; lng: number; name?: string } | null => {
    // 1. Check for query parameter coord pattern (e.g. q=5.3412,-3.9852)
    const qPattern = /[?&](?:q|query|daddr|saddr)=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const qMatch = text.match(qPattern);
    if (qMatch) {
      return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
    }

    // 2. Check for @lat,lng pattern (standard Google Maps URL location center)
    const atPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const atMatch = text.match(atPattern);
    if (atMatch) {
      return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
    }

    // 3. Check for direct path coordinates pattern
    const pathPattern = /\/(-?\d+\.\d+),(-?\d+\.\d+)/;
    const pathMatch = text.match(pathPattern);
    if (pathMatch) {
      const lat = parseFloat(pathMatch[1]);
      const lng = parseFloat(pathMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
    }

    // 4. Look for place names in url path
    const placePattern = /\/place\/([^/]+)/;
    const placeMatch = text.match(placePattern);
    if (placeMatch) {
      try {
        const decoded = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
        const latLngMatch = text.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (latLngMatch) {
          return {
            lat: parseFloat(latLngMatch[1]),
            lng: parseFloat(latLngMatch[2]),
            name: decoded,
          };
        }
      } catch (e) {
        // Ignored
      }
    }

    return null;
  };

  const handleLocationUrlAndTextParse = (val: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = val.match(urlRegex);

    if (match) {
      const pastedUrl = match[0];
      setIsResolvingUrl(true);
      setUrlParseError("");
      setUrlParseSuccess(false);

      try {
        let coordinates = pastedUrl.split("=")[1].split(",");
        let lat = coordinates[0];
        let long = coordinates[1];
        setSelectedMapPoint({ lat: parseFloat(lat), long: parseFloat(long) });
        // setUrlParseSuccess(true);
        getLocationFromCoordinates(parseFloat(lat), parseFloat(long));
      } catch (err) {
        console.error("Error parsing map URL:", err);
        setUrlParseError("Failed to resolve URL coordinates. Please drop pin manually.");
      } finally {
        setIsResolvingUrl(false);
      }
    }
  };

  // Live Place Autocomplete Input Handler
  const handleLocationInputChange = (val: string) => {
    setNewLocationName(val);
    setUrlParseError("");

    if (val.trim().length < 1) {
      setIsResolvingUrl(false);
      return;
    }

    if (val.startsWith("http") || val.includes("maps.")) {
      handleLocationUrlAndTextParse(val);
      return;
    }

    if (!val.trim() || val.length < 1) {
      setPredictions([]);
      setShowPredictionsDropdown(false);
      return;
    }

    // Google Autocomplete Search
    if (val.length > 1) {
      console.log(val);
      setIsResolvingUrl(true);
      debouncedLocationQuery(val);
    }
  };

  const getLocationFromCoordinates = (lat: number, long: number) => {
    const baseUrl = "https://api.geoapify.com/v1/geocode/reverse";
    const url = `${baseUrl}?lat=${lat}&lon=${long}&apiKey=${apiKey}&format=json&limit=1`;
    // Call the Geoapify API
    externalApiClient
      .get(url)
      .then((response: any) => {
        const location = response.results;
        console.log(response);
        setSelectedLocation(location[0]);
        setSelectedMapPoint({ lat, long });
        setNewLocationName(location[0].formatted);
        setUrlParseSuccess(true);
        setDisplayMap(true);
      })
      .catch((error: any) => {
        console.error("Error fetching predictions:", error);
      });
  };

  const getLocationPredictions = useCallback(
    (val: string) => {
      const countryCode = country?.code.toLocaleLowerCase() || "auto";
      const baseUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
      const url = `${baseUrl}?text=${val}&format=json&limit=5&filter=${countryCode}&bias=${countryCode}&apiKey=${apiKey}`;
      // Call the Geoapify API
      externalApiClient
        .get(url)
        .then((response: any) => {
          const predictions = response.results;
          console.log(response);
          setPredictions(predictions);
          setShowPredictionsDropdown(true);
        })
        .catch((error: any) => {
          console.error("Error fetching predictions:", error);
        });
    },
    [country],
  );

  const debouncedLocationQuery = useCallback(
    (val: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        getLocationPredictions(val);
      }, 300);
    },
    [getLocationPredictions],
  );

  // Selection Handler for Place Autocomplete Item
  const handleSelectPredictionItem = async (pred: any) => {
    console.log(pred);
    setNewLocationName(pred.formatted);
    setPredictions([]);
    setShowPredictionsDropdown(false);
    setSelectedLocation(pred);
    setSelectedMapPoint({
      lat: pred.lat,
      long: pred.lon,
    });
    setIsResolvingUrl(false);
    setDisplayMap(true);
  };

  //Load leaflet map
  useEffect(() => {
    if (!displayMap || !selectedMapPoint) return;

    let cancelled = false;

    const initMap = async () => {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;

      if (cancelled) return;
      const getLocationMapDisplay = () => {
        var map = L.map("my-map").setView(
          [selectedMapPoint.lat, selectedMapPoint.long],
          15,
        );
        // var myAPIKey = "7bb8642466d54dc1b41a16f7fb9bf4b6";
        var isRetina = L.Browser.retina;

        var baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`;
        var retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`;

        L.tileLayer(isRetina ? retinaUrl : baseUrl, {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
          maxZoom: 20,
          id: "osm-bright",
        }).addTo(map);

        L.marker([selectedMapPoint.lat, selectedMapPoint.long], {
          icon: L.icon({
            iconUrl: `https://api.geoapify.com/v2/icon/?type=awesome&color=red&size=24&scaleFactor=2&apiKey=${apiKey}`,
            iconSize: [15, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [25, 25],
          }),
        }).addTo(map);
      };

      getLocationMapDisplay();
    };

    void initMap();

    return () => {
      cancelled = true;
    };
  }, [displayMap, selectedMapPoint]);

  return (
    <>
      {
        <div className="space-y-4">
          <div className="space-y-1 relative" id="location_search_container">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Search Place or Paste WhatsApp shared location</span>
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                required
                value={newLocationName}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                onFocus={() => {
                  if (predictions.length > 0) setShowPredictionsDropdown(true);
                }}
                placeholder="Search location..."
                className="w-full bg-white border border-neutral-200 rounded-xl pl-9 pr-9 p-2.5 text-xs focus:ring-2 focus:ring-orange-100 focus:border-orange-600 focus:outline-none transition-all font-sans"
              />
              <div className="absolute left-3 top-3 text-neutral-400">
                {isResolvingUrl ? (
                  <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </div>

              {newLocationName && (
                <button
                  type="button"
                  onClick={() => {
                    setNewLocationName("");
                    setPredictions([]);
                    setIsResolvingUrl(false);
                    setUrlParseError("");
                    setUrlParseSuccess(false);
                    setShowPredictionsDropdown(false);
                    setDisplayMap(false);
                  }}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Parse Feedback Toasts/Banners */}
            {urlParseSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-2.5 text-[11px] font-sans flex items-center gap-2 mt-1.5"
              >
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Location URL parsed successfully!</strong> Coordinate pin has
                  been automatically mapped.
                </span>
              </motion.div>
            )}

            {urlParseError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-2.5 text-[11px] font-sans flex items-center gap-2 mt-1.5"
              >
                <Info className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{urlParseError}</span>
              </motion.div>
            )}

            {/* Autocomplete Predictions Dropdown */}
            <AnimatePresence>
              {showPredictionsDropdown && predictions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute z-40 left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-2xl shadow-xl max-h-56 overflow-y-auto divide-y divide-neutral-100"
                >
                  {predictions.map((pred, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectPredictionItem(pred)}
                      className="p-3 text-xs hover:bg-neutral-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="truncate text-neutral-700 font-sans">
                          {pred.formatted}
                        </span>
                      </div>
                      {/* <span className="text-[9px] px-2 py-0.5 rounded-md font-bold uppercase font-mono flex-shrink-0 bg-neutral-100 text-neutral-500">
                        {pred.isGoogle ? "Google" : "Local"}
                      </span> */}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-sans pt-1">
              <Info className="w-3.5 h-3.5 text-neutral-400" />
              <span>
                Paste any WhatsApp shared location to drop coordinates instantly!
              </span>
            </div>
          </div>

          {/* Interactive Landmark Map Pin-Drop Canvas */}
          <MapComponent displayMap={displayMap} />

          <div className="pt-4 flex justify-between items-center border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setDetailsSubStep("essentials")}
              className="text-neutral-400 font-bold px-4 py-2 hover:text-neutral-600 transition-colors text-xs font-sans flex gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setDetailsSubStep("settings")}
              disabled={!newLocationName}
              className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 disabled:opacity-50 transition-colors text-xs flex items-center gap-1.5"
            >
              <span>Next: Payments & Capacity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      }
    </>
  );
}
