"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FeaturedItem = {
  title: string;
  image: string;
  description: string;
};

const featuredItems: FeaturedItem[] = [
  {
    title: "Jane Doe",
    image: "/images/photo-1.jpg",
    description: "Top keynote speaker this month with 15+ years of experience.",
  },
  {
    title: "John Smith",
    image: "/images/photo-2.jpg",
    description: "Renowned data scientist and event headliner.",
  },
  {
    title: "Lisa Green",
    image: "/images/photo-3.jpg",
    description: "Panelist with expertise in leadership and growth.",
  },
];

export default function FeaturedCarouselCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000); // change slide every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const currentItem = featuredItems[currentIndex];

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={currentItem.image}
          alt={currentItem.title}
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text content */}
      <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
        <h3 className="text-lg font-semibold">{currentItem.title}</h3>
        <p className="text-sm">{currentItem.description}</p>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {featuredItems.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
