import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialTagList = [];

const useTagList = create(
    persist(
        (set) => ({
            tagList: initialTagList,
            setTagList: (tags) => {
                set({ tagList: tags });
            },
        }),
        { name: 'tag' }
    )
);

export default useTagList;
