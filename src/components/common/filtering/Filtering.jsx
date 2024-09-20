import styled from 'styled-components';
import { items } from './FilteringItems';
import { useState, useEffect } from 'react';
import { DartkGrey, Grey, Orange, White } from '../../../color';
import { ReactComponent as ArrowUp } from '../../../assets/Icon/ArrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/Icon/FilterArrowDown.svg';
import { ReactComponent as Reset } from '../../../assets/Icon/Reset.svg';
import { useFilterParams } from '../../../store';
import { useNavigate } from 'react-router-dom';
const Filtering = ({ category }) => {
    const select = items;
    const { setFilterParams } = useFilterParams();
    const navigate = useNavigate();
    const [locationValue, setLocationValue] = useState(() => {
        try {
            const savedLocation = localStorage.getItem('loaction');
            return savedLocation ? JSON.parse(savedLocation) : '';
        } catch (error) {
            console.error(error);
            return '';
        }
    });

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
    const [params, setParams] = useState(() => {
        try {
            const filterParams = localStorage.getItem('params');
            return filterParams ? JSON.parse(filterParams) : {};
        } catch (error) {
            console.error(error);
            return {};
        }
    });
    const [selectState, setSelectState] = useState(new Array(11).fill(false));

    const isTagSelected = (content) => tagValue.includes(content);

    const valueClickHandler = (id, content, filter_type, value) => {
        const category = select.find((item) => item.id === id).name;
        const newTagValue = tagValue.filter(
            (tag) => !select.find((item) => item.name === category).contents.includes(tag)
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
                newParams[filter_type] = value;
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
                    default:
                        break;
                }
                newParams[filter_type] = isPossible;
            }
            return newParams;
        });
    };
    useEffect(() => {
        if (category) {
            setParams((prevParams) => {
                const newParams = { ...prevParams };
                newParams.category = category;
                return newParams;
            });
            navigate('/webmap');
            const newTagValue = tagValue;
            if (!newTagValue.includes(category)) {
                newTagValue.push(category);
            }
            setTagValue(newTagValue);
            localStorage.setItem('tagValue', JSON.stringify(newTagValue));
        }
    }, [category]);

    const locationClickHandler = (city) => {
        city === '경기' ? setIsSeoul(false) : setIsSeoul(true);
    };

    const locationDetailClickHandler = (location) => {
        const updatedLocationValue = [...locationValue, location];
        setLocationValue(updatedLocationValue);
        localStorage.setItem('location', JSON.stringify(updatedLocationValue));

        setParams((prevParams) => {
            const newParams = { ...prevParams };
            const addressesString = updatedLocationValue.join(',');
            newParams.addresses = addressesString;
            return newParams;
        });
        //tag
        const newTagValue = [...tagValue, location];
        setTagValue(newTagValue);
        localStorage.setItem('tagValue', JSON.stringify(newTagValue));
    };

    const CategoryClickHandler = (categoryId) => {
        let newSelectState = [...selectState];
        newSelectState[categoryId] = !selectState[categoryId];
        setSelectState(newSelectState);
    };

    const removeTagValue = () => {
        setTagValue([]);
        setParams('');
        setLocationValue('');
        localStorage.removeItem('tagValue');
        localStorage.removeItem('location');
        localStorage.removeItem('params');
    };

    useEffect(() => {
        localStorage.setItem('params', JSON.stringify(params));
        setFilterParams(params);
    }, [params, setFilterParams]);

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
                                            <p>{item.name}</p>
                                            {selectState[item.id] && <ArrowUp />}
                                            {!selectState[item.id] && <ArrowDown />}
                                        </CategoryBox>
                                        {selectState[item.id] && (
                                            <LoactionSelectBox>
                                                <SelectLocationItem>
                                                    <ul>
                                                        {item.contents.city.map((city) => {
                                                            return (
                                                                <Content key={item.id}>
                                                                    <input
                                                                        name={item.category}
                                                                        type="radio"
                                                                        value={city}
                                                                        checked={
                                                                            (isSeoul && city === '서울') ||
                                                                            (!isSeoul && city === '경기')
                                                                        }
                                                                        onChange={() => locationClickHandler(city)}
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
                                                                    <Content key={item.id}>
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={seoul}
                                                                            checked={isTagSelected(seoul)}
                                                                            onClick={() =>
                                                                                locationDetailClickHandler(seoul)
                                                                            }
                                                                        />
                                                                        {seoul}
                                                                    </Content>
                                                                );
                                                            })}
                                                        {!isSeoul &&
                                                            item.contents.gyeongi.map((gyeongi) => {
                                                                return (
                                                                    <Content key={item.id}>
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={gyeongi}
                                                                            checked={isTagSelected(gyeongi)}
                                                                            onClick={() =>
                                                                                locationDetailClickHandler(gyeongi)
                                                                            }
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
                                            <p>{item.name}</p>
                                            {selectState[item.id] && <ArrowUp />}
                                            {!selectState[item.id] && <ArrowDown />}
                                        </CategoryBox>
                                        {selectState[item.id] && item.id !== 2 && (
                                            <Contents zIndex={-item.id + 20}>
                                                {item.contents &&
                                                    item.contents.map((content, index) => {
                                                        return (
                                                            <Content key={item.id}>
                                                                <input
                                                                    name={item.category}
                                                                    type="radio"
                                                                    value={content}
                                                                    checked={isTagSelected(content)}
                                                                    onClick={() =>
                                                                        valueClickHandler(
                                                                            item.id,
                                                                            content,
                                                                            item.filter_type,
                                                                            item.value[index]
                                                                        )
                                                                    }
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
                {tagValue.length > 0 && tagValue.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
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
    &::-webkit-scrollbar {
        width: 5px;
        height: auto;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(217, 217, 217, 1);
        border-radius: 15px;
        width: 5px;
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
    &::-webkit-scrollbar {
        width: 5px;
        height: auto;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(217, 217, 217, 1);
        border-radius: 15px;
        width: 5px;
    }
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
