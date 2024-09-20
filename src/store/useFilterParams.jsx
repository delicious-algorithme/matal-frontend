import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정
const initialFilterParams = {};

const useFilterParams = create(
    persist(
        (set) => ({
            filterParams: initialFilterParams, // 초기 상태 값 설정
            setFilterParams: (params) => {
                set({ filterParams: params }); // 상태 업데이트 로직 수정
            },
        }),
        { name: 'store-list' }
    )
);

export default useFilterParams;
