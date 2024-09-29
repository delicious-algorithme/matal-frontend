import create from 'zustand';
import { persist } from 'zustand/middleware';

const initialStoreDetail = {};

const useStoreDetail = create(
    persist(
        (set) => ({
            storeDetail: initialStoreDetail,
            isStoreDetailPage: false,
            setStoreDetail: (store) => {
                set({ storeDetail: store });
            },
            toggleStoreDetailPage: () => set((state) => ({ isStoreDetailPage: !state.isStoreDetailPage })), // 상태 업데이트 로직 수정
        }),
        { name: 'store-detail' }
    )
);

export default useStoreDetail;
