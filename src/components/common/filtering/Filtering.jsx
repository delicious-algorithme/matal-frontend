import styled from 'styled-components';
import { items } from './FilteringItems';
import { useState, useEffect } from 'react';
import { DartkGrey, Grey, Orange, White } from '../../../color';
import { ReactComponent as ArrowUp } from '../../../assets/Icon/ArrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/Icon/FilterArrowDown.svg';
import { ReactComponent as X } from '../../../assets/Icon/X.svg';
import { ReactComponent as Reset } from '../../../assets/Icon/Reset.svg';
const Filtering = () => {
    const [select, setSelect] = useState(items);
    const [location, setLocation] = useState([]);
    const [tagValue, setTagValue] = useState(() => {
        try {
            const savedTags = localStorage.getItem('tagValue');
            return savedTags ? JSON.parse(savedTags) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    });
    const [isSeoul, setIsSeoul] = useState(true);
    const [params, setParams] = useState();
    const [selectState, setSelectState] = useState(new Array(11).fill(false));

    const isTagSelected = (content) => tagValue.includes(content);

    const valueClickHandler = (id, content) => {
        const category = select.find((item) => item.id === id).category;
        const newTagValue = tagValue.filter(
            (tag) => !select.find((item) => item.category === category).contents.includes(tag)
        );
        //tag
        if (!newTagValue.includes(content)) {
            newTagValue.push(content);
        }
        setTagValue(newTagValue);
        localStorage.setItem('tagValue', JSON.stringify(newTagValue));
        //state
        let newSelectState = [...selectState];
        newSelectState[id] = !selectState[id];
        setSelectState(newSelectState);
        //params
        setParams((prevParams) => {
            const newParams = { ...prevParams };
            if (id < 7) {
                newParams[category] = content;
            } else {
                const contentId = select[id - 1].contents.indexOf(content);
                let isPossible = null;
                switch (contentId) {
                    case 0:
                        isPossible = true;
                        break;
                    case 1:
                        isPossible = false;
                        break;
                    case 2:
                        isPossible = null;
                        break;
                }
                newParams[category] = isPossible;
            }
            return newParams;
        });
    };
    useEffect(() => {
        console.log(tagValue);
    }, [tagValue]);
    const locationClickHandler = (city) => {
        city === '경기' ? setIsSeoul(false) : setIsSeoul(true);
    };
    const locationDetailClickHandler = (location) => {
        const newTagValue = [...tagValue, location];
        setTagValue(newTagValue);
        localStorage.setItem('tagValue', JSON.stringify(newTagValue));
    };
    const CategoryClickHandler = (categoryId) => {
        let newSelectState = [...selectState];
        newSelectState[categoryId] = !selectState[categoryId];
        setSelectState(newSelectState);
    };
    useEffect(() => {
        console.log(params);
    }, [params]);
    const removeTagValue = () => {
        setTagValue([]);
        localStorage.removeItem('tagValue');
    };
    const popTagValue = (popTag) => {
        console.log(popTag);
        setTagValue(tagValue.filter((tag) => tag !== popTag));
        localStorage.setItem('tagValue', tagValue);
    };
    return (
        <SelectLayout>
            <div>
                {select &&
                    select.map((item) => {
                        return (
                            <SelectBox key={item.key}>
                                {item.id === 2 && (
                                    <SelectItem>
                                        <CategoryBox
                                            onClick={() => {
                                                CategoryClickHandler(item.id);
                                            }}
                                        >
                                            <p>{item.category}</p>
                                            {selectState[item.id] && <ArrowUp />}
                                            {!selectState[item.id] && <ArrowDown />}
                                        </CategoryBox>
                                        {selectState[item.id] && (
                                            <LoactionSelectBox>
                                                <SelectLocationItem>
                                                    <ul>
                                                        {item.contents.city.map((city) => {
                                                            return (
                                                                <Content onClick={() => locationClickHandler(city)}>
                                                                    <input
                                                                        name={item.category}
                                                                        type="radio"
                                                                        value={city}
                                                                        checked={
                                                                            (isSeoul && city === '서울') ||
                                                                            (!isSeoul && city === '경기')
                                                                        }
                                                                    />
                                                                    {city}
                                                                </Content>
                                                            );
                                                        })}
                                                    </ul>
                                                </SelectLocationItem>
                                                <SelectLocationItem>
                                                    <ul>
                                                        {isSeoul &&
                                                            item.contents.seoul.map((seoul) => {
                                                                return (
                                                                    <Content
                                                                        onClick={() =>
                                                                            locationDetailClickHandler(seoul)
                                                                        }
                                                                    >
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={seoul}
                                                                            checked={isTagSelected(seoul)}
                                                                        />
                                                                        {seoul}
                                                                    </Content>
                                                                );
                                                            })}
                                                        {!isSeoul &&
                                                            item.contents.gyeongi.map((gyeongi) => {
                                                                return (
                                                                    <Content
                                                                        onClick={() =>
                                                                            locationDetailClickHandler(gyeongi)
                                                                        }
                                                                    >
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={gyeongi}
                                                                            checked={isTagSelected(gyeongi)}
                                                                        />
                                                                        {gyeongi}
                                                                    </Content>
                                                                );
                                                            })}
                                                    </ul>
                                                </SelectLocationItem>
                                            </LoactionSelectBox>
                                        )}
                                    </SelectItem>
                                )}

                                {item.id !== 2 && (
                                    <SelectItem>
                                        <CategoryBox
                                            onClick={() => {
                                                CategoryClickHandler(item.id);
                                            }}
                                        >
                                            <p>{item.category}</p>
                                            {selectState[item.id] && <ArrowUp />}
                                            {!selectState[item.id] && <ArrowDown />}
                                        </CategoryBox>
                                        {selectState[item.id] && item.id !== 2 && (
                                            <Contents zIndex={-item.id + 20}>
                                                {item.contents &&
                                                    item.contents.map((content) => {
                                                        return (
                                                            <Content
                                                                key={item.key}
                                                                onClick={() => valueClickHandler(item.id, content)}
                                                            >
                                                                <input
                                                                    name={item.category}
                                                                    type="radio"
                                                                    value={content}
                                                                    checked={isTagSelected(content)}
                                                                />
                                                                <label>{content}</label>
                                                            </Content>
                                                        );
                                                    })}
                                            </Contents>
                                        )}
                                    </SelectItem>
                                )}
                            </SelectBox>
                        );
                    })}
            </div>
            <TagBox>
                {tagValue.length > 0 &&
                    tagValue.map((tag) => (
                        <Tag>
                            {tag}
                            <button onClick={() => popTagValue(tag)}>
                                <X />
                            </button>
                        </Tag>
                    ))}
                <button onClick={removeTagValue}>
                    초기화 <Reset />
                </button>
            </TagBox>
        </SelectLayout>
    );
};

export default Filtering;

const SelectLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    & > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
`;
const SelectBox = styled.div`
    position: relative;
    height: auto;
`;
const CategoryBox = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    flex-direction: row;
    border-radius: 10px;
    font-size: 13px;
    padding: 10px;
    border: 1px solid ${Grey};
    color: ${DartkGrey};
    font-weight: bold;
    &:hover {
        color: ${Orange};
    }
`;
const SelectItem = styled.div`
    margin: 10px;
    position: relative;
    min-width: 148px;
    flex-direction: column;
    gap: 10px;
`;
const Contents = styled.ul`
    position: absolute;
    margin-top: 2px;
    z-index: ${(props) => props.zIndex};
    list-style: none;
    width: 148px;
    max-height: 200px;
    overflow: scroll;
    font-size: 13px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    background: ${White};
    color: ${DartkGrey};
    & > p {
        width: 100%;
    }
`;
const Content = styled.li`
    position: relative;
    height: 20px;
    cursor: pointer;
    &:hover {
        color: ${Orange};
        font-weight: bold;
    }
    & > input[type='checkbox'],
    & > input[type='radio'] {
        appearance: none;
        width: 15px;
        height: 15px;
        border: 1px solid ${Grey};
        position: relative;
        border-radius: 2px;
        cursor: pointer;
        margin-right: 5px;
        &:checked {
            border-color: transparent;
            background-size: 100% 100%;
            background-position: 50%;
            background-repeat: no-repeat;
            background-color: ${Orange};
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        }
    }
`;
const LoactionSelectBox = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    margin-top: 2px;
    z-index: 10;
    list-style: none;
    width: 240px;
    max-height: 200px;
    overflow: scroll;
    font-size: 13px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    background: ${White};
    color: ${DartkGrey};
`;

const SelectLocationItem = styled.div`
    width: 200px;
    display: flex;
    flex-direction: row;
    & > ul {
        list-style: none;
        z-index: 100;
    }
`;

const TagBox = styled.div`
    margin-left: 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    & > p {
        cursor: pointer;
        font-size: 13px;
    }
    & > button {
        display: flex;
        gap: 3px;
        background: transparent;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
    }
`;
const Tag = styled.div`
    width: fit-content;
    height: 25px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    font-size: 13px;
    gap: 5px;
    align-items: center;
    background: ${Orange};
    color: ${White};
    & > button {
        background: transparent;
        cursor: pointer;
    }
`;
