import styled from 'styled-components';
import { LightGrey, Orange, White } from '../../color';
import { ReactComponent as SearchIcon } from './../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';

const item = [1, 2, 3, 4, 5];
const StoreList = () => {
    return (
        <StoreListLayout>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input type="text" placeholder="Search..." />
            </SearchBarBox>
            {item.map((item) => {
                return <StoreCard key={item} />;
            })}
        </StoreListLayout>
    );
};
export default StoreList;
const StoreListLayout = styled.div``;
const SearchBarBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 200px;
    display: flex;
    gap: 30px;
    text-align: left;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    & > input {
        flex: 1 1 auto;
        height: 45px;
        border-radius: 30px;
        border: 1px solid ${Orange};
        z-index: 1;
        padding-left: 50px;
        font-size: 16px;
        color: ${Orange};
    }
    input::placeholder {
        color: ${Orange};
    }
`;
const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 20px;
`;
