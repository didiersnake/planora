"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { EventResponse, SocialEvent } from "@/lib/Types";
import { useAuth } from "@/lib/authContext";
import ContentHolder from "@/components/contentHolder";
import EventViewDetails from "@/components/eventViewDetails/index";
import { eventService } from "@/lib/services/eventService";

// Initial preloaded event to make it look full and functional from day one
const PRELOADED_EVENT: SocialEvent = {
  id: "preloaded-assie-beach",
  title: "Beach Party Chic & Grillades",
  hostName: "Didier Djakoua",
  description:
    "Rejoignez-nous pour une journée exceptionnelle à Assinie-Mafia ! Au programme : farniente, baignade, poisson braisé cuit au feu de bois, cocktails tropicaux et les meilleurs mixes Afro-deep de notre DJ invité. Venez avec votre plus belle tenue de plage blanche !",
  category: "beach",
  coverImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  dressCode: "Plage Chic (Tout en Blanc)",
  date: "2026-08-01",
  startTime: "13:00",
  endTime: "22:00",
  locationName: "Assinie-Mafia KM 11.5, en face du Lodge",
  landmarkPin: { x: 420, y: 260, name: "Assinie-Mafia KM 11.5 Beachfront" },
  isPrivate: false,
  monetization: "momo",
  momoDetails: {
    operator: "Wave",
    phoneNumber: "+225 07 09 88 55 22",
    amount: 15000,
  },
  maxCapacityEnabled: true,
  maxCapacity: 30,
  waitlistEnabled: true,
  guests: [
    {
      id: "g1",
      name: "Marie-Laure Kouamé",
      phone: "+225 07 01 02 03",
      status: "confirmed",
      registeredAt: "2026-07-13T10:00:00Z",
      email: "kouamé@gmail.com",
    },
    {
      id: "g2",
      name: "Koffi Ange Yao",
      phone: "+225 05 55 44 33",
      status: "confirmed",
      registeredAt: "2026-07-13T10:15:00Z",
      email: "koffi@yao.com",
    },
    {
      id: "g3",
      name: "Zahra Touré",
      phone: "+225 01 12 23 34",
      status: "confirmed",
      registeredAt: "2026-07-13T11:00:00Z",
      email: "zahra@toure.com",
    },
    {
      id: "g4",
      name: "Aminata Sylla",
      phone: "+225 07 88 77 66",
      status: "confirmed",
      registeredAt: "2026-07-13T11:20:00Z",
      email: "aminata@sylla.com",
    },
    {
      id: "g5",
      name: "Jean-Marc N’Guessan",
      phone: "+225 07 33 22 11",
      status: "confirmed",
      registeredAt: "2026-07-13T12:00:00Z",
      email: "jean-marc@nguessan.com",
    },
  ],
  comments: [
    {
      id: "c1",
      author: "Marie-Laure",
      text: "On va s’enjailler grave ! Les grillades d’Assinie c’est le top du top ! 🔥",
      timestamp: "3h ago",
    },
    {
      id: "c2",
      author: "Koffi Ange",
      text: "Est-ce que le maillot de bain blanc est obligatoire ? 😂 J’ai hâte !",
      timestamp: "2h ago",
    },
  ],
  photos: [
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      uploadedBy: "Organizer",
      uploadedAt: "2026-07-13T09:00:00Z",
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
      uploadedBy: "Organizer",
      uploadedAt: "2026-07-13T09:05:00Z",
    },
  ],
  features: {
    eventWall: true,
    sharedAlbum: true,
    guestListVisible: true,
  },
};

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}) {
  const { setIsLoading } = useAuth();
  const router = useRouter();
  const { eventSlug } = use(params);

  const [events, setEvents] = useState<EventResponse[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [initialSection, setInitialSection] = useState<"none" | "wall" | "album">("none");

  // Load storage state on mount
  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      const event = await eventService.getEventDetails(eventSlug);
      console.log(event);

      return event;
    };

    fetchEventDetails().then((response) => {
      setSelectedEvent(response);
      setIsLoading(false);
    });
  }, []);

  // Save changes helper
  const saveEvents = (updated: EventResponse[]) => {
    setEvents(updated);
    localStorage.setItem("social_events_data", JSON.stringify(updated));
  };
  // Event Updates (Adding guest, adding comment, posting photo)
  const handleUpdateEvent = (updatedEvent: EventResponse) => {
    const updatedList = events.map((ev) =>
      ev.id === updatedEvent.id ? updatedEvent : ev,
    );
    saveEvents(updatedList);
    setSelectedEvent(updatedEvent);
  };
  return (
    <ContentHolder>
      <EventViewDetails
        selectedEvent={selectedEvent}
        events={events}
        onBackToDashboard={() => router.push("/")}
        onUpdateEvent={handleUpdateEvent}
        initialSection={initialSection}
      />
    </ContentHolder>
  );
}
