"use client";

import { useState, useEffect } from "react";
import * as cheerio from "cheerio";
import Image from "next/image";
import CloseIconSvg from "@/components/Icons/CloseIconSvg";

export default function MoviePopup({ imdbID, onClose }) {
  const [movieData, setMovieData] = useState("");
  const [trailerLink, setTrailerLink] = useState("");

  useEffect(() => {
    console.log(imdbID);
    getMovieData();
    getTrailerLink();
  }, []);

  const getMovieData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
      const response = await fetch(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
      );
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  const getTrailerLink = async () => {
    try {
      const response = await fetch(
        `https://www.imdb.com/title/${imdbID}/videogallery`
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      const trailerLink = $('[data-testid="videos-slate-overlay-1"]').attr(
        "href"
      );
      return trailerLink ? `https://www.imdb.com${trailerLink}` : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-[#181818] rounded-lg p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-0 mr-2 mt-2 text-gray-600 hover:text-gray-100"
          onClick={onClose}
        >
          <CloseIconSvg />
        </button>
        <div className="mb-4">
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            {movieData.Trailer ? (
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={movieData.Trailer}
                title={movieData.Title}
                allowFullScreen
              ></iframe>
            ) : (
              <Image
                src={movieData.Poster}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
                alt={movieData.Title}
              ></Image>
            )}
          </div>
        </div>
        <h2 className="text-2xl text-white font-bold mb-2">
          {movieData.Title}
        </h2>
        <p className="text-gray-200">{movieData.Plot}</p>
      </div>
    </div>
  );
}
