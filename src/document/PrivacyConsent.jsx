import React from 'react';
import styled from 'styled-components';
import { Grey, Orange, White } from '../color';

const PrivacyConsent = () => {
    return (
        <PrivacyConsentLayout>
            <PrivacyConsentheader>
                <img
                    src="https://wnstn6945.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F499f229c-bff2-4c82-ae94-81c36fa59a9c%2F486bd819-ad54-4f34-bd54-23ef03ca65c5%2FGroup_1000002041_(5).svg?table=block&id=965a81f4-7d80-4af9-9379-4c6ca3fe7174&spaceId=499f229c-bff2-4c82-ae94-81c36fa59a9c&userId=&cache=v2"
                    alt="logo"
                />
            </PrivacyConsentheader>
            <PrivacyConsentContainer>
                <Title>
                    <h2>개인정보 수집 및 이용 동의서</h2>
                    <h4>시행일: 2024. 11. 19 </h4>
                </Title>
                <PrivacyConsentContentsBox>
                    <p>1. 개인정보 수집목적 및 이용목적</p>
                    <p>
                        (1) 회원 가입 및 관리
                        <br /> 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적
                        본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보 처리 시
                        법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등의 목적
                    </p>
                    <p>
                        (2) 서비스 제공
                        <br />
                        가게 정보 저장 및 조회 기능 제공
                    </p>
                    <p>
                        (3) 고충 처리
                        <br /> 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등
                    </p>
                </PrivacyConsentContentsBox>
                <PrivacyConsentContentsBox>
                    <p>2. 수집하는 개인정보 항목 </p>
                    <p>닉네임, ID(이메일), 비밀번호</p>
                </PrivacyConsentContentsBox>
                <PrivacyConsentContentsBox>
                    <p>3. 개인정보 보유 및 이용기간</p>
                    <p>
                        회원탈퇴 시까지 (단, 관계 법령에 보존 근거가 있는 경우 해당 기간 시까지 보유,
                        개인정보처리방침에서 확인 가능)
                    </p>
                </PrivacyConsentContentsBox>
            </PrivacyConsentContainer>
        </PrivacyConsentLayout>
    );
};

export default PrivacyConsent;

const PrivacyConsentLayout = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f0f0f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PrivacyConsentheader = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    left: 0;
    top: 0;
    & > img {
        width: 130px;
        height: 80px;
    }
    background-color: ${White};
    border-bottom: 1px solid ${Grey};
`;

const PrivacyConsentContentsBox = styled.section`
    background-color: ${White};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
`;

const PrivacyConsentContainer = styled.div`
    padding: 30px;
    width: 80%;
    height: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    margin-top: 50px;
    margin-bottom: 100px;

    background-color: ${White};
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    & > h2 {
        color: ${Orange};
    }
`;
