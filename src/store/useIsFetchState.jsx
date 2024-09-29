import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정
const initialIsFetch = true;

const useIsFetch = create(
    persist(
        (set) => ({
            isFetchAll: initialIsFetch, // 초기 상태 값 설정
            setIsFetchAll: (state) => {
                set({ isFetchAll: state }); // 상태 업데이트 로직 수정
            },
        }),
        { name: 'is-fetch' }
    )
);

export default useIsFetch;
