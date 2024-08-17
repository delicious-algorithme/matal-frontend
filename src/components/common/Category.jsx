import styled from 'styled-components';
import { Orange } from '../../color';
import { White } from '../../color';
import { useNavigate } from 'react-router-dom';
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

const Category = (position) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate('/webmap/storeList/:${id}');
    };
    return (
        <CategoryLayout position={position}>
            {items.map((item) => {
                return <div onClick={onClickHandler}>{item}</div>;
            })}
        </CategoryLayout>
    );
};

export default Category;

const CategoryLayout = styled.div`
    display: flex;
    position: ${(props) => props.position};
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    //margin-left: 30px;*/
    & > div {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        //min-width: 86px;
        height: 50px;
        padding: 20px;
        border-radius: 100px;
        color: ${Orange};
        border: 1px solid ${Orange};
        cursor: pointer;
        &:hover {
            background-color: ${Orange};
            color: ${White};
        }
        @media screen and (max-width: 800px) {
            & > div {
                display: flex;
                flex-direction: row;
            }
        }
    }
`;
