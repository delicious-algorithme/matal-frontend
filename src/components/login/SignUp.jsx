import React, { useState } from 'react';
import styled from 'styled-components';
import { Grey, Orange, White } from '../../color';
const items = [
    {
        label: '아이디',
        type: 'text',
        placeholder: '아이디를 입력하세요.',
        value: null,
    },
    {
        label: '비밀번호',
        type: 'password',
        placeholder: '비밀번호를 입력하세요',
        value: null,
    },
    {
        label: '이메일',
        type: 'email',
        placeholder: '이메일을 입력하세요.',
        value: null,
    },
    {
        label: '닉네임',
        type: 'nickName',
        placeholder: '닉네임을 입력하세요',
        value: null,
    },
];

const Signup = () => {
    const [inputs, setInputs] = useState({
        text: '',
        email: '',
        password: '',
        description: '',
    });
    const handleSubmit = (e) => {
        //
    };
    return (
        <SignupLayout>
            <SignupBox>
                <h1>환영합니다 !</h1>
                <div>기본 회원 정보를 등록해주세요.</div>
                <InitalinformationBox>
                    {items.map((item) => (
                        <input
                            value={inputs[item.type]}
                            key={item.label}
                            label={item.label}
                            type={item.type}
                            placeholder={item.placeholder}
                            setInputs={setInputs}
                        />
                    ))}
                </InitalinformationBox>
                <ButtonBox>
                    <button onClick={handleSubmit}>가입하기</button>
                    <button> 로그인하러가기</button>
                </ButtonBox>
            </SignupBox>
        </SignupLayout>
    );
};
export default Signup;

const SignupLayout = styled.div`
    display: flex;
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const SignupBox = styled.div`
    width: 500px;
    height: auto;
    & > h1 {
        font-weight: 700;
    }
    & > div {
        margin: 1rem 0rem;
    }
    @media (max-width: 770px) {
        width: auto;
    }
`;
const InitalinformationBox = styled.form`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1.25rem;
    & > input {
        padding: 20px;
        width: 100%;
        border: 1px solid ${Grey};
        border-radius: 20px;
    }
    @media (max-width: 770px) {
        & > input {
            width: 100%;
        }
    }
`;
const ButtonBox = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    & > button {
        width: 100%;
        border: none;
        border-radius: 1.5rem;
        height: 48px;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
    }
    :first-child {
        background-color: ${Orange};
        color: ${White};
    }
    :last-child {
        background-color: ${White};
        color: ${Orange};
    }
`;
