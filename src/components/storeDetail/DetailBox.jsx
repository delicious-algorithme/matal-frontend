import React from 'react';
import styled from 'styled-components';

const DetailBox = ({ label, content, type }) => {
    if (!content) {
        content = '정보 없음';
    }
    return (
        <DetailBoxContainer type={type}>
            <Label>
                <span>{label}</span>
            </Label>
            {type !== 'time' && <p>{content}</p>}
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

    @media screen and (max-width: 768px) {
        font-size: 14px;
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
    color: black;
`;
