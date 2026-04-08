import { Skeleton } from "@/components/ui/skeleton";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import type { GalleryImage } from "@/types";
import { ChevronLeft, ChevronRight, Images, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function LightboxModal({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
        onClick={onClose}
        data-ocid="lightbox-backdrop"
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close gallery"
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
          data-ocid="lightbox-close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            data-ocid="lightbox-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={activeIndex}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl max-h-[80vh] w-full rounded-2xl overflow-hidden border border-border/60 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
            style={{ maxHeight: "70vh" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          <div className="bg-card px-5 py-3">
            <p className="text-sm font-medium text-foreground">
              {image.caption}
            </p>
            {image.event && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {image.event}
              </p>
            )}
          </div>
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            data-ocid="lightbox-next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-card border border-border text-xs text-muted-foreground">
          {activeIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryThumb({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative group aspect-square rounded-xl overflow-hidden border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      onClick={onClick}
      aria-label={image.caption}
      data-ocid={`gallery-thumb-${image.id}`}
    >
      <img
        src={image.url}
        alt={image.caption}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "/assets/images/placeholder.svg";
        }}
      />
      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="h-8 w-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
        <p className="text-xs text-foreground font-medium line-clamp-1">
          {image.caption}
        </p>
      </div>
    </motion.button>
  );
}

export default function GallerySection() {
  const { data: images, isLoading } = useGalleryImages();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (lightboxIndex === null || !images) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null || !images) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  return (
    <section
      id="gallery"
      className="py-20 md:py-28 bg-background section-divider"
      data-ocid="gallery-section"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p className="text-section-label mb-3">Captured Moments</p>
          <h2 className="text-section-heading text-foreground mb-4">
            Community <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Highlights from our events, workshops, hackathons, and community
            gatherings.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Skeleton key={n} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : !images || images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border border-dashed border-border/60 rounded-2xl"
            data-ocid="gallery-empty"
          >
            <Images className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              Gallery coming soon
            </h3>
            <p className="text-sm text-muted-foreground">
              Photos from our events will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <GalleryThumb
                key={image.id}
                image={image}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && images && images.length > 0 && (
        <LightboxModal
          images={images}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
