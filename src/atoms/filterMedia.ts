import { atom } from "recoil";

export type MediaType = "movies" | "series";
export type MediaTypeWithHome = MediaType | "home";
export type FilterCategory = "all" | "mustWatch" | "trending" | "popular";

export const moviesFilterState = atom<FilterCategory>({
  key: "moviesFilterState",
  default: "all",
});

export const seriesFilterState = atom<FilterCategory>({
  key: "seriesFilterState",
  default: "all",
});

export const homeFilterState = atom<FilterCategory>({
  key: "homeFilter",
  default: "all",
});

//jetflix
