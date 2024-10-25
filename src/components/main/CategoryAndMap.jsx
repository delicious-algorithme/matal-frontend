import styled from 'styled-components';
import { Category } from '../common';
import { MyMap } from '../common';
import { Grey } from '../../color';
import { ReactComponent as CategoryIcon } from '../../assets/Icon/main/CategoryIcon.svg';

const CategoryAndMap = () => {
    return (
        <CategoryAndMapLayout>
            <label>
                <CategoryIcon />
                <h3>카테고리로 검색하기</h3>
            </label>
            <CategoryAndMapBox>
                <div>
                    <Category />
                </div>
                <div>
                    <MyMap />
                </div>
            </CategoryAndMapBox>
        </CategoryAndMapLayout>
    );
};

export default CategoryAndMap;

const CategoryAndMapLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    gap: 20px;
    & > label {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    @media screen and (max-width: 1024px) {
        align-items: center;
    }
`;

const CategoryAndMapBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;

    & > div {
        width: 40%;
        height: 500px;
        overflow: scroll;
        border-radius: 20px;
        box-shadow: 2px 2px 2px ${Grey};
    }
    :first-child {
        padding: 20px;
    }
    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > div {
            width: 80%;
        }
    }
`;
