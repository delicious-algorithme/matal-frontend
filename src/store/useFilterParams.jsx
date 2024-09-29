import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정
const initialFilterParams = {
    category: [],
    addresses: [],
    positiveKeyword: [],
};

const useFilterParams = create(
    persist(
        (set) => ({
            filterParams: initialFilterParams, // 초기 상태 값 설정
            setFilterParams: (params) => {
                set(
                    { filterParams: params }
                    // 기존 상태와 병합
                );
            },
            resetFilterParams: () => {
                set({ filterParams: initialFilterParams }); // 상태 초기화
            },
        }),
        { name: 'filter-params' }
    )
);

export default useFilterParams;
