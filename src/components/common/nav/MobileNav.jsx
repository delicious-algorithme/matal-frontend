import styled from 'styled-components';
import { Orange, White } from '../../../color';
import { ReactComponent as HomeIcon } from '../../../assets/Icon/Home.svg';
import { useNavigate } from 'react-router-dom';
const MobileNav = () => {
    const navigate = useNavigate();
    const homeNavClickHandler = () => {
        navigate('/');
    };

    return (
        <MobileNavLayout>
            <HomeNav onClick={homeNavClickHandler}>
                <HomeIcon />
            </HomeNav>
        </MobileNavLayout>
    );
};
export default MobileNav;

const MobileNavLayout = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    z-index: 100;
    bottom: 0px;
    width: 100%;
    border-top: 2px solid ${Orange};
    justify-content: space-between;
    align-items: center;
    height: 75px;
    background-color: ${White};
    & > div {
        width: 30px;
        height: auto;
    }
    @media screen and (min-width: 1024px) {
        display: none;
    }
`;
const HomeNav = styled.div`
    margin-left: 20px;
    cursor: pointer;
`;
