import { NextRequest, NextResponse } from "next/server";
import MovieType from "@/app/types/Movie";

const API_URL = process.env.MOVIES_API_URL as string;

type GetParams = {
  params: {
    id: string;
  };
};

// TODO: Extract this function to a shared file and handle errors
async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

export async function GET(req: NextRequest, { params }: GetParams) {
  const id = Number(params.id);
  const data = await fetcher<MovieType[]>(API_URL);
  const movieWithIds: MovieType[] = data.map((movie, index) => ({ ...movie, id: index + 1 }));

  const movie = movieWithIds.find((movie) => movie.id === id);

  if (!movie) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(movie, { status: 200 });
}