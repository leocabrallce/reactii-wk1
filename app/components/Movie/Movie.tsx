import MovieType from "@/app/types/Movie";
import Image from "next/image";
import { Link } from "next-view-transitions";

type Props = {
  movie: MovieType;
  index: number;
  seenMovies: MovieType[];
  setSeenMovies: (movies: MovieType[]) => void;
};

function Movie({ movie, index, seenMovies, setSeenMovies }: Props) {
  const handleSeen = () => {
    if (seenMovies.some((seenMovie) => seenMovie.id === movie.id)) {
      setSeenMovies(seenMovies.filter((seenMovie) => seenMovie.id !== movie.id));
    } else {
      setSeenMovies([...seenMovies, movie]);
    }
  };

  return (
    <div>
      <div className="mb-4 relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id={`seen-${movie.id}`}
            name={`seen-${movie.id}`}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={seenMovies.some((seenMovie) => seenMovie.id === movie.id)}
            onChange={handleSeen}
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={`seen-${movie.id}`} className="font-medium text-gray-600">
            Seen
          </label>
        </div>
      </div>
      <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
        <article className="flex flex-col items-start">
          <div className="relative w-full">
            <div
              style={{ viewTransitionName: `image-transition-${movie.id}` }}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <Image
                // in a real world scenario, probably would be better to display smaller images
                // src={movie.thumb_url}
                src={movie.image_url}
                alt={`Thumbnail for ${movie.name}`}
                width={320}
                height={180}
                // priority is set to true for the first 3 images (above the fold area)
                priority={index <= 3}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={new Date(movie.year).getFullYear().toString()}
                    >
                      {movie.year}
                    </time>
                    {movie.genre.map((genre) => (
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 transition">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <span className="absolute inset-0" />
                  Rating: {movie.rating}
                </h3>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="max-w-xl">
            <div className="mt-8 relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-cyan-600 transition">
                <span className="absolute inset-0" />
                {movie.name}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {movie.desc}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default Movie;
