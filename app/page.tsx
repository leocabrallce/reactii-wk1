import type { Metadata } from "next";
import MovieType from "@/app/types/Movie";
import MovieList from "@/app/components/MovieList";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const metadata: Metadata = {
  title: "Movies home",
  description: "An awesome list of movies!",
};

async function getMovies(): Promise<MovieType[]> {
  const url = new URL("/api/movies", APP_URL).toString();
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await result.json();
}

export default async function Home() {
  const movies = await getMovies();
  console.log(movies);
  return (
    <main className="px-8 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Movie list
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Rendered using SSR + View Transitions API in Next.js
          </p>
        </div>

        <MovieList movies={movies} />
      </div>
    </main>
  );
}
