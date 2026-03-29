"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
};

export default function GallerySection() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "YouTube Thumbnail Normal",
    "YouTube Thumbnail AI",
    "Folk Song Poster",
    "Graphic Designs",
    "Political Poster",
    "Additional Work",
  ];

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "gallery"));

      const imageList: ImageItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        imageList.push({
          id: doc.id,
          title: data.title,
          imageUrl: data.imageUrl,
          category: data.category,
        });
      });

      setImages(imageList);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const filteredImages = useMemo(() => {
    return activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const nextImage = () => {
    if (selectedIndex !== null && filteredImages.length > 0) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null && filteredImages.length > 0) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredImages]);

  // Close popup when category changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  // Loading Skeleton
  if (loading) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-32 bg-gray-200 animate-pulse rounded-full"
                ></div>
              ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-200 animate-pulse rounded-xl"
                ></div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white text-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated Category Switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredImages.length > 0 ? (
              filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  onClick={() => setSelectedIndex(index)}
                  className="relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-60 object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-semibold px-4 text-center">
                      {img.title}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-500 text-lg">
                  No designs available in this category yet.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Popup */}
      <AnimatePresence>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setSelectedIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition z-50"
            >
              <X size={24} />
            </button>

            {/* Left Arrow */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 md:left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
              >
                <ChevronLeft size={30} />
              </button>
            )}

            {/* Swipe-enabled image */}
            <motion.img
              key={filteredImages[selectedIndex].id}
              src={filteredImages[selectedIndex].imageUrl}
              alt={filteredImages[selectedIndex].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) nextImage();
                if (info.offset.x > 80) prevImage();
              }}
            />

            {/* Right Arrow */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 md:right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-50"
              >
                <ChevronRight size={30} />
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-md">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}