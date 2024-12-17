import { atom } from "recoil";

export type MediaType = "movies" | "series" | "home";
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

export const homeFilterState = atom<FilterCategory>({
  key: "homeFilter",
  default: "all",
});

//jetflix
