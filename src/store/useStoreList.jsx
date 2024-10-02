import create from 'zustand';
import { persist } from 'zustand/middleware';


const initialStoreList = [];

const useStoreList = create(
    persist(
        (set) => ({
            storeList: initialStoreList, 
            setStoreList: (stores) => {
                set({ storeList: stores }); 
            },
        }),
        { name: 'store-list' }
    )
);

export default useStoreList;
