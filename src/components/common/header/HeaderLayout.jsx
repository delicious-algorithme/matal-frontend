import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default HeaderLayout;
