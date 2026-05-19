import { create } from "zustand";

type FavoritesStore = {
    favoritesIds: string[];

    toggleFavorite: (id: string) => void;

    isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>(
    (set, get) => ({
        favoritesIds: [],

        toggleFavorite: (id: string) => {
            const favorites = get().favoritesIds;

            const alreadyExists = favorites.includes(id);

            if (alreadyExists) {
                set({
                    favoritesIds: favorites.filter((favId) => favId !== id),
                });
            } else {
                set({
                    favoritesIds: [...favorites, id],
                });
            }
        },

        isFavorite: (id: string) => {
            return get().favoritesIds.includes(id);
        }
    })
);