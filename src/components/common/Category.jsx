import styled from 'styled-components';
import { Orange } from '../../color';
import { White } from '../../color';
import { useNavigate } from 'react-router-dom';
const items = [
    '한정식',
    '일식당',
    '양식',
    '중식당',
    '카페,디저트',
    '베이커리',
    '칼국수,만두',
    '냉면',
    '기사식당',
    '한식',
    '백반,가정식',
    '생선구이',
    '육류,고기요리',
    '두부요리',
    '국밥',
    '주꾸미요리',
    '정육식당',
    '보리밥',
    '요리주점',
    '찌개,전골',
    '닭갈비',
    '맥주,호프',
    '인도음식',
    '카레',
    '초밥,롤',
    '돈가스',
    '떡볶이',
    '종합분식',
    '조개요리',
    '일본식라면',
    '덮밥',
    '베트남음식',
    '양꼬치',
    '생선회',
    '순대,순댓국',
    '샤브샤브',
    '이탈리아음식',
    '스파게티,파스타전문',
    '이자카야',
    '돼지고기구이',
    '태국음식',
    '아시아음식',
];

const Category = (position) => {
    const navigate = useNavigate();
    const onClickHandler = (item) => {
        navigate(`/webmap/storeList/${item}`, { state: { listVisible: true } }); //임시 경로
    };
    return (
        <CategoryLayout position={position}>
            {items.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        onClick={() => {
                            onClickHandler(item);
                        }}
                    >
                        {item}
                    </div>
                );
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
    overflow-y: scroll;
    padding-bottom: 100px;
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
