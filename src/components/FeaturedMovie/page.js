"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function FeaturedMovie({
  Poster,
  Title,
  Plot,
  Type,
  Year,
  imdbID,
}) {
  const [moviePlot, setMoviePlot] = useState(null);

  useEffect(() => {
    const getMoviePlot = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const response = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        );
        const { Plot } = await response.json();
        setMoviePlot(Plot);
      } catch (error) {
        console.error("Error fetching movie plot:", error);
        return null;
      }
    };

    getMoviePlot();
  }, []);

  return (
    <div className="flex flex-row rounded-3xl bg-[#191919] overflow-hidden mx-0 md:mx-14 max-h-60 md:max-h-96 cursor-pointer">
      <Image
        src={Poster}
        width={300}
        height={300}
        className="w-1/2"
        alt={Title}
      />
      <div className="flex flex-col p-4 md:p-8 w-1/2">
        <div className="text-xl md:text-3xl text-white">{Title}</div>
        <div className="text-sm md:text-base lg:text-lg md:mt-3 text-gray-400 overflow-hidden">
          {moviePlot}
        </div>
      </div>
    </div>
  );
}
