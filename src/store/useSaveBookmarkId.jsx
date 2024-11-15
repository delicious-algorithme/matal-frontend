import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialStoreId = [];

const useSaveBookmarkId = create(
    persist(
        (set) => ({
            savedStoreId: initialStoreId,
            setSaveStoreId: (storeId) => {
                set({ savedStoreId: storeId });
            },
        }),
        { name: 'saved-storeId' }
    )
);

export default useSaveBookmarkId;
