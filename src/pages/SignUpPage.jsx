import { useState } from 'react';
import { Signup } from '../components/login';
import { Consent } from '../components/login';

const SignUpPage = () => {
    const [isConsent, setIsConsent] = useState(false);

    if (isConsent) {
        return <Signup />;
    } else {
        return <Consent setIsConsent={setIsConsent} />;
    }
};

export default SignUpPage;
