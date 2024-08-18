import styled from 'styled-components';
import { Orange, White } from '../../color';
import { ReactComponent as HomeIcon } from '../../assets/Icon/Home.svg';
import { ReactComponent as CategoryIcon } from '../../assets/Icon/Category.svg';
const MobileNav = () => {
    return (
        <MobileNavLayout>
            <HomeNav>
                <HomeIcon />
            </HomeNav>
            <CategoryNav>
                <CategoryIcon />
            </CategoryNav>
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
`;
const CategoryNav = styled.div`
    margin-right: 20px;
`;
