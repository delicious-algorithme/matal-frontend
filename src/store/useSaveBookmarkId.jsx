import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialBookmarkId = [];

const useSaveBookmarkId = create(
    persist(
        (set) => ({
            savedId: initialBookmarkId,
            setSaveBookmarkId: (data) => {
                set({ savedId: data });
            },
            savedStores: [],
            setBookmarkStore: (stores) => {
                set({ savedStores: stores });
            },
        }),
        { name: 'saved-bookmarkId' }
    )
);

export default useSaveBookmarkId;
