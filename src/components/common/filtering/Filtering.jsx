import styled from 'styled-components';
import { FITERING_INFO } from '../../../constants/FILTERING_ITEMS';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { DarkGrey, Grey, Orange, White } from '../../../color';
import { useFilterParams, useIsFetch, useTagList } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const Filtering = ({ category }) => {
    const navigate = useNavigate();

    const { setFilterParams, filterParams } = useFilterParams();
    const { setIsFetchAll } = useIsFetch();
    const { tagList, setTagList } = useTagList();

    const [seeMore, setSeeMore] = useState(true);
    const [categories, setCategories] = useState(filterParams.category);
    const [keywords, setKeywords] = useState(filterParams.positiveKeyword);
    const [locationValue, setLocationValue] = useState(filterParams.addresses);
    const [isSeoul, setIsSeoul] = useState(true);
    const [params, setParams] = useState(filterParams);
    const [selectState, setSelectState] = useState(new Array(11).fill(false));

    //tag관련함수들
    const isTagSelected = (content) => tagList.includes(content);

    const resetAllValue = () => {
        setTagList([]);
        setLocationValue('');
        setParams({ ...initialParams });
        setFilterParams({ ...initialParams });
        setIsFetchAll(true);
    };

    const initialParams = useMemo(() => {
        return {
            addresses: [],
            category: [],
            positiveKeyword: [],
        };
    }, []);

    const handleSeemore = () => {
        setSeeMore(!seeMore);
    };

    const isInitFilterParams = useCallback(() => {
        return isEqual(filterParams, initialParams);
    }, [filterParams, initialParams]);

    //필터링 하나만 되게 하는 조건

    useEffect(() => {
        const isInit = isInitFilterParams();
        if (isInit) {
            setCategories([]);
            setKeywords([]);
            setTagList([]);
        }
    }, [isInitFilterParams, setTagList]);

    //중복 불가능한 카테고리들 태그 추가
    const addTagValue = (content, filterTitle) => {
        const newTagValue = tagList.filter(
            (tag) => !FITERING_INFO.find((item) => item.name === filterTitle).contents.includes(tag)
        );
        if (!newTagValue.includes(content)) {
            newTagValue.push(content);
        }
        setTagList(newTagValue);
    };

    //중복 가능한 카테고리들 태그 추가
    const addMultiTagValue = (content) => {
        const newTagValue = tagList.includes(content)
            ? tagList.filter((tag) => tag !== content)
            : [...tagList, content];
        setTagList(newTagValue);
    };

    const deleteTagValue = (content) => {
        const newTagValue = tagList.filter((tag) => tag !== content);
        setTagList(newTagValue);
    };

    //params 관련 함수들
    const categoryToggleParams = (value) => {
        const newCategoryValue = categories.includes(value)
            ? categories.filter((item) => item !== value)
            : [...categories, value];
        setCategories(newCategoryValue);
        return newCategoryValue;
    };

    const keywordToggleParams = (value) => {
        const newKeywordValue = keywords.includes(value)
            ? keywords.filter((item) => item !== value)
            : [...keywords, value];
        setKeywords(newKeywordValue);
        return newKeywordValue;
    };

    //category, keyword 제외한 카테고리 파라미터
    const tipToggleParams = (id, newParams, content, filter_type) => {
        const contentId = FITERING_INFO[id - 1].contents.indexOf(content);
        if (newParams[filter_type] === FITERING_INFO[id - 1].value[contentId]) {
            delete newParams[filter_type];
            deleteTagValue(content);
        } else {
            newParams[filter_type] = FITERING_INFO[id - 1].value[contentId];
        }
    };

    //params
    const addParams = (filter_type, id, value, content) => {
        setParams((prevParams) => {
            const newParams = { ...prevParams };
            if (filter_type === 'category') {
                const newCategoryValue = categoryToggleParams(value);
                newParams[filter_type] = [...newCategoryValue];
                return newParams;
            } else if (filter_type === 'positiveKeyword') {
                const newKeywordValue = keywordToggleParams(value);
                newParams[filter_type] = [...newKeywordValue];
                return newParams;
            } else if (id < 7) {
                if (newParams[filter_type] && newParams[filter_type] === value) {
                    delete newParams[filter_type];
                    deleteTagValue(content);
                } else {
                    newParams[filter_type] = value;
                }
                return newParams;
            } else {
                tipToggleParams(id, newParams, content, filter_type);
                return newParams;
            }
        });
    };

    const valueClickHandler = (id, content, filter_type, value) => {
        const filterTitle = FITERING_INFO.find((item) => item.id === id).name;

        //tag
        if (filter_type === 'category' || filter_type === 'positiveKeyword') {
            addMultiTagValue(content, filterTitle);
        } else {
            addTagValue(content, filterTitle);
        }
        //params
        addParams(filter_type, id, value, content);
    };

    //메인 페이지에서 받아오는 카테고리 처리
    useEffect(() => {
        if (category && category.length !== 0) {
            setParams((prevParams) => {
                const newParams = { ...prevParams };
                setCategories((prev) => {
                    const updated = new Set(prev);
                    updated.add(category);
                    return Array.from(updated);
                });
                if (!newParams.category.includes(category)) {
                    newParams.category = [...categories, category];
                }
                return newParams;
            });
            navigate('/webmap');
            const newTagValue = tagList;
            if (!newTagValue.includes(category)) {
                newTagValue.push(category);
            }
            setTagList(newTagValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const locationClickHandler = (city) => {
        city === '경기' ? setIsSeoul(false) : setIsSeoul(true);
    };

    const locationToggleValue = (location) => {
        const newLocationValue = locationValue.includes(location)
            ? locationValue.filter((item) => item !== location)
            : [...locationValue, location];
        setLocationValue(newLocationValue);
        return newLocationValue;
    };

    const locationDetailClickHandler = (location) => {
        const newLocationValue = locationToggleValue(location);
        setParams((prev) => {
            const newParams = { ...prev };
            newParams.addresses = [...newLocationValue];
            return newParams;
        });

        //tag
        if (!tagList.includes(location)) {
            const newTagValue = [...tagList, location];
            setTagList(newTagValue);
        } else {
            deleteTagValue(location);
        }
    };

    const CategoryClickHandler = (categoryId) => {
        setSelectState((prevState) => {
            let newSelectState = [...prevState];

            if (newSelectState[categoryId]) {
                newSelectState[categoryId] = false;
            } else {
                newSelectState = new Array(prevState.length).fill(false);
                newSelectState[categoryId] = true;
            }

            return newSelectState;
        });
    };

    const handleCheckboxChange = (id) => {
        setSelectState((prevState) => prevState.map((state, i) => (i === id ? !state : state)));
    };

    useEffect(() => {
        setFilterParams(params);
    }, [params, setFilterParams]);

    return (
        <SelectLayout>
            <SeemoreButton onClick={handleSeemore}>가게 필터링 하기</SeemoreButton>
            <div>
                {FITERING_INFO &&
                    seeMore &&
                    FITERING_INFO.map((item) => {
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
                                            {selectState[item.id] && <KeyboardArrowUpRoundedIcon />}
                                            {!selectState[item.id] && <KeyboardArrowDownRoundedIcon />}
                                        </CategoryBox>
                                        {selectState[item.id] && (
                                            <LoactionSelectBox>
                                                <SelectLocationItem>
                                                    <ul>
                                                        {item.contents.city.map((city, index) => {
                                                            return (
                                                                <Content key={`${item.id}-${city}-${index}`}>
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
                                                            item.contents.seoul.map((seoul, index) => {
                                                                return (
                                                                    <Content key={`${item.id}-${seoul}-${index}`}>
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={seoul}
                                                                            checked={isTagSelected(
                                                                                seoul === '서울 전체' ? '서울 ' : seoul
                                                                            )}
                                                                            onClick={() => {
                                                                                locationDetailClickHandler(
                                                                                    seoul === '서울 전체'
                                                                                        ? '서울 '
                                                                                        : seoul
                                                                                );
                                                                            }}
                                                                            onChange={() =>
                                                                                handleCheckboxChange(item.id)
                                                                            }
                                                                        />
                                                                        {seoul}
                                                                    </Content>
                                                                );
                                                            })}
                                                        {!isSeoul &&
                                                            item.contents.gyeongi.map((gyeongi, index) => {
                                                                return (
                                                                    <Content key={`${item.id}-${gyeongi}-${index}`}>
                                                                        <input
                                                                            name={item.category}
                                                                            type="checkbox"
                                                                            value={gyeongi}
                                                                            checked={isTagSelected(
                                                                                gyeongi === '경기 전체'
                                                                                    ? '경기'
                                                                                    : gyeongi
                                                                            )}
                                                                            onClick={() =>
                                                                                locationDetailClickHandler(
                                                                                    gyeongi === '경기 전체'
                                                                                        ? '경기'
                                                                                        : gyeongi
                                                                                )
                                                                            }
                                                                            onChange={() =>
                                                                                handleCheckboxChange(item.id)
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
                                            {selectState[item.id] && <KeyboardArrowUpRoundedIcon />}
                                            {!selectState[item.id] && <KeyboardArrowDownRoundedIcon />}
                                        </CategoryBox>
                                        {selectState[item.id] && item.id !== 2 && (
                                            <Contents zIndex={-item.id + 20}>
                                                {item.contents &&
                                                    item.contents.map((content, index) => {
                                                        return (
                                                            <Content key={`${item.id}-${content}-${index}`}>
                                                                <input
                                                                    name={item.category}
                                                                    type="checkbox"
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
                                                                    onChange={() => handleCheckboxChange(item.id)}
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
                {tagList.length > 0 && tagList.map((tag, index) => <Tag key={`${tag}-${index}`}>{tag}</Tag>)}
                <button onClick={resetAllValue}>
                    초기화 <RestartAltRoundedIcon />
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

const SeemoreButton = styled.button`
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 10px;
    background-color: ${White};
    border: 1px solid ${Grey};
    height: 50px;
    border-radius: 20px;
    font-weight: bold;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    @media screen and (min-width: 370px) {
        display: none;
    }
`;

const SelectBox = styled.div`
    position: relative;
    height: auto;
`;

const CategoryBox = styled.div`
    cursor: pointer;
    display: flex;
    transition-duration: 2s;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    flex-direction: row;
    border-radius: 10px;
    font-size: 13px;
    padding: 10px;
    border: 1px solid ${Grey};
    color: ${DarkGrey};
    font-weight: bold;

    &:hover {
        color: ${Orange};
    }
`;

const SelectItem = styled.div`
    margin: 10px;
    position: relative;
    min-width: 160px;
    flex-direction: column;
    gap: 10px;
`;

const Contents = styled.ul`
    position: absolute;
    margin-top: 2px;
    z-index: ${(props) => props.zIndex};
    list-style: none;
    width: 160px;
    max-height: 200px;
    font-size: 13px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    background: ${White};
    max-height: 200px;
    overflow-y: auto;
    color: ${DarkGrey};

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
    display: flex;
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
    width: 230px;
    max-height: 200px;
    font-size: 13px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    background: ${White};
    color: ${DarkGrey};
    max-height: 200px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
        height: auto;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(217, 217, 217, 1);
        border-radius: 15px;
        width: 5px;
    }

    @media screen and (max-width: 1024px) {
        width: 160px;
        gap: 20px;
        flex-direction: column;
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
    @media screen and (max-width: 1024px) {
        width: 130px;
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
