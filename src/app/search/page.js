"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MovieItemPortrait from "@/components/MovieItemPortrait/page";
import MoviePopup from "@/components/MoviePopup/page";

export default function Page() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("s");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

        if (search) {
          const response = await fetch(
            `http://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${apiKey}`
          );
          const data = await response.json();
          setSearchResults(data.Search || []);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [search]);

  const openPopup = (imdbID) => {
    setSelectedVideoId(imdbID);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedVideoId(null);
    setShowPopup(false);
  };

  return (
    <div className="mx-auto px-14">
      <Suspense>
        <h1 className="text-3xl font-bold mt-8 mb-4 text-white">
          Search Results for &quot;{search}&quot;
        </h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {searchResults.map((result, index) => (
            <MovieItemPortrait
              onClick={() => openPopup(result.imdbID)}
              key={index}
              {...result}
            />
          ))}
        </div>
      </Suspense>

      {showPopup && (
        <MoviePopup imdbID={selectedVideoId} onClose={closePopup} />
      )}
    </div>
  );
}
