"use client";

import HomePage from "@/components/HomePage";
import { EventResponse, SocialEvent, Category } from "@/lib/Types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentHolder from "@/components/contentHolder";
import { useAuth } from "@/lib/authContext";
import { eventService } from "@/lib/services/eventService";

export default function EventDashboard() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<SocialEvent | null>(null);
  const [activeTab, setActiveTab] = useState<
    "landing" | "dashboard" | "eventView" | "create"
  >("landing");
  const router = useRouter();
  const { setIsLoading } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const categories = await eventService.getAllEventCategories();
      const events = await eventService.getEvents();
      return { events, categories };
    };

    fetchEvents()
      .then(({ events, categories }) => {
        setEvents(events);
        setCategories(categories);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch documents:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <ContentHolder>
      <HomePage
        categories={categories}
        events={events}
        onSelectEvent={(event) => router.push(`/events/${event.slug}`)}
        // onSelectEventWithSection={(event, section) => router.push(`/events/${event.id}`)}
        onCreateClick={() => router.push("/events/create")}
      />
    </ContentHolder>
  );
}
