import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "myListStorage",
  storage: localStorage,
});

export interface MyListItem {
  id: number;
  title: string;
  posterPath: string;
  mediaType: "movie" | "series";
}

export const myListState = atom<MyListItem[]>({
  key: "myList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
