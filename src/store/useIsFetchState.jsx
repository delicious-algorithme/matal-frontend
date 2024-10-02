import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialIsFetch = true;

const useIsFetch = create(
    persist(
        (set) => ({
            isFetchAll: initialIsFetch,
            setIsFetchAll: (state) => {
                set({ isFetchAll: state });
            },
        }),
        { name: 'is-fetch' }
    )
);

export default useIsFetch;
