"use client";

import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

export default function IntroSection() {

  const text = "Graphic Designer";
  const [displayText, setDisplayText] = useState("");

  // 🔥 Typing Effect
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center transition-all duration-700">

        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="p-[4px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">

            <img
              src="/vinay prot.jpeg"
              alt="Designer"
              className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover bg-white shadow-xl hover:scale-105 transition duration-500"
            />

          </div>
        </div>

        {/* Intro Text */}
        <div className="text-center md:text-left space-y-6">

          {/* 🔥 Gradient + Typing Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">

            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {displayText}
            </span>

            <span className="animate-pulse">|</span>

          </h1>

          <p className="text-gray-600 text-lg max-w-lg">
            Professional YouTube Thumbnail and Graphic Designer.
            Creating eye-catching thumbnails that increase CTR
            and help creators grow their channels.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start">

            <a
              href="https://www.instagram.com/designer_vinay"
              target="_blank"
              className="p-3 bg-gray-100 rounded-full hover:bg-pink-100 hover:scale-110 transition duration-300 shadow-sm"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://www.youtube.com/@vinaycreations5167"
              target="_blank"
              className="p-3 bg-gray-100 rounded-full hover:bg-red-100 hover:scale-110 transition duration-300 shadow-sm"
            >
              <Youtube size={20} />
            </a>

          </div>

          {/* Portfolio Button */}
          <Link href="/gallery">
            <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition duration-300">
              View Portfolio
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}