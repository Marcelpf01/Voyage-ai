export type TravelStyle =
  | "Adventure"
  | "Luxury"
  | "Family"
  | "Business"
  | "Romantic"
  | "Food"
  | "Beach"
  | "Backpacking";

export type Interest =
  | "Museums"
  | "Nightlife"
  | "Nature"
  | "Restaurants"
  | "Shopping"
  | "History"
  | "Culture"
  | "Sports";

export type Transportation = "Walking" | "Public Transit" | "Rental Car" | "Rideshare" | "Mixed";
export type HotelLevel = "Hostel" | "3-Star" | "4-Star" | "5-Star" | "Boutique";
export type WalkingDistance = "Minimal" | "Moderate" | "Plenty";

export interface TripRequest {
  destination: string;
  budget: number;
  currency: string;
  startDate: string;
  endDate: string;
  travelers: number;
  style: TravelStyle;
  interests: Interest[];
  walkingDistance: WalkingDistance;
  transportation: Transportation;
  hotelLevel: HotelLevel;
}

export type PlaceCategory = "hotel" | "restaurant" | "museum" | "activity" | "landmark" | "nature" | "shopping" | "nightlife";

export interface Place {
  name: string;
  category: PlaceCategory;
  description: string;
  lat: number;
  lng: number;
  estimatedCost: number;
  durationMinutes: number;
  travelTimeFromPrevious?: string;
}

export interface DaySegment {
  title: string;
  summary: string;
  places: Place[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  morning: DaySegment;
  afternoon: DaySegment;
  evening: DaySegment;
  estimatedCost: number;
}

export interface BudgetBreakdown {
  hotels: number;
  flights: number;
  food: number;
  transportation: number;
  entertainment: number;
  shopping: number;
}

export interface GeneratedItinerary {
  destination: string;
  country: string;
  centerLat: number;
  centerLng: number;
  overview: string;
  days: ItineraryDay[];
  budget: BudgetBreakdown;
  weatherTips: string[];
  packingSuggestions: string[];
  safetyAdvice: string[];
  travelHacks: string[];
  hiddenGems: string[];
}

export type TripStatus = "upcoming" | "draft" | "completed" | "archived";

export interface Trip {
  id: string;
  name: string;
  request: TripRequest;
  itinerary: GeneratedItinerary;
  status: TripStatus;
  favorite: boolean;
  coverImage: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "email";
  createdAt: number;
}
