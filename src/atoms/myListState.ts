import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "myListStorage",
  storage: localStorage,
});

export interface MyListItem {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  mediaType: "movies" | "series";
}

export const myListState = atom<MyListItem[]>({
  key: "myList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//jetflix
