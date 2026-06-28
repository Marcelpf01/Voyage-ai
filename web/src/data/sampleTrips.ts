/** Premium sample trips for demo mode. Bypasses the AI call entirely. */
import type { GeneratedItinerary, TripRequest } from "@/types";

export interface SampleTrip {
  request: TripRequest;
  itinerary: GeneratedItinerary;
  name: string;
  status: "upcoming" | "completed";
  favorite: boolean;
}

export const AMALFI_SAMPLE: SampleTrip = {
  name: "Amalfi Coast Dream",
  status: "upcoming",
  favorite: true,
  request: {
    destination: "Amalfi Coast, Italy",
    budget: 4500,
    currency: "EUR",
    startDate: "2026-07-10",
    endDate: "2026-07-15",
    travelers: 2,
    style: "Luxury",
    interests: ["Restaurants", "Nature", "Culture", "History"],
    walkingDistance: "Moderate",
    transportation: "Rental Car",
    hotelLevel: "5-Star",
  },
  itinerary: {
    destination: "Amalfi Coast",
    country: "Italy",
    centerLat: 40.6333,
    centerLng: 14.6,
    overview:
      "A sun-drenched 6-day luxury escape along Italy's most dramatic coastline. From Positano's pastel stairways to Ravello's cliffside gardens, this itinerary pairs Michelin-starred dining with hidden coves, vintage boat rides, and the region's finest limoncello. Every detail is tailored for romance and effortless elegance.",
    days: [
      {
        day: 1,
        date: "2026-07-10",
        title: "Arrival & Positano Golden Hour",
        estimatedCost: 620,
        morning: {
          title: "Naples to the Coast",
          summary:
            "Private transfer from Naples airport along the winding coastal road. Check into Le Sirenuse with a welcome glass of Franciacorta.",
          places: [
            { name: "Le Sirenuse", category: "hotel", description: "Iconic Positano hotel with vaulted ceilings and bougainvillea-draped terraces overlooking the sea.", lat: 40.628, lng: 14.485, estimatedCost: 0, durationMinutes: 0, travelTimeFromPrevious: undefined },
            { name: "Spiaggia Grande", category: "nature", description: "Positano's main beach — golden sand, striped umbrellas, and the postcard view of the cliffside town.", lat: 40.6282, lng: 14.4831, estimatedCost: 30, durationMinutes: 90, travelTimeFromPrevious: "5 min walk" },
          ],
        },
        afternoon: {
          title: "Coastal Stroll & Boutiques",
          summary:
            "Wander Positano's steep lanes lined with artisan sandal shops, linen boutiques, and ceramic studios.",
          places: [
            { name: "Ceramica Assunta", category: "shopping", description: "Family-run ceramic workshop known for hand-painted Mediterranean tiles and tableware.", lat: 40.6284, lng: 14.488, estimatedCost: 0, durationMinutes: 40, travelTimeFromPrevious: "10 min walk" },
            { name: "Chiesa di Santa Maria Assunta", category: "landmark", description: "Majolica-tiled dome and Byzantine Black Madonna icon — the spiritual heart of Positano.", lat: 40.6285, lng: 14.4845, estimatedCost: 0, durationMinutes: 30, travelTimeFromPrevious: "5 min walk" },
          ],
        },
        evening: {
          title: "Michelin-Starred Welcome Dinner",
          summary: "A table at La Sponda with candlelight, lemon trees, and a tasting menu by chef Gennaro Esposito.",
          places: [
            { name: "La Sponda", category: "restaurant", description: "Michelin-starred dining inside Le Sirenuse, illuminated by 400 candles nightly. The octopus ragu is legendary.", lat: 40.6281, lng: 14.4849, estimatedCost: 180, durationMinutes: 150, travelTimeFromPrevious: "2 min walk" },
          ],
        },
      },
      {
        day: 2,
        date: "2026-07-11",
        title: "Amalfi & Ravello Gardens",
        estimatedCost: 580,
        morning: {
          title: "Amalfi Town Discovery",
          summary: "Drive east to Amalfi. Tour the stunning cathedral and sip espresso in the Piazza del Duomo.",
          places: [
            { name: "Duomo di Amalfi", category: "landmark", description: "9th-century cathedral with Arab-Norman architecture, bronze doors cast in Constantinople, and the crypt of St. Andrew.", lat: 40.6345, lng: 14.6025, estimatedCost: 10, durationMinutes: 60, travelTimeFromPrevious: "24 min drive" },
            { name: "Pasticceria Pansa", category: "restaurant", description: "Since 1830 — the best sfogliatelle and delizia al limone on the coast. Perfect espresso stop.", lat: 40.6339, lng: 14.6027, estimatedCost: 12, durationMinutes: 30, travelTimeFromPrevious: "2 min walk" },
          ],
        },
        afternoon: {
          title: "Ravello's Sky-High Gardens",
          summary: "Climb to Ravello. Visit Villa Rufolo's gardens — Wagner's inspiration — and Villa Cimbrone's Terrace of Infinity.",
          places: [
            { name: "Villa Rufolo", category: "museum", description: "13th-century villa with cascading gardens that inspired Wagner's Parsifal. Panoramic views stretch to the Gulf of Salerno.", lat: 40.6495, lng: 14.611, estimatedCost: 10, durationMinutes: 90, travelTimeFromPrevious: "15 min drive" },
            { name: "Villa Cimbrone", category: "nature", description: "The Terrace of Infinity offers one of Italy's most breathtaking viewpoints — a marble bust-lined promontory above the sea.", lat: 40.651, lng: 14.612, estimatedCost: 10, durationMinutes: 60, travelTimeFromPrevious: "5 min walk" },
          ],
        },
        evening: {
          title: "Ravello Sunset Dinner",
          summary: "Al fresco dining with a view that rivals any on the planet.",
          places: [
            { name: "Rossellinis", category: "restaurant", description: "Two-Michelin-star dining at Palazzo Avino. The lobster linguine and sea-view terrace create an unforgettable evening.", lat: 40.649, lng: 14.6105, estimatedCost: 220, durationMinutes: 150, travelTimeFromPrevious: "5 min walk" },
          ],
        },
      },
      {
        day: 3,
        date: "2026-07-12",
        title: "Path of the Gods & Beach Bliss",
        estimatedCost: 340,
        morning: {
          title: "Il Sentiero degli Dei",
          summary: "Hike the legendary Path of the Gods from Bomerano to Nocelle — 3 hours of cliff-edge panoramas.",
          places: [
            { name: "Path of the Gods Trailhead", category: "nature", description: "Start in Bomerano (Agerola) for the classic route. Sheer limestone cliffs, wild rosemary, and the blue expanse of the Tyrrhenian Sea below.", lat: 40.636, lng: 14.542, estimatedCost: 0, durationMinutes: 180, travelTimeFromPrevious: "35 min drive" },
          ],
        },
        afternoon: {
          title: "Arienzo Beach Club",
          summary: "Descend to the exclusive Arienzo Beach Club for sun, salt, and Aperol Spritz on a private deck.",
          places: [
            { name: "Arienzo Beach Club", category: "nature", description: "300 steps down to a pebble beach with turquoise water, sun loungers, and a seafood grill — Positano's best-kept secret.", lat: 40.627, lng: 14.492, estimatedCost: 80, durationMinutes: 180, travelTimeFromPrevious: "20 min water taxi" },
          ],
        },
        evening: {
          title: "Casual Positano Trattoria",
          summary: "No reservation needed — a relaxed dinner at a family-run spot tucked in the alleys.",
          places: [
            { name: "Da Vincenzo", category: "restaurant", description: "Third-generation trattoria serving the region's best braised octopus and homemade scialatielli pasta.", lat: 40.629, lng: 14.486, estimatedCost: 70, durationMinutes: 90, travelTimeFromPrevious: "15 min walk" },
          ],
        },
      },
      {
        day: 4,
        date: "2026-07-13",
        title: "Capri by Private Boat",
        estimatedCost: 750,
        morning: {
          title: "Boat to Capri",
          summary: "A private wooden gozzo departs from Positano, skirting the Faraglioni rocks and pulling into Marina Piccola.",
          places: [
            { name: "Positano Jetty", category: "activity", description: "Board a traditional gozzo boat for a private crossing — your captain points out hidden grottos along the way.", lat: 40.628, lng: 14.483, estimatedCost: 400, durationMinutes: 180, travelTimeFromPrevious: "5 min walk" },
          ],
        },
        afternoon: {
          title: "Capri Town & Monte Solaro",
          summary: "Chairlift to Monte Solaro, then explore the designer boutiques and lemon-scented lanes of Capri town.",
          places: [
            { name: "Monte Solaro Chairlift", category: "activity", description: "A 12-minute chairlift ride to the island's highest point — 360° views of Vesuvius, Ischia, and the Faraglioni.", lat: 40.547, lng: 14.224, estimatedCost: 14, durationMinutes: 75, travelTimeFromPrevious: "15 min taxi" },
            { name: "Da Paolino", category: "restaurant", description: "Dine under a canopy of lemon trees. The lemon pasta and bufala mozzarella are essential.", lat: 40.554, lng: 14.229, estimatedCost: 90, durationMinutes: 90, travelTimeFromPrevious: "10 min taxi" },
          ],
        },
        evening: {
          title: "Blue Grotto & Sunset Return",
          summary: "Slip into the Blue Grotto at golden hour before a champagne sail back to Positano.",
          places: [
            { name: "Grotta Azzurra", category: "nature", description: "The ethereal blue cave — sunlight refracts through an underwater cavity creating an electric azure glow.", lat: 40.561, lng: 14.205, estimatedCost: 30, durationMinutes: 45, travelTimeFromPrevious: "15 min drive" },
          ],
        },
      },
      {
        day: 5,
        date: "2026-07-14",
        title: "Culinary Deep-Dive & Pompeii",
        estimatedCost: 510,
        morning: {
          title: "Cooking Class in Furore",
          summary: "Learn to make fresh pasta, local sauces, and lemon tiramisu in a cliffside farmhouse kitchen.",
          places: [
            { name: "Agriturismo Sant'Alfonso", category: "activity", description: "Family-run organic farm offering hands-on cooking classes with ingredients picked from their terraced gardens.", lat: 40.623, lng: 14.552, estimatedCost: 120, durationMinutes: 180, travelTimeFromPrevious: "30 min drive" },
          ],
        },
        afternoon: {
          title: "Pompeii Archaeological Site",
          summary: "Walk the ancient Roman streets frozen in time — villas, frescoes, and the haunting plaster casts.",
          places: [
            { name: "Pompeii Ruins", category: "museum", description: "One of the world's most extraordinary archaeological sites. Don't miss the Villa dei Misteri frescoes.", lat: 40.748, lng: 14.484, estimatedCost: 24, durationMinutes: 180, travelTimeFromPrevious: "40 min drive" },
          ],
        },
        evening: {
          title: "Final Feast in Positano",
          summary: "A celebratory last dinner at a terrace restaurant overlooking the twinkling lights of the coast.",
          places: [
            { name: "Ristorante Max", category: "restaurant", description: "Art-filled dining room and terrace serving the finest seafood risotto on the coast. Reservations essential.", lat: 40.6287, lng: 14.487, estimatedCost: 140, durationMinutes: 120, travelTimeFromPrevious: "35 min drive" },
          ],
        },
      },
      {
        day: 6,
        date: "2026-07-15",
        title: "Departure & Last Limoncello",
        estimatedCost: 160,
        morning: {
          title: "Final Morning Swim",
          summary: "One last dip at Fornillo Beach, a quieter cove just a few minutes' walk from the Positano center.",
          places: [
            { name: "Fornillo Beach", category: "nature", description: "A more secluded Positano beach with crystal water and a laid-back vibe — the perfect finale.", lat: 40.6286, lng: 14.4837, estimatedCost: 15, durationMinutes: 90, travelTimeFromPrevious: "10 min walk" },
          ],
        },
        afternoon: {
          title: "Sorrento & Departure",
          summary: "A stop in Sorrento for one last gelato and a bottle of limoncello before the transfer to Naples airport.",
          places: [
            { name: "Gelateria David", category: "restaurant", description: "Sorrento's most celebrated gelato — the pistachio and limone di Sorrento flavors are non-negotiable.", lat: 40.626, lng: 14.376, estimatedCost: 8, durationMinutes: 30, travelTimeFromPrevious: "30 min drive" },
          ],
        },
        evening: { title: "Arrivederci", summary: "Private transfer to Naples airport. Flight home with memories of la dolce vita.", places: [] },
      },
    ],
    budget: { hotels: 1800, flights: 800, food: 900, transportation: 500, entertainment: 300, shopping: 200 },
    weatherTips: [
      "July temperatures hover around 30°C (86°F) — lightweight linens and cotton are essential.",
      "Carry a refillable water bottle; the coastal stairs and sun are dehydrating.",
      "Expect occasional afternoon sea breezes — perfect for keeping the heat at bay.",
    ],
    packingSuggestions: [
      "Linen shirts and dresses — breathable and effortlessly chic.",
      "Comfortable leather sandals for town, sturdy trainers for the Path of the Gods.",
      "Swimwear for daily dips, a wide-brimmed hat, and polarized sunglasses.",
      "A light cashmere wrap for breezy boat rides and air-conditioned restaurants.",
    ],
    safetyAdvice: [
      "The coastal road is narrow and winding — drive defensively and park in designated lots.",
      "Watch your step on Positano's steep stairways, especially after rain.",
      "Sunscreen is non-negotiable: the Mediterranean sun reflects powerfully off the white buildings.",
    ],
    travelHacks: [
      "Book Le Sirenuse and Rossellinis 4-6 weeks ahead — they fill up fast in peak season.",
      "The SITA bus connects all coastal towns for €2 per ride if you skip the car one day.",
      "Buy limoncello from Furore or Tramonti — the same quality as Amalfi's shops at half the price.",
    ],
    hiddenGems: [
      "Fiordo di Furore — a fjord-like inlet with a tiny beach and an arched bridge, perfect for a secret swim.",
      "Marina di Praia — a fishing village cove between Positano and Amalfi with a cliffside restaurant.",
      "Church of San Giovanni del Toro in Ravello — 11th-century frescoes with zero crowds.",
    ],
  },
};

export const TOKYO_SAMPLE: SampleTrip = {
  name: "Tokyo Culinary & Culture",
  status: "completed",
  favorite: true,
  request: {
    destination: "Tokyo, Japan",
    budget: 5200,
    currency: "USD",
    startDate: "2026-06-01",
    endDate: "2026-06-06",
    travelers: 1,
    style: "Food",
    interests: ["Restaurants", "Culture", "History", "Nightlife", "Shopping"],
    walkingDistance: "Plenty",
    transportation: "Public Transit",
    hotelLevel: "4-Star",
  },
  itinerary: {
    destination: "Tokyo",
    country: "Japan",
    centerLat: 35.6762,
    centerLng: 139.6503,
    overview:
      "A sensory feast through Tokyo — from the neon-drenched alleyways of Shinjuku to the serene gardens of the Imperial Palace. This 6-day journey dives deep into Japan's culinary soul: ramen counters in Shibuya, omakase temples in Ginza, izakaya crawls in Yurakucho, and the art of the tea ceremony. Balanced with cultural immersion at Meiji Shrine, teamLab Borderless, and the Tsukiji outer market.",
    days: [
      {
        day: 1, date: "2026-06-01", title: "Shinjuku Neon & Golden Gai", estimatedCost: 380,
        morning: { title: "Arrival & Hotel Settle", summary: "Narita Express to Shinjuku. Check into the Park Hyatt Tokyo — the Lost in Translation hotel.", places: [{ name: "Park Hyatt Tokyo", category: "hotel", description: "Legendary hotel with sweeping views of Mount Fuji and the Tokyo skyline from the 52nd-floor New York Bar.", lat: 35.685, lng: 139.691, estimatedCost: 0, durationMinutes: 0, travelTimeFromPrevious: undefined }] },
        afternoon: { title: "Shinjuku Gyoen & Meiji Shrine", summary: "A serene walk through Shinjuku Gyoen's Japanese gardens, then the forested approach to Meiji Shrine.", places: [{ name: "Shinjuku Gyoen National Garden", category: "nature", description: "A 144-acre oasis blending French, English, and traditional Japanese garden styles.", lat: 35.6853, lng: 139.71, estimatedCost: 5, durationMinutes: 90, travelTimeFromPrevious: "20 min walk" }, { name: "Meiji Jingu", category: "landmark", description: "Tokyo's most important Shinto shrine, surrounded by 100,000 trees in an ancient forest.", lat: 35.6764, lng: 139.6993, estimatedCost: 0, durationMinutes: 60, travelTimeFromPrevious: "15 min walk" }] },
        evening: { title: "Golden Gai Izakaya Crawl", summary: "Dive into the tiny bars and yakitori joints of Golden Gai and Omoide Yokocho.", places: [{ name: "Golden Gai", category: "nightlife", description: "A warren of six narrow alleys packed with 200+ micro-bars, each seating 6-8 people.", lat: 35.6939, lng: 139.704, estimatedCost: 80, durationMinutes: 180, travelTimeFromPrevious: "15 min train" }, { name: "Nagi Shokudo", category: "restaurant", description: "Legendary dried-sardine ramen hidden on the 2nd floor — the anchovy broth is life-changing.", lat: 35.6935, lng: 139.7035, estimatedCost: 12, durationMinutes: 45, travelTimeFromPrevious: "2 min walk" }] },
      },
      {
        day: 2, date: "2026-06-02", title: "Tsukiji, TeamLab & Ginza Omakase", estimatedCost: 520,
        morning: { title: "Tsukiji Outer Market", summary: "A grazer's paradise — fresh sushi breakfasts, tamagoyaki, uni skewers, and the best matcha soft serve.", places: [{ name: "Tsukiji Outer Market", category: "restaurant", description: "500+ stalls selling the freshest seafood, kitchen knives, and street food — go early for the best tuna auction sushi.", lat: 35.665, lng: 139.77, estimatedCost: 40, durationMinutes: 120, travelTimeFromPrevious: "20 min train" }] },
        afternoon: { title: "teamLab Borderless", summary: "An immersive digital art universe in Azabudai Hills — light sculptures, mirrored rooms, and kinetic flowers.", places: [{ name: "teamLab Borderless", category: "museum", description: "A mind-bending museum without a map, where 60+ digital artworks move through rooms and corridors.", lat: 35.662, lng: 139.746, estimatedCost: 22, durationMinutes: 150, travelTimeFromPrevious: "15 min train" }] },
        evening: { title: "Ginza Omakase Experience", summary: "An intimate 12-course omakase dinner at a 6-seat Ginza counter — the pinnacle of sushi craftsmanship.", places: [{ name: "Sushi Yoshitake", category: "restaurant", description: "Three-Michelin-star sushiya where chef Masahiro Yoshitake serves Edomae sushi in a meditative 90-minute ritual.", lat: 35.672, lng: 139.763, estimatedCost: 280, durationMinutes: 120, travelTimeFromPrevious: "8 min taxi" }] },
      },
      {
        day: 3, date: "2026-06-03", title: "Harajuku, Shibuya & Yakitori Alley", estimatedCost: 340,
        morning: { title: "Harajuku & Omotesando", summary: "Takeshita Street's kawaii chaos, then the architectural boutiques of Omotesando.", places: [{ name: "Takeshita Street", category: "shopping", description: "The epicenter of Harajuku youth culture — rainbow cotton candy, vintage shops, and animal cafés.", lat: 35.6702, lng: 139.703, estimatedCost: 0, durationMinutes: 60, travelTimeFromPrevious: "25 min train" }] },
        afternoon: { title: "Shibuya Scramble & Depachika", summary: "Cross the world's busiest intersection, then explore a department store food basement.", places: [{ name: "Shibuya Sky", category: "landmark", description: "229m-high observation deck with an open-air platform — the best view of the Scramble Crossing below.", lat: 35.658, lng: 139.702, estimatedCost: 18, durationMinutes: 75, travelTimeFromPrevious: "10 min walk" }, { name: "Shibuya Tokyu Food Show", category: "shopping", description: "The cathedral of Japanese food halls — bento boxes, wagashi sweets, and free samples galore.", lat: 35.6587, lng: 139.701, estimatedCost: 20, durationMinutes: 60, travelTimeFromPrevious: "3 min walk" }] },
        evening: { title: "Yurakucho Yakitori Crawl", summary: "Eat smoke-kissed chicken skewers under the railway arches with salarymen.", places: [{ name: "Yurakucho Gado-shita", category: "restaurant", description: "A row of lantern-lit yakitori joints beneath the train tracks — the tsukune (chicken meatball) and shishito peppers are essential.", lat: 35.674, lng: 139.761, estimatedCost: 45, durationMinutes: 120, travelTimeFromPrevious: "5 min train" }] },
      },
      {
        day: 4, date: "2026-06-04", title: "Asakusa, Ryogoku & Sumo", estimatedCost: 310,
        morning: { title: "Senso-ji Temple & Nakamise-dori", summary: "Tokyo's oldest temple, approached through a vibrant shopping street of traditional crafts and snacks.", places: [{ name: "Senso-ji", category: "landmark", description: "The Kaminarimon Gate, with its giant red lantern, opens to Nakamise-dori and the main hall dedicated to Kannon.", lat: 35.7148, lng: 139.7967, estimatedCost: 0, durationMinutes: 75, travelTimeFromPrevious: "25 min train" }] },
        afternoon: { title: "Sumo Museum & Chankonabe", summary: "Visit the Sumo Museum, then a hot pot lunch — the same meal that fuels sumo wrestlers.", places: [{ name: "Ryogoku Kokugikan", category: "museum", description: "The national sumo stadium and museum — tournament tickets are unforgettable if you time it right.", lat: 35.697, lng: 139.793, estimatedCost: 0, durationMinutes: 60, travelTimeFromPrevious: "15 min train" }, { name: "Chanko Tomoegata", category: "restaurant", description: "A retired sumo wrestler's chankonabe restaurant — hearty chicken and vegetable hot pot.", lat: 35.696, lng: 139.792, estimatedCost: 25, durationMinutes: 60, travelTimeFromPrevious: "2 min walk" }] },
        evening: { title: "Akihabara Electric Evening", summary: "Explore the otaku paradise — retro game stores, maid cafés, and arcades buzzing until midnight.", places: [{ name: "Super Potato Akihabara", category: "shopping", description: "Three floors of retro gaming heaven — original Famicom cartridges and vintage arcade cabinets.", lat: 35.7, lng: 139.771, estimatedCost: 0, durationMinutes: 60, travelTimeFromPrevious: "8 min train" }] },
      },
      {
        day: 5, date: "2026-06-05", title: "Day Trip: Kamakura & Enoshima", estimatedCost: 280,
        morning: { title: "Great Buddha & Hase-dera", summary: "Train to Kamakura. Visit the 13m bronze Daibutsu and the hillside temple of Hase-dera.", places: [{ name: "Kotoku-in (Great Buddha)", category: "landmark", description: "A 750-year-old bronze Amida Buddha, 13.35m tall, sitting serenely in open air since the temple hall was washed away in a tsunami.", lat: 35.3163, lng: 139.535, estimatedCost: 4, durationMinutes: 45, travelTimeFromPrevious: "55 min train" }] },
        afternoon: { title: "Komachi-dori & Enoshima", summary: "Browse Komachi-dori's craft shops, then take the Enoden train to Enoshima Island.", places: [{ name: "Komachi-dori", category: "shopping", description: "Kamakura's main shopping street — matcha gelato, shirasu rice bowls, and artisanal stationery.", lat: 35.318, lng: 139.549, estimatedCost: 20, durationMinutes: 60, travelTimeFromPrevious: "10 min walk" }, { name: "Enoshima Island", category: "nature", description: "A small island with caves, a shrine, and seafood shacks — climb the Sea Candle lighthouse for Fuji views.", lat: 35.3, lng: 139.48, estimatedCost: 15, durationMinutes: 120, travelTimeFromPrevious: "20 min train" }] },
        evening: { title: "Shimokitazawa Indie Evening", summary: "Back in Tokyo, explore Shimokitazawa's vintage shops, intimate music venues, and natural-wine bars.", places: [{ name: "Shimokitazawa", category: "nightlife", description: "Tokyo's bohemian quarter — thrift stores, underground jazz clubs, and curry shops in a maze of narrow streets.", lat: 35.661, lng: 139.667, estimatedCost: 50, durationMinutes: 180, travelTimeFromPrevious: "50 min train" }] },
      },
      {
        day: 6, date: "2026-06-06", title: "Last Ramen & Departure", estimatedCost: 180,
        morning: { title: "Ramen Museum & Final Bowl", summary: "Visit the Shin-Yokohama Ramen Museum, then one last miso ramen before heading to the airport.", places: [{ name: "Shin-Yokohama Ramen Museum", category: "museum", description: "A food-themed amusement park — a replica 1958 Tokyo street lined with 9 ramen shops from across Japan.", lat: 35.509, lng: 139.614, estimatedCost: 8, durationMinutes: 90, travelTimeFromPrevious: "35 min train" }] },
        afternoon: { title: "Departure from Narita", summary: "Narita Express back to the airport, with an ekiben (station bento) for the journey.", places: [] },
        evening: { title: "Sayonara", summary: "", places: [] },
      },
    ],
    budget: { hotels: 1600, flights: 1000, food: 1200, transportation: 300, entertainment: 600, shopping: 500 },
    weatherTips: ["June is rainy season (tsuyu) — pack a compact umbrella and quick-dry clothing.", "Humidity hovers at 70%+ — lightweight, breathable fabrics are your best friend.", "Despite the rain, temperatures are pleasant (22-28°C) — perfect for walking."],
    packingSuggestions: ["Packable rain jacket or compact folding umbrella.", "Comfortable walking shoes — you will average 20,000+ steps per day.", "A small hand towel for public restrooms and wiping sweat.", "Coin purse — Japan is still a cash society for small eateries and temples."],
    safetyAdvice: ["Tokyo is one of the safest cities in the world, but keep an eye on your belongings in crowded trains.", "Learn the phrase 'sumimasen' (excuse me/sorry) — essential for navigating politely.", "Tattoos may restrict access to some onsen and pools — check in advance."],
    travelHacks: ["Get a Suica or Pasmo IC card — it works on trains, buses, convenience stores, and vending machines.", "Convenience store food (konbini) is genuinely excellent — the egg sandwiches and onigiri are a budget traveler's secret.", "Most restaurants display plastic food models outside — point and smile if you don't speak Japanese."],
    hiddenGems: ["Yanaka Ginza — a retro shopping street in old Tokyo, untouched by modernity.", "Nezu Shrine — a vermillion torii gate tunnel without the crowds of Kyoto's Fushimi Inari.", "Omoide Yokocho — a narrow alley in Shinjuku with 60+ post-war yakitori stalls."],
  },
};

export const BALI_SAMPLE: SampleTrip = {
  name: "Bali Wellness Retreat",
  status: "upcoming",
  favorite: false,
  request: {
    destination: "Bali, Indonesia",
    budget: 3200,
    currency: "USD",
    startDate: "2026-09-05",
    endDate: "2026-09-10",
    travelers: 2,
    style: "Beach",
    interests: ["Nature", "Restaurants", "Culture", "Shopping"],
    walkingDistance: "Moderate",
    transportation: "Rideshare",
    hotelLevel: "4-Star",
  },
  itinerary: {
    destination: "Bali",
    country: "Indonesia",
    centerLat: -8.4095,
    centerLng: 115.1889,
    overview:
      "A restorative 6-day Bali escape blending sunrise yoga, volcanic temple visits, cascading waterfall swims, and the island's best plant-based cuisine. Stay in a jungle-rimmed Ubud villa, surf the waves at Canggu, and end each day with a sunset ritual at Uluwatu's clifftop temple.",
    days: [
      {
        day: 1, date: "2026-09-05", title: "Arrival & Ubud Serenity", estimatedCost: 420,
        morning: { title: "Airport & Settle", summary: "Welcome at Ngurah Rai. Private transfer to Ubud through rice terraces and carving villages.", places: [{ name: "Four Seasons Resort Bali at Sayan", category: "hotel", description: "A lotus-pond entrance over the Ayung River gorge — rooms are suites with private plunge pools and jungle views.", lat: -8.506, lng: 115.262, estimatedCost: 0, durationMinutes: 0, travelTimeFromPrevious: undefined }] },
        afternoon: { title: "Sacred Monkey Forest", summary: "Wander through the ancient temple complex where 700+ Balinese long-tailed macaques roam freely.", places: [{ name: "Sacred Monkey Forest Sanctuary", category: "nature", description: "A 12.5-hectare forest with three holy temples, moss-covered statues, and a troupe of playful long-tailed macaques.", lat: -8.518, lng: 115.259, estimatedCost: 6, durationMinutes: 75, travelTimeFromPrevious: "10 min drive" }] },
        evening: { title: "Ubud Garden Dinner", summary: "Farm-to-table organic cuisine in a candlelit jungle garden.", places: [{ name: "Locavore", category: "restaurant", description: "Asia's most celebrated sustainable restaurant — a hyper-local tasting menu using 95% Indonesian ingredients.", lat: -8.505, lng: 115.263, estimatedCost: 120, durationMinutes: 150, travelTimeFromPrevious: "5 min drive" }] },
      },
      {
        day: 2, date: "2026-09-06", title: "Tegallalang & Tirta Empul", estimatedCost: 310,
        morning: { title: "Tegallalang Rice Terraces", summary: "Sunrise walk through Bali's most photogenic rice terraces with a local farmer guide.", places: [{ name: "Tegallalang Rice Terraces", category: "nature", description: "Iconic stepped rice paddies in a lush valley — the subak irrigation system is a UNESCO cultural landscape.", lat: -8.431, lng: 115.28, estimatedCost: 15, durationMinutes: 90, travelTimeFromPrevious: "25 min drive" }] },
        afternoon: { title: "Tirta Empul Temple", summary: "Purification ritual at the sacred water temple — join locals in the crystal-clear spring pools.", places: [{ name: "Tirta Empul", category: "landmark", description: "A 1,000-year-old water temple where devotees bathe in holy spring water for spiritual cleansing.", lat: -8.416, lng: 115.315, estimatedCost: 3, durationMinutes: 60, travelTimeFromPrevious: "15 min drive" }, { name: "Sari Organik", category: "restaurant", description: "An open-air restaurant in the middle of rice fields — the organic salads and coconut smoothies are soul-restoring.", lat: -8.506, lng: 115.26, estimatedCost: 30, durationMinutes: 60, travelTimeFromPrevious: "20 min drive" }] },
        evening: { title: "Balinese Dance & Ubud Night", summary: "A Legong dance performance at the Ubud Palace, then a stroll through the night market.", places: [{ name: "Ubud Palace", category: "activity", description: "The royal palace stages nightly traditional Legong and Barong dances in an intimate courtyard.", lat: -8.5069, lng: 115.2625, estimatedCost: 8, durationMinutes: 90, travelTimeFromPrevious: "5 min drive" }] },
      },
      {
        day: 3, date: "2026-09-07", title: "Waterfalls & Jungle Temples", estimatedCost: 280,
        morning: { title: "Tegenungan Waterfall", summary: "A refreshing morning swim at Bali's accessible waterfall, then the lesser-known Kanto Lampo cascade.", places: [{ name: "Tegenungan Waterfall", category: "nature", description: "A powerful waterfall cascading into a deep pool — arrive early to beat the crowds.", lat: -8.569, lng: 115.286, estimatedCost: 2, durationMinutes: 75, travelTimeFromPrevious: "20 min drive" }, { name: "Kanto Lampo Waterfall", category: "nature", description: "A hidden gem — water tumbles over a stepped rock formation creating a natural infinity cascade.", lat: -8.535, lng: 115.297, estimatedCost: 2, durationMinutes: 60, travelTimeFromPrevious: "12 min drive" }] },
        afternoon: { title: "Gunung Kawi Temple", summary: "Ancient 11th-century royal tombs carved into a cliff face, reached by 300 stone steps through rice paddies.", places: [{ name: "Gunung Kawi", category: "landmark", description: "Ten towering shrines (candi) carved directly into rock, standing 7m tall in a lush river valley.", lat: -8.423, lng: 115.312, estimatedCost: 3, durationMinutes: 75, travelTimeFromPrevious: "18 min drive" }] },
        evening: { title: "Canggu Beach Sunset", summary: "Drive to Canggu. Cocktails and coconut bowls at a beachfront bar as surfers catch the last waves.", places: [{ name: "The Lawn Canggu", category: "restaurant", description: "A beachfront lounge with grass lawns, infinity pool, and front-row sunset views over Batu Bolong Beach.", lat: -8.653, lng: 115.128, estimatedCost: 45, durationMinutes: 120, travelTimeFromPrevious: "45 min drive" }] },
      },
      {
        day: 4, date: "2026-09-08", title: "Canggu Surf & Seminyak", estimatedCost: 370,
        morning: { title: "Surf Lesson at Batu Bolong", summary: "A 2-hour lesson with a local pro — Bali's gentle beach break is perfect for beginners.", places: [{ name: "Batu Bolong Beach", category: "activity", description: "Long, sandy beach with consistent gentle waves — the island's best beginner surf spot.", lat: -8.654, lng: 115.128, estimatedCost: 35, durationMinutes: 120, travelTimeFromPrevious: "10 min drive" }] },
        afternoon: { title: "Canggu Café Crawl", summary: "Hop between Bali's best specialty coffee roasters and smoothie bowl shrines.", places: [{ name: "Crate Café", category: "restaurant", description: "Industrial-chic café famous for dragonfruit smoothie bowls and the best avocado toast on the island.", lat: -8.652, lng: 115.13, estimatedCost: 15, durationMinutes: 45, travelTimeFromPrevious: "5 min walk" }] },
        evening: { title: "Seminyak Fine Dining", summary: "Dress up for a candlelit dinner at one of Seminyak's celebrated restaurants.", places: [{ name: "Merah Putih", category: "restaurant", description: "Stunning glass-walled restaurant serving elevated Indonesian classics — the beef rendang and nasi goreng are perfect.", lat: -8.687, lng: 115.165, estimatedCost: 80, durationMinutes: 120, travelTimeFromPrevious: "20 min drive" }] },
      },
      {
        day: 5, date: "2026-09-09", title: "Uluwatu & Jimbaran Seafood", estimatedCost: 390,
        morning: { title: "Uluwatu Temple", summary: "Perched 70m above the Indian Ocean on a sheer limestone cliff — Bali's most dramatic temple.", places: [{ name: "Uluwatu Temple", category: "landmark", description: "An 11th-century sea temple at the southwestern tip of Bali. Guarded by monkeys and surrounded by crashing waves.", lat: -8.829, lng: 115.085, estimatedCost: 5, durationMinutes: 75, travelTimeFromPrevious: "40 min drive" }] },
        afternoon: { title: "Padang Padang Beach", summary: "A hidden cove accessed through a narrow rock corridor — white sand, turquoise water, and a laid-back surf vibe.", places: [{ name: "Padang Padang Beach", category: "nature", description: "Made famous by Eat Pray Love — climb down through a cave-like entrance to find paradise.", lat: -8.81, lng: 115.099, estimatedCost: 5, durationMinutes: 150, travelTimeFromPrevious: "10 min drive" }] },
        evening: { title: "Jimbaran Bay Seafood Feast", summary: "Feet-in-the-sand dining at a grilled seafood shack as the sun melts into the sea.", places: [{ name: "Jimbaran Bay Seafood", category: "restaurant", description: "Rows of beachside warungs grilling fresh snapper, prawns, and clams — pick your fish, name your sauce.", lat: -8.78, lng: 115.16, estimatedCost: 50, durationMinutes: 120, travelTimeFromPrevious: "20 min drive" }] },
      },
      {
        day: 6, date: "2026-09-10", title: "Yoga & Farewell", estimatedCost: 160,
        morning: { title: "Sunrise Yoga at The Yoga Barn", summary: "A rooftop vinyasa class overlooking the jungle canopy — the perfect Bali finale.", places: [{ name: "The Yoga Barn", category: "activity", description: "Southeast Asia's most renowned yoga and wellness center — the morning flow class is a transformative experience.", lat: -8.505, lng: 115.261, estimatedCost: 12, durationMinutes: 90, travelTimeFromPrevious: "50 min drive" }] },
        afternoon: { title: "Last Massage & Departure", summary: "A traditional Balinese massage before the transfer to the airport.", places: [{ name: "Karsa Spa", category: "activity", description: "Open-air treatment rooms perched over lotus ponds — the Balinese massage with warm herbal pouches is transcendent.", lat: -8.5, lng: 115.263, estimatedCost: 30, durationMinutes: 90, travelTimeFromPrevious: "5 min drive" }] },
        evening: { title: "Sampai Jumpa", summary: "Private transfer to Ngurah Rai Airport.", places: [] },
      },
    ],
    budget: { hotels: 1400, flights: 700, food: 500, transportation: 200, entertainment: 250, shopping: 150 },
    weatherTips: ["September is Bali's dry season — expect sunny days around 27-30°C with low humidity.", "Morning rain is rare this time of year, but carry a light rain jacket for mountain areas.", "The UV index is intense year-round near the equator — reef-safe sunscreen is essential."],
    packingSuggestions: ["Lightweight resort wear — linens, kaftans, and loose cotton.", "Reef-safe sunscreen and insect repellent (mosquitoes are active at dusk).", "A sarong — required for temple visits and doubles as a beach wrap.", "Yoga clothes if you plan to join classes — Ubud has world-class studios."],
    safetyAdvice: ["Bali's traffic can be chaotic — use Gojek or Grab for easy scooter/car rides.", "Drink only bottled or filtered water. Bali Belly is real but avoidable.", "Respect temple dress codes: sarong and sash are mandatory, available to rent at most sites."],
    travelHacks: ["Download Gojek app — it's Southeast Asia's Uber for rides, food delivery, and even massages to your villa.", "Bargain at Ubud Art Market — aim for 40-50% off the first price with a smile.", "The best nasi campur (mixed rice) is at local warungs, not tourist restaurants."],
    hiddenGems: ["Sekumpul Waterfall — a 2-hour trek to seven cascades, widely considered Bali's most beautiful falls.", "Penglipuran Village — a pristine traditional Balinese village with identical entrance gates and zero cars.", "Sundays Beach Club — a secluded white-sand cove accessible only by cliff elevator."],
  },
};

export const ALL_SAMPLES = [AMALFI_SAMPLE, TOKYO_SAMPLE, BALI_SAMPLE];
