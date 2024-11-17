import React from 'react';
import styled from 'styled-components';
import { DarkGrey, Orange, White } from '../../color';

const DetailBox = ({ label, content, type }) => {
    return (
        <DetailBoxContainer type={type}>
            <Label>
                <span>{label}</span>
            </Label>
            {type !== 'time' && type !== 'address' && <p>{content}</p>}
            {type === 'address' && <button>{content}</button>}
            {type === 'time' && (
                <Time>{Array.isArray(content) && content.map((item, idx) => <p key={idx}>{item}</p>)}</Time>
            )}
        </DetailBoxContainer>
    );
};

export default DetailBox;

const DetailBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 15px;

    & > svg {
        width: 16px;
        height: 16px;
        color: ${DarkGrey};
    }

    & > button {
        background-color: ${White};
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
        color: ${(props) => (props.type === 'address' ? `${Orange}` : `${DarkGrey}`)};
    }
`;

const Time = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.div`
    width: 70px;
    font-size: 16px;
    font-weight: 600;
`;
