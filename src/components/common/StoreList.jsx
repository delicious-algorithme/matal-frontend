import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
import { ReactComponent as SearchIcon } from './../../assets/Icon/Feather Icon.svg';
import StoreCard from './StoreCard';
import { ReactComponent as SortReview } from '../../assets/Icon/ReviewSort.svg';
import { ReactComponent as SortPositive } from '../../assets/Icon/SortPositive.svg';
const item = [1, 2, 3, 4, 5]; //임시 데이터
const StoreList = () => {
    const onClickHandler = () => {
        //...
    };
    return (
        <StoreListLayout>
            <SearchBarBox>
                <Icon>
                    <SearchIcon />
                </Icon>
                <input type="text" placeholder="Search..." />
            </SearchBarBox>
            <SortBox>
                <p>정렬</p>
                <button>
                    <SortReview />
                    리뷰순
                </button>
                <button>
                    <SortPositive />
                    긍정 비율 순
                </button>
            </SortBox>
            {item.map((item) => {
                return <StoreCard onClick={onClickHandler} key={item} />;
            })}
        </StoreListLayout>
    );
};
export default StoreList;
const StoreListLayout = styled.div`
    position: relative;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: ${White};
    overflow: visible;
`;
const SearchBarBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 30px;
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
        padding-right: 20px;
        font-size: 16px;
        color: ${Orange};
    }
    input::placeholder {
        color: ${Orange};
    }
    @media screen and (max-width: 1024px) {
        margin-left: 20px;
    }
`;
const Icon = styled.div`
    position: absolute;
    z-index: 2;
    padding: 10px 20px;
`;

const SortBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px;
    & > button {
        cursor: pointer;
        display: flex;
        gap: 10px;
        background-color: ${White};
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 5px;
        border: 1px solid ${Grey};
        border-radius: 20px;
        &:hover {
            color: ${Orange};
        }
    }
`;
