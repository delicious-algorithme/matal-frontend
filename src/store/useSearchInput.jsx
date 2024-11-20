import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialSearchInput = '';

const useSearchInput = create(
    persist(
        (set) => ({
            searchInput: initialSearchInput,
            setSearchInput: (input) => {
                set({ searchInput: input });
            },
        }),
        { name: 'searchInput' }
    )
);

export default useSearchInput;
