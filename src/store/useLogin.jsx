import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLogin = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            setLogin: (userInfo) => set({ isLoggedIn: true, user: userInfo }),
            setLogout: () => set({ isLoggedIn: false, user: null }),
        }),
        { name: 'auth' }
    )
);

export default useLogin;
