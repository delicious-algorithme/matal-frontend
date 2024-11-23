import ErrorIcon from '@mui/icons-material/Error';
import { Orange, Grey } from '../../../color';
import styled from 'styled-components';

const FormField = ({ type, value, name, placeholder, error, onChange, mode }) => {
    const loginEmail = mode === 'login' && type === 'email';
    return (
        <>
            <InputContainer>
                <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
            </InputContainer>
            {error && !loginEmail && (
                <ErrorMessage>
                    <ErrorIcon />
                    {error}
                </ErrorMessage>
            )}
        </>
    );
};

export default FormField;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 5px;

    & > input {
        padding: 10px;
        width: 100%;
    }
`;

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    color: ${Orange};
    padding-left: 10px;

    & > svg {
        width: 12px;
        height: 12px;
    }
`;
