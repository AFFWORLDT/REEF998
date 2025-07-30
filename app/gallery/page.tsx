import { PhotoGallery } from "@/components/ui/photo-gallery"

const galleryImages = [
  {
    src: "/images/aerial-view.jpg",
    alt: "Aerial View",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/amenities-plan.jpg",
    alt: "Amenities Plan",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/floor-layout.jpg",
    alt: "Floor Layout",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/location-map.jpg",
    alt: "Location Map",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/payment-plan.jpg",
    alt: "Payment Plan",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/podium-amenities.jpg",
    alt: "Podium Amenities",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/reef-998-building.jpg",
    alt: "Reef 998 Building",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/rooftop-amenities.jpg",
    alt: "Rooftop Amenities",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/rooftop-plan.jpg",
    alt: "Rooftop Plan",
    width: 1920,
    height: 1080
  }
]

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Photo Gallery</h1>
      <PhotoGallery images={galleryImages} />
    </div>
  )
} 