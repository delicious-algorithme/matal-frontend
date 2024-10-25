import styled from 'styled-components';
import { Orange } from '../../color';

const SearchKeyword = () => {
    return (
        <SearchKeywordBox>
            <p>카테고리 별 검색</p>
            <p>애견 동반 가능 맛집</p>
            <p>웨이팅 맛집</p>
            <p>긍정 키워드</p>
        </SearchKeywordBox>
    );
};

export default SearchKeyword;

const SearchKeywordBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    color: ${Orange};
    font-size: 16px;
    @media screen and (max-width: 780px) {
        display: none;
    }
`;
