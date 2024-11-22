import styled from 'styled-components';
import { Grey, DarkGreen, DarkGrey, Orange } from '../../color';
import { Button } from '../common';
import { useState } from 'react';

const Consent = ({ setIsConsent }) => {
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        privacyConsent: false,
        age14: false,
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setCheckedItems((prev) => ({ ...prev, [name]: checked }));
    };

    const isAllChecked = Object.values(checkedItems).every((value) => value);

    const handleClickNextStep = (e) => {
        if (isAllChecked) {
            setIsConsent(true);
        }
    };

    return (
        <AuthLayout>
            <FormBox>
                <h1>회원 가입</h1>
                <AuthBox>
                    <CheckBox>
                        <div>
                            <input type="checkbox" name="terms" checked={checkedItems.terms} onChange={handleChange} />
                            <label> 이용약관 동의 (필수)</label>
                        </div>
                        <a href="/terms">전문 보기</a>
                    </CheckBox>
                    <CheckBox>
                        <div>
                            <input
                                type="checkbox"
                                name="privacyConsent"
                                checked={checkedItems.privacyConsent}
                                onChange={handleChange}
                            />
                            <label> 개인 정보 수집 및 이용 동의 (필수)</label>
                        </div>
                        <a href="/privacyConsent">전문 보기</a>
                    </CheckBox>
                    <CheckBox>
                        <div>
                            <input type="checkbox" name="age14" checked={checkedItems.age14} onChange={handleChange} />
                            <label> 만 14세 이상입니다 (필수)</label>
                        </div>
                    </CheckBox>
                    {isAllChecked && (
                        <Button
                            text="다음 단계(1/2)"
                            color="orange"
                            visible="true"
                            onClickHandler={handleClickNextStep}
                        />
                    )}
                    <TermsBox>
                        <a href="/terms">이용 약관</a>
                        <a href="/privacyConsent">개인 정보 수집 및 이용 동의</a>
                        <a href="/privacy">개인정보처리방침</a>
                    </TermsBox>
                </AuthBox>
            </FormBox>
        </AuthLayout>
    );
};

export default Consent;

const AuthLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const AuthBox = styled.form`
    width: 100%;
    border: 1px solid ${Grey};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 30px;

    & > button {
        width: 100%;
        border-radius: 10px;
    }
`;

const CheckBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    & > a {
        color: ${DarkGrey};
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;

        &:hover {
            color: ${Orange};
            text-decoration: underline;
        }
    }

    @media (max-width: 768px) {
        & > div > label {
            font-size: 13px;
        }
        & > a {
            font-size: 11px;
            font-weight: 700;
        }
    }
`;

const FormBox = styled.div`
    min-width: 30%;
    height: auto;

    & > h1 {
        font-weight: 700;
        margin-bottom: 10px;
        color: ${DarkGreen};
    }

    @media (max-width: 768px) {
        min-width: 80%;
    }
`;

const TermsBox = styled.div`
    display: flex;
    gap: 20px;

    & > a {
        color: ${DarkGrey};
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;

        &:hover {
            color: ${Orange};
            text-decoration: underline;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        & > a {
            font-size: 11px;
            font-weight: 700;
        }
    }
`;
