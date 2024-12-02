import styled from 'styled-components';
import { DarkGreen, Orange } from '../../../color';
import { v4 as uuidv4 } from 'uuid';

const Keyword = ({ keyword, type, mode }) => {
    if (!keyword) {
        return <p>로딩 중...</p>;
    }
    const keywordItem = keyword.split(', ');

    return (
        <KeywordBox>
            {keywordItem.map((item) => {
                return (
                    <KeywordTag mode={mode} type={type} key={uuidv4()}>
                        <p>{item}</p>
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
    height: ${(props) => (props.mode === 'card' ? `20px` : `35px`)};
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    font-size: ${(props) => (props.mode === 'card' ? `10px` : `15px`)};
    border: 1px solid ${(props) => (props.type === 'positive' ? `${Orange}` : `${DarkGreen}`)};
    color: ${(props) => (props.type === 'positive' ? `${Orange}` : `${DarkGreen}`)};

    @media screen and (max-width: 768px) {
        font-size: 12px;
        padding: 5px;
    }
`;
