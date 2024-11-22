import { useState } from 'react';
import styled from 'styled-components';
import { Orange, White, DarkGrey, LightGrey } from '../../color';

const PopOver = ({ text, label }) => {
    const [isActived, setIsActived] = useState();

    return (
        <PopOverContainer onClick={() => setIsActived(!isActived)}>
            <Button> ? </Button>
            {isActived && (
                <PopoverText>
                    <Label>{label}</Label>
                    <p>{text}</p>
                </PopoverText>
            )}
        </PopOverContainer>
    );
};

export default PopOver;

const PopOverContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`;

const Label = styled.label`
    font-weight: bold;
    color: ${DarkGrey};
`;

const Button = styled.button`
    width: 15px;
    height: 15px;
    border-radius: 100px;
    display: flex;
    background: ${White};
    text-align: center;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Orange};
    color: ${Orange};
    font-size: 10px;
    font-weight: 600;
`;

const PopoverText = styled.div`
    width: fit-content;
    min-width: 400px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    background-color: rgb(250, 250, 250);
    z-index: 10;
    margin-left: 300px;
    margin-top: 100px;
    padding: 20px;
    height: 70px;
    border-radius: 5px;
    border: 1px solid ${LightGrey};
    color: ${DarkGrey};
    font-size: 12px;

    @media screen and (max-width: 500px) {
        min-width: 300px;
        margin-left: 100px;
        margin-top: 100px;
    }
`;
