import { useState } from 'react';
import { Signup } from '../components/login';
import { Consent } from '../components/login';

const SignUpPage = () => {
    const [isAllConsent, setIsAllConsent] = useState(false);

    if (isAllConsent) {
        return <Signup isAllConsent={isAllConsent} />;
    } else {
        return <Consent setIsAllConsent={setIsAllConsent} />;
    }
};

export default SignUpPage;
