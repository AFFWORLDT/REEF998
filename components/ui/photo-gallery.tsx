"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PhotoGalleryProps {
  images: {
    src: string
    alt: string
    width: number
    height: number
  }[]
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null)
  }, [])

  const showNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex + 1) % images.length)
  }, [selectedImageIndex, images.length])

  const showPreviousImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
  }, [selectedImageIndex, images.length])

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 4}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <div className="relative w-[95vw] sm:w-[90vw] h-[95vh] sm:h-[90vh]">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-50 text-white hover:bg-white/20 rounded-full"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>

            <Image
              src={images[selectedImageIndex].src}
              alt={images[selectedImageIndex].alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "icon"}
                className="text-white hover:bg-white/20 rounded-full"
                onClick={showPreviousImage}
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
              
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "icon"}
                className="text-white hover:bg-white/20 rounded-full"
                onClick={showNextImage}
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
            </div>

            {/* Image Counter */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 