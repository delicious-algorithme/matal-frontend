import styled from 'styled-components';
import { items } from './FilteringItems';
import { useState } from 'react';
import { DartkGrey, Grey, Orange } from '../../../color';
import { ReactComponent as ArrowDown } from '../../../assets/Icon/FilterArrowDown.svg';

const Filtering = () => {
    const [select, setSelect] = useState(items);
    const [selectState, setSelectState] = useState(new Array(11).fill(false));
    const valueClickHandler = (id, content) => {
        let newSelectState = [...selectState];
        newSelectState[id] = !selectState[id];
        setSelectState(newSelectState);
        let newSelect = [...select];
        newSelect[id - 1].category = content;
        setSelect(newSelect);
    };
    const CategoryClickHandler = (categoryId) => {
        let newSelectState = [...selectState];
        newSelectState[categoryId] = !selectState[categoryId];
        setSelectState(newSelectState);
    };
    return (
        <SelectLayout>
            <div>
                {select &&
                    select.map((item) => {
                        return (
                            <SelectBox key={item.key}>
                                <SelectItem>
                                    <CategoryBox
                                        onClick={() => {
                                            CategoryClickHandler(item.id);
                                        }}
                                    >
                                        <p>{item.category}</p>
                                        <ArrowDown />
                                    </CategoryBox>
                                    {selectState[item.id] && (
                                        <div>
                                            <ul>
                                                {item.contents &&
                                                    item.contents.map((content) => {
                                                        return (
                                                            <li
                                                                key={item.key}
                                                                onClick={() => valueClickHandler(item.id, content)}
                                                            >
                                                                {content}
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                    )}
                                </SelectItem>
                            </SelectBox>
                        );
                    })}
            </div>
        </SelectLayout>
    );
};

export default Filtering;

const SelectLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    & > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
`;
const SelectBox = styled.div`
    display: flex;
    height: auto;
`;
const CategoryBox = styled.div`
    cursor: pointer;
    &:hover {
        color: ${Orange};
    }
`;
const SelectItem = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > div {
        display: flex;
        flex-direction: row;
        gap: 30px;
        align-items: center;
        justify-content: space-between;
        width: 110px;
        font-size: 13px;
        overflow: scroll;
        border: 1px solid ${Grey};
        border-radius: 10px;
        padding: 10px;
        font-weight: bold;
        color: ${DartkGrey};
        & > p {
            width: 100%;
        }
        & > ul > li {
            list-style-type: none;
            &:hover {
                color: ${Orange};
                font-weight: bold;
            }
        }
        & > ul {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
`;
