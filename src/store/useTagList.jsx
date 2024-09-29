import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정
const initialTagList = [];

const useTagList = create(
    persist(
        (set) => ({
            tagList: initialTagList, // 초기 상태 값 설정
            setTagList: (tags) => {
                set({ tagList: tags }); // 상태 업데이트 로직 수정
            },
        }),
        { name: 'tag' }
    )
);

export default useTagList;
