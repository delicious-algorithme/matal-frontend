import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정

const useIsFirst = create(
    persist(
        (set) => ({
            isFirst: false, // 초기 상태 값 설정
            setIsFirst: () => {
                set({ isFirst: true }); // 상태 업데이트 로직 수정
            },
            setNotIsFirst: () => {
                set({ isFirst: false }); // 상태 업데이트 로직 수정
            },
        }),
        { name: 'isFirst' }
    )
);

export default useIsFirst;
