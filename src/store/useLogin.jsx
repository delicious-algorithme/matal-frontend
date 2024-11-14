import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLogin = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            setLogin: (email) => {
                set({ isLoggedIn: true, user: email });
            },
            setLogout: () => {
                set({ isLoggedIn: false, user: null });
            },
        }),
        {
            name: 'auth',
            getStorage: () => localStorage,
            serialize: (state) => JSON.stringify(state),
            deserialize: (str) => JSON.parse(str),
        }
    )
);

export default useLogin;
