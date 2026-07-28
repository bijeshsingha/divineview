export interface Room {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  maxOccupancy: string;
}

export const AMBARISH_ROOMS: Room[] = [
  {
    id: "deluxe-double",
    name: "Deluxe Double Room",
    price: "2678",
    shortDescription: "Comfortable and unpretentious room for budget travelers.",
    longDescription: "Our Deluxe Double Room provides exceptional value for visitors to Guwahati. Featuring a comfortable double bed, pristine linens, and an attached private bathroom. The room is fully air-conditioned and includes a flat-screen TV and complimentary WiFi, ensuring a restful and connected stay.",
    heroImage: "/images/ambarish/room1.jpeg",
    gallery: [
      "/images/ambarish/room1.jpeg",
      "/images/ambarish/room4.jpeg"
    ],
    amenities: [
      "Comfortable Double Bed",
      "Air Conditioning",
      "Flat-screen TV",
      "Free WiFi",
      "Private Bathroom",
      "Tea/Coffee Maker",
      "24 Hr Room Service"
    ],
    maxOccupancy: "2 Adults",
  },
  {
    id: "standard-double",
    name: "Standard Double Room",
    price: "3124",
    shortDescription: "Spacious comfort with premium amenities.",
    longDescription: "The Standard Double Room offers enhanced space and elevated comfort. Enjoy a premium double bed, elegant wooden furnishings, and a quiet ambiance perfect for unwinding after a busy day of meetings or sightseeing. Includes free daily housekeeping and a well-appointed private bathroom.",
    heroImage: "/images/ambarish/room2.jpeg",
    gallery: [
      "/images/ambarish/room2.jpeg",
      "/images/ambarish/room5.jpeg"
    ],
    amenities: [
      "Premium Double Bed",
      "Air Conditioning",
      "Flat-screen TV",
      "Sitting Area",
      "Free WiFi",
      "Private Bathroom with Shower",
      "Daily Housekeeping"
    ],
    maxOccupancy: "2 Adults",
  },
  {
    id: "suite",
    name: "Suite",
    price: "3749",
    shortDescription: "Our most luxurious offering with expansive living space.",
    longDescription: "Experience the pinnacle of comfort in our Suite. Designed for those who appreciate extra room to breathe, the Suite features a distinct living area separated from the main sleeping quarters. Perfect for families or executives who desire a premium experience in the heart of the city.",
    heroImage: "/images/ambarish/room3.jpeg",
    gallery: [
      "/images/ambarish/room3.jpeg",
      "/images/ambarish/room6.jpeg"
    ],
    amenities: [
      "King Size Bed",
      "Separate Living Area",
      "Premium Air Conditioning",
      "Large Flat-screen TV",
      "Mini-Fridge",
      "Bathtub (Subject to availability)",
      "Free WiFi",
      "Turndown Service"
    ],
    maxOccupancy: "2 Adults + 2 Children",
  }
];
