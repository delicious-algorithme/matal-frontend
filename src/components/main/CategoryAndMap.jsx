import styled from 'styled-components';
import { Category, MyMap } from '../common';
import { Grey } from '../../color';

const CategoryAndMap = () => {
    return (
        <CategoryAndMapLayout>
            <label>
                <img
                    src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F3e54984f-c8a7-47cf-a649-d34c9c52c200%2Fflowbite_tag-solid.svg?table=block&id=adec29ff-2727-42b8-837e-0329b87daafc&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                    alt="feater-icon"
                />
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
