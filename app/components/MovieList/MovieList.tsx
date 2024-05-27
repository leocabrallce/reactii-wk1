"use client";
import { useState, useEffect } from "react";
import Movie from "@/app/components/Movie";
import Search from "@/app/components/Search";
import MovieType from "@/app/types/Movie";

type Props = {
  movies: MovieType[];
};

function MovieList({ movies }: Props) {
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>(movies);
  const [search, setSearch] = useState<string>("");
  const [filterBySeen, setFilterBySeen] = useState<boolean>(false);

  // use localstorage to persist seen movies
  const [seenMovies, setSeenMovies] = useState<MovieType[]>(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("seenMovies");
      return data ? JSON.parse(data) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("seenMovies", JSON.stringify(seenMovies));
  }, [seenMovies]);

  useEffect(() => {
    const result = movies.filter((movie) => {
      const searchPassed: boolean = movie.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const wasSeen = seenMovies.some((seenMovie) => seenMovie.id === movie.id);
      const seenPassed: boolean = filterBySeen ? wasSeen : true;

      return searchPassed && seenPassed;
    });
    setFilteredMovies(result);
  }, [movies, search, seenMovies, filterBySeen]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col mt-8 gap-4 items-center justify-center">
        <Search search={search} onSearch={setSearch} />

        <div className="flex items-center justify-center">
          <input
            id="filter-by-seen"
            name="filter-by-seen"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={filterBySeen}
            onChange={() => setFilterBySeen(!filterBySeen)}
          />
          <label
            htmlFor="filter-by-seen"
            className="ml-2 font-medium text-gray-600"
          >
            Filter by seen
          </label>

          <button
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
            onClick={() => setSeenMovies([])}
          >
            Reset seen
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {filteredMovies.map((movie, index) => (
          <Movie
            key={movie.id}
            movie={movie}
            index={index}
            seenMovies={seenMovies}
            setSeenMovies={setSeenMovies}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
