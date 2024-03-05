"use client";

import { useEffect, useState } from "react";
import FeaturedMovie from "@/components/FeaturedMovie/page";
import MovieItemLandscape from "@/components/MovieItemLandscape/page";
import MovieItemPortrait from "@/components/MovieItemPortrait/page";
import MoviePopup from "@/components/MoviePopup/page";

// SwiperJs
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";

export default function Home() {
  const [featuredMovies, setFeaturedMovies] = useState(null);
  const [latestMovies, setLatestMovies] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Set how many movies to show
        const minimumFeaturedMovies = 4;
        const minimumLatestMovies = 8;
        const minimumPopularMovies = 10;
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

        const fetchFeaturedMovies = fetch(
          `http://www.omdbapi.com/?s=Avengers&apikey=${apiKey}`
        );
        const fetchLatestMovies = fetch(
          `http://www.omdbapi.com/?s=new&apikey=${apiKey}`
        );
        const fetchPopularMovies = fetch(
          `http://www.omdbapi.com/?s=Justice_League&apikey=${apiKey}`
        );

        const [featuredResponse, latestResponse, popularResponse] =
          await Promise.all([
            fetchFeaturedMovies,
            fetchLatestMovies,
            fetchPopularMovies,
          ]);

        const getRandomMovies = async (response, count) => {
          const data = await response.json();
          const movies = data.Search || [];
          const selectedMovies = [];
          while (selectedMovies.length < count && movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            selectedMovies.push(movies.splice(randomIndex, 1)[0]);
          }
          return selectedMovies;
        };

        const featured = await getRandomMovies(
          featuredResponse,
          minimumFeaturedMovies
        );
        const latest = await getRandomMovies(
          latestResponse,
          minimumLatestMovies
        );
        const popular = await getRandomMovies(
          popularResponse,
          minimumPopularMovies
        );

        setFeaturedMovies(featured);
        setLatestMovies(latest);
        setPopularMovies(popular);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const openPopup = (imdbID) => {
    setSelectedVideoId(imdbID);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedVideoId(null);
    setShowPopup(false);
  };

  return (
    <main className="flex flex-col gap-12">
      {featuredMovies && (
        <div className="mt-8 px-6 md:px-14">
          <Swiper
            modules={[Navigation, Pagination]}
            centeredSlides={true}
            speed="1000"
            loop="true"
            pagination={true}
            slidesPerView={"auto"}
            spaceBetween="5"
          >
            {featuredMovies.map((movie, index) => (
              <SwiperSlide
                key={index}
                className="w-full md:w-4/5"
                onClick={() => openPopup(movie.imdbID)}
              >
                <FeaturedMovie {...movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {latestMovies && (
        <section className="px-6 md:px-14">
          <Swiper
            modules={[FreeMode]}
            speed="1000"
            freeMode={true}
            slidesPerView="2"
            spaceBetween="5"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1366: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {latestMovies.map((movie, index) => (
              <SwiperSlide key={index} onClick={() => openPopup(movie.imdbID)}>
                <MovieItemLandscape {...movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {popularMovies && (
        <section>
          <div className="px-6 md:px-14">
            <Swiper
              modules={[FreeMode]}
              speed="500"
              freeMode={true}
              slidesPerView="2"
              spaceBetween="0"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: "5",
                  spaceBetween: 10,
                },
                1366: {
                  slidesPerView: "auto",
                  spaceBetween: 10,
                },
              }}
            >
              {popularMovies.map((movie, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => openPopup(movie.imdbID)}
                >
                  <MovieItemPortrait {...movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {showPopup && (
        <MoviePopup imdbID={selectedVideoId} onClose={closePopup} />
      )}
    </main>
  );
}
