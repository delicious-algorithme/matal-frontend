import styled from 'styled-components';
import { Category, MyMap } from '../../common';
import tagIcon from '../../../assets/Icon/tag.svg';
import { Grey } from '../../../color';

const CategoryAndMap = () => {
    return (
        <CategoryAndMapLayout>
            <label>
                <h3>카테고리로 검색하기</h3>
                <img src={tagIcon} alt="tag-icon" width="20px" />
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
    width: 80%;
    max-width: 1120px;
    min-height: 580px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;

    & > label {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        gap: 10px;

        & > p {
            flex-wrap: nowrap;
        }
    }

    @media screen and (max-width: 768px) {
        width: 80%;
        margin-top: 0px;
        min-height: 1100px;
        align-items: flex-start;

        & > label > h3 {
            margin-left: 10px;
            font-size: 16px;
        }
    }

    @media screen and (max-width: 500px) {
        width: 100%;
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
