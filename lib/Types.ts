export interface Guest {
  id?: string;
  name: string;
  phone?: string;
  status: "confirmed" | "waitlist";
  registeredAt: string;
  email: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  gif?: string;
  timestamp: string;
}

export interface Category {
  id?: number | string;
  name: string;
  categoryCode: string;
  description: string;
  icon: string;
}

export interface UserSession {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface EventResponse {
  id: string;
  title: string;
  host: string;
  description: string;
  dressCode: string;
  slug: string;
  eventCategoryId?: string;
  startAt: string;
  templatePath: string;
  dresCode: string;
  organizerId: string;
  startTime: string;
  locationName: string;
  locationId: string;
  location?: any;
  isPrivate: boolean;
  monetizationType: "Free" | "Mobile_payment" | "Cash_at_event";
  createdAt: string;
  updatedAt?: string;
  eventCategory: Category;
  amount?: number;
  currency?: string;
  // momoDetails?: {
  //   operator: string;
  //   phoneNumber: string;
  //   amount: number;
  //   currency?: string;
  // };
  maxCapacityEnabled: boolean;
  waitListEnabled: boolean;
  maxCapacity?: number;
  guestCount: number;
  guestList?: Guest[];
}

export interface Photo {
  id: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface EventData {
  title: string;
  hostName?: string;
  description: string;
  categoryCode: string;
  templateCoverUUID: string;
  dressCode: string;
  date: string;
  file?: File;
  startTime: string;
  // endTime: string;
  locationName: string;
  location: LocationDetails;
  isPrivate: boolean;
  feeType: "Free" | "Mobile_payment" | "Cash_at_event";
  // momoDetails?: {
  //   operator: string;
  //   phoneNumber: string;
  //   amount: number;
  //   currency?: string;
  // };
  currency?: string;
  maxCapacityEnabled: boolean;
  maxCapacity?: number;
  waitlistEnabled: boolean;
}
export interface LocationDetails {
  placeId: string;
  name: string;
  streetAddress: string;
  longitude: number;
  latitude: number;
  stateCode: string;
  countryCode: string;
  county: string;
  city: string;
  state: string;
}
export interface SocialEvent {
  id: string;
  title: string;
  hostName: string;
  description: string;
  category: string;
  coverImage: string;
  dressCode: string;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  landmarkPin: { x: number; y: number; name: string };
  isPrivate: boolean;
  monetization: "free" | "door" | "momo";
  momoDetails?: {
    operator: string;
    phoneNumber: string;
    amount: number;
    currency?: string;
  };
  region?: string;
  currency?: string;
  maxCapacityEnabled: boolean;
  maxCapacity?: number;
  waitlistEnabled: boolean;
  guests: Guest[];
  comments: Comment[];
  photos: Photo[];
  features: {
    eventWall: boolean;
    sharedAlbum: boolean;
    guestListVisible: boolean;
  };
}
