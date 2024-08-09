import styled from 'styled-components';
import { Orange } from '../../color';
import { White } from '../../color';
const items = [
    '냉면',
    '파스타',
    '삼겹살',
    '스테이크',
    '초밥',
    '떡볶이',
    '빵',
    '부대찌개',
    '돈까스',
    '수제햄버거',
    '짜장면',
    '마라탕',
    '김치찌개',
    '덮밥',
];

const Category = () => {
    return (
        <CategoryLayout>
            {items.map((item) => {
                return <div>{item}</div>;
            })}
        </CategoryLayout>
    );
};

export default Category;

const CategoryLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 30px;
    & > div {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        min-width: 90px;
        height: 50px;
        border-radius: 100px;
        color: ${Orange};
        border: 1px solid ${Orange};
        cursor: pointer;
        &:hover {
            background-color: ${Orange};
            color: ${White};
        }
    }
`;
