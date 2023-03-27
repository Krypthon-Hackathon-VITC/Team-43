import { User } from "types/user";
import { create } from "zustand";

type UseStore = {
  user: User | null;
  isCreator: boolean;
  setMyProfile: (user: User, cb: () => void) => void;
};

export const useStore = create<UseStore>((set) => ({
  user: null,
  isCreator: false,
  setMyProfile: ({ ...rest }, cb) => {
    if (rest && rest.username) {
      set({ user: { ...rest }, isCreator: rest.channelName !== "" });
    }

    cb();
  },
}));
