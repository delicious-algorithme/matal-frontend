import styled from 'styled-components';
import { Category, MyMap } from '../common';
import tagIcon from '../../assets/Icon/tag.svg';
import { Grey } from '../../color';

const CategoryAndMap = () => {
    return (
        <CategoryAndMapLayout>
            <label>
                <img src={tagIcon} alt="feater-icon" />
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
        & > p {
            flex-wrap: nowrap;
        }
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        align-items: center;
    }
`;

const CategoryAndMapBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 50px;

    & > div {
        width: 50%;
        height: 500px;
        overflow-y: auto;
        border-radius: 20px;
        box-shadow: 2px 2px 2px ${Grey};

        &::-webkit-scrollbar {
            width: 5px;
            height: auto;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(217, 217, 217, 1);
            border-radius: 15px;
            width: 5px;
        }
    }

    :first-child {
        padding: 20px;
    }

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > div {
            width: 95%;
        }
    }
`;
