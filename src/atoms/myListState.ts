import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "myListStorage",
  storage: localStorage,
});

interface BaseMyListItem {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieMyListItem extends BaseMyListItem {
  title: string;
  release_date: string;
  mediaType: "movies";
}

interface SeriesMyListItem extends BaseMyListItem {
  name: string;
  first_air_date: string;
  mediaType: "series";
}

export type MyListItem = MovieMyListItem | SeriesMyListItem;

export const myListState = atom<MyListItem[]>({
  key: "myList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// export interface MyListItem {
//   id: number;
//   title: string;
//   name: string;
//   poster_path: string;
//   backdrop_path: string;
//   overview: string;
//   release_date?: string;
//   first_air_date?: string;
//   vote_average: number;
//   genre_ids: number[];
//   mediaType: "movies" | "series";
// }

//jetflix
