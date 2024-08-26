import create from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 상태 값 설정
const initialStoreList = [];

const useStoreList = create(
    persist(
        (set) => ({
            storeList: initialStoreList, // 초기 상태 값 설정
            setStoreList: (stores) => {
                set({ storeList: stores }); // 상태 업데이트 로직 수정
            },
        }),
        { name: 'store-list' }
    )
);

export default useStoreList;
