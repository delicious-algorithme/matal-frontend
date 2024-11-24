import styled from 'styled-components';
import { DarkGreen, Orange } from '../../../color';

const Keyword = ({ keyword, type, mode }) => {
    if (!keyword) {
        return <p>로딩 중...</p>;
    }
    const keywordItem = keyword.split(', ');

    return (
        <KeywordBox>
            {keywordItem.map((item) => {
                return (
                    <KeywordTag mode={mode} type={type} key={type}>
                        <p>#{item}</p>
                    </KeywordTag>
                );
            })}
        </KeywordBox>
    );
};

export default Keyword;

const KeywordBox = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

const KeywordTag = styled.div`
    width: fit-content;
    padding: 10px;
    height: 30px;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    font-size: ${(props) => (props.mode === 'card' ? `12px` : `15px`)};
    border: 1px solid ${(props) => (props.type === 'positive' ? `${Orange}` : `${DarkGreen}`)};
    color: ${(props) => (props.type === 'positive' ? `${Orange}` : `${DarkGreen}`)};

    @media screen and (max-width: 768px) {
        font-size: 13px;
        padding: 5px;
    }
`;
