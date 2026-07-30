"use client";

import EventCreation from "@/components/eventCreation/index";
import { useRouter } from "next/navigation";
import ContentHolder from "@/components/contentHolder";
import { eventService } from "@/lib/services/eventService";

export default function EventCreationPage() {
  const router = useRouter();

  const saveEvents = async (updated: FormData) => {
    console.log(
      Array.from(updated.entries()).map(([key, value]) => [
        key,
        value instanceof File
          ? { name: value.name, size: value.size, type: value.type }
          : value,
      ]),
    );

    try {
      const response = await eventService.create(updated);
      console.log(response);
      return response;
    } catch (e) {
      console.error("Failed to parse social_events_data", e);
    }
  };
  // Create Event Action
  const handlePublishEvent = (createdEvent: FormData) => {
    saveEvents(createdEvent)
      .then(() => {
        router.push("/home");
      })
      .catch((e) => console.error(" Error creating event", e));
  };

  return (
    <ContentHolder>
      <EventCreation
        onCreate={handlePublishEvent}
        onCancel={() => router.push("/home")}
      />
    </ContentHolder>
  );
}
