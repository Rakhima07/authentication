import { create } from "zustand";
import { IProfile, IUser } from "../types";

interface UserState {
  user: IUser | null;
  profile: IProfile | null;
  setUser: (user: IUser) => void;
  setProfile: (profile: IProfile) => void;
  clearUser: () => void;
}

const getInitialData = (): IUser | null => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
};

const getInitialProfile = (): IProfile | null => {
  const saved = localStorage.getItem("profile");
  return saved ? JSON.parse(saved) : null;
};

export const useAuthStore = create<UserState>((set) => ({
  user: getInitialData(),
  profile: getInitialProfile(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setProfile: (profile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
    set({ profile });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    set({ user: null, profile: null });
  },
}));
