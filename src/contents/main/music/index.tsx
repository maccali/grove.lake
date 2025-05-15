// components/MusicCarousel.tsx
"use client";

import musicData from "@/data/songs.json";
import Image from "next/image";
import { FaAmazon, FaYoutube, FaSpotify, FaTiktok } from "react-icons/fa6";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";    
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MusicCarousel() {
  return (
    <section className="py-12 px-12">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          // quando a largura ≥640px: 1 slide por vez
          640: {
            slidesPerView: 1,
          },
          // ≥768px: 2 slides
          768: {
            slidesPerView: 2,
          },
          // ≥1024px: 3 slides
          1024: {
            slidesPerView: 3,
          },
          // ≥1280px: 5 slides (desktop amplo)
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {musicData.map((track) => (
          <SwiperSlide key={track.title}>
            <div className="flex flex-col items-center p-4 rounded-xl shadow-lg">
              <Image
                src={track.cover}
                alt={track.title}
                width={200}
                height={200}
                className="rounded mb-4"
              />
              <h3 className="font-aperture text-xl font-semibold mb-2">
                {track.title}
              </h3>
              <div className="flex gap-4 text-2xl">
                <a
                  href={track.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSpotify />
                </a>
                <a
                  href={track.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
                <a
                  href={track.links.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaAmazon />
                </a>
                <a
                  href={track.links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
