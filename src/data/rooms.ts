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

export const ROOMS: Room[] = [
  {
    id: "double-standard",
    name: "Double Standard (Non-AC)",
    price: "1500",
    shortDescription: "Affordable comfort for travelers on a budget.",
    longDescription: "Our Double Standard room provides all the essential comforts you need without breaking the bank. Featuring a comfortable double bed, clean and well-maintained interiors, and an attached bathroom with 24-hour hot and cold water. This non-AC room is perfectly ventilated and ideal for short stays or backpackers exploring the Northeast.",
    heroImage: "/images/double-standard.jpg",
    gallery: [
      "/images/rooms/std1.jpg",
      "/images/rooms/std2.jpg",
      "/images/rooms/std3.jpg",
    ],
    amenities: [
      "Comfortable Double Bed",
      "Television with Satellite Channels",
      "Free WiFi",
      "24 Hr Housekeeping",
      "24 Hr Hot/Cold Water",
      "Room Service"
    ],
    maxOccupancy: "2 Adults",
  },
  {
    id: "double-deluxe",
    name: "Double Deluxe (AC)",
    price: "2000",
    shortDescription: "A step up in comfort with Air Conditioning.",
    longDescription: "The Double Deluxe room offers upgraded comfort with a premium split Air Conditioner to beat the Guwahati heat. The room features elegant wooden furnishings, a cozy sitting area, and ample space to relax. Enjoy high-speed broadband, a flat-screen TV, and prompt multi-cuisine room service directly to your door.",
    heroImage: "/images/double-deluxe.jpg",
    gallery: [
      "/images/rooms/dlx1.jpg",
      "/images/rooms/dlx2.jpg",
    ],
    amenities: [
      "Air Conditioning",
      "Premium Double Bed",
      "Sitting Area",
      "Flat-screen TV",
      "Free WiFi",
      "Telephone",
      "24 Hr Hot/Cold Water"
    ],
    maxOccupancy: "2 Adults + 1 Child",
  },
  {
    id: "double-executive",
    name: "Double Executive (AC)",
    price: "2500",
    shortDescription: "Premium executive styling for business and leisure.",
    longDescription: "Designed for those who appreciate the finer things, the Double Executive room features sophisticated decor, plush bedding, and a spacious layout. Whether you're here for business or leisure, you'll appreciate the dedicated workspace, luxurious bathroom fittings, and a tranquil environment right in the heart of the bustling city.",
    heroImage: "/images/double-executive.jpg",
    gallery: [
      "/images/rooms/exec1.jpg",
      "/images/rooms/exec2.jpg",
      "/images/rooms/exec3.jpg",
      "/images/rooms/exec4.jpg",
      "/images/rooms/exec5.jpg",
    ],
    amenities: [
      "Air Conditioning",
      "Executive Double Bed",
      "Workspace / Desk",
      "Premium Toiletries",
      "Flat-screen TV",
      "Free WiFi",
      "Telephone",
      "Complimentary Newspaper"
    ],
    maxOccupancy: "2 Adults + 1 Child",
  },
  {
    id: "family-executive",
    name: "Family Executive (AC)",
    price: "3000",
    shortDescription: "Spacious luxury designed for the whole family.",
    longDescription: "Traveling with family? The Family Executive room provides abundant space so everyone can relax comfortably. Featuring expanded sleeping arrangements with premium mattresses, this room ensures a restful night for the whole family. The elegant interiors, large wardrobe, and top-tier room service make it a true home away from home.",
    heroImage: "/images/family-executive.jpg",
    gallery: [
      "/images/rooms/fam1.jpg",
      "/images/rooms/fam2.jpg",
      "/images/rooms/fam3.jpg",
    ],
    amenities: [
      "Air Conditioning",
      "Multiple Beds / King Size",
      "Spacious Wardrobe",
      "Large Sitting Area",
      "Flat-screen TV",
      "Free WiFi",
      "24 Hr Room Service",
      "Laundry Service available"
    ],
    maxOccupancy: "4 Adults",
  }
];
