import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialFilterParams = {
    category: [],
    addresses: [],
    positiveKeyword: [],
};

const useFilterParams = create(
    persist(
        (set) => ({
            filterParams: initialFilterParams,
            setFilterParams: (params) => {
                set({ filterParams: params });
            },
            resetFilterParams: () => {
                set({ filterParams: initialFilterParams });
            },
        }),
        { name: 'filter-params' }
    )
);

export default useFilterParams;
