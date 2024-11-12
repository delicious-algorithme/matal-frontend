import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLogin = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,

            setLogin: (email) => {
                const users = JSON.parse(localStorage.getItem('users')) || {};
                const userInfo = users[email];

                if (userInfo) {
                    set({ isLoggedIn: true, user: userInfo });
                } else {
                    console.error('유저 정보를 찾을 수 없습니다.');
                }
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
