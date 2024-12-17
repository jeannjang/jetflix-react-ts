import { atom } from "recoil";

export type MediaType = "movies" | "series";
export type FilterCategory =
  | "all"
  | "mustWatch"
  | "trending"
  | "popular"
  | null;

export const mediaFilterState = (mediaType: MediaType) =>
  atom<FilterCategory>({
    key: `${mediaType}Filter`,
    default: "all",
  });

//jetflix
