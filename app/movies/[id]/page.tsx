import React from "react";
import type { Metadata } from "next";
import Movie from "@/app/types/Movie";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

type PageProps = Readonly<{
  params: {
    id: string;
  };
}>;

async function getMovie(id: number): Promise<Movie> {
  const url = new URL(`/api/movies/${id}`, APP_URL).toString();
  const result = await fetch(url);

  // TODO: Improve error handling, differentiating between 404 and other errors
  if (!result.ok) {
    notFound();
  }

  return result.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = Number(params.id);
  const movie = await getMovie(id);

  return {
    title: movie.name,
    description: movie.desc,
  };
}

type Props = {
  params: {
    id: string;
  };
};

async function MoviesIdPage({ params }: Props) {
  const id = Number(params.id);
  const movie = await getMovie(id);

  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-start justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {movie.name}
            </h1>
            <div style={{ viewTransitionName: `image-transition-${movie.id}` }}>
              <Image
                // custom attribute to be used in the transition
                data-movie-id={movie.id}
                src={movie.image_url}
                alt={`Thumbnail for ${movie.name}`}
                width={1344}
                height={1104}
                className="movie-transition mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
              />
            </div>
          </div>
          <div className="lg:mt-24 w-full lg:max-w-xl lg:flex-auto">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              Description
            </h2>
            <p className="mt-4 text-base leading-6 text-gray-600">
              {movie.desc}
            </p>

            <div className="mt-8 flex border-t border-gray-100 pt-8">
              <Link
                href="/"
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                View all movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MoviesIdPage;
