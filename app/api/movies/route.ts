import { NextRequest, NextResponse } from "next/server";
import MovieType from "@/app/types/Movie";

const API_URL = process.env.MOVIES_API_URL as string;

// TODO: Extract this function to a shared file and handle errors
async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

export async function GET(req: NextRequest) {
  const data = await fetcher<MovieType[]>(API_URL);
  const movieWithIds = data.map((movie, index) => ({
    ...movie,
    id: index + 1,
  }));
  const reorderedMovies = movieWithIds.sort((a, b) => a.rating - b.rating);

  return NextResponse.json(reorderedMovies, { status: 200 });
}
