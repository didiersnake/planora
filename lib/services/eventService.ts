import { Category, EventData } from "../Types";
import { apiClient } from "./api";

export const eventService = {
  async getAllEventCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<Category[]>("/event-categories");
      return response;
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      throw error;
    }
  },

  async getCoversByCategoryCode(category: string): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>(`/files/covers/${category}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch document ${category}:`, error);
      throw error;
    }
  },

  async create(data: FormData): Promise<any> {
    try {
      const response = await apiClient.post<any>("/events", data);
      return response;
    } catch (error) {
      console.error("Failed to create document:", error);
      throw error;
    }
  },

  async getEvents(): Promise<any> {
    try {
      const response = await apiClient.get<any>("/events");
      return response;
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      throw error;
    }
  },

  async getEventDetails(slug: string): Promise<any> {
    try {
      const response = await apiClient.get<any>(`/events/${slug}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch document ${slug}:`, error);
      throw error;
    }
  },

  async getCountries(): Promise<any> {
    try {
      const response = await apiClient.get<any>("/countries");
      return response;
    } catch (error) {
      console.error("Failed to fetch countries:", error);
      throw error;
    }
  },
};
