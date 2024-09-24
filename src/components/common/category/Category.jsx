import styled from 'styled-components';
import { Orange } from '../../../color';
import { White } from '../../../color';
import { useNavigate } from 'react-router-dom';
import { useIsFirst } from '../../../store';
import { items } from './CategoryItems';

const Category = (position) => {
    const navigate = useNavigate();
    const { setIsFirst } = useIsFirst();
    const onClickHandler = (item) => {
        setIsFirst();
        navigate(`/webmap/storeList/${item}`, {
            state: {
                listVisible: true,
                category: `${item}`,
            },
        }); //임시 경로
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
