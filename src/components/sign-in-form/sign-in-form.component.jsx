import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// import './sign-in-form.styles.jsx';
import { SignInContainer, H2, ButtonsContainer } from './sign-in-form.styles';

import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithEmail
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields( {...formFields, [name]:value} )
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInWithEmail(email,password);
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password': alert('Incorrect password'); break;
                case 'auth/user-not-found': alert('Email not found'); break;
                default: console.log(error);
            }
        }
    };

    return (
        <SignInContainer>
            <H2>I already have an account</H2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick = {signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
        );
};

export default SignInForm;