import { useState, FormEvent, ChangeEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signUpStart } from '../../store/user/user.action';

import { SignUpContainer, H2 } from './sign-up-form.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    //note: since this component is hooked into Context using below code,
    //it re-renders anytime context is updated
    // const val = useContext(UserContext);
    // console.log('hit')

    // const logEmailUser = async () => {
    //     const { user } = await createAuthUserWithEmailAndPassword(email, password);
    //     const userDocRef = await createUserDocumentFromAuth(user);
    //     console.log(userDocRef)
    // };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //confirm password matches
        if (password !== confirmPassword ) {
            alert("Passwords do not match.");
            return;
        };

        try {
            // const { user } = await createAuthUserWithEmailAndPassword(
            //     email, 
            //     password
            // );
            // await createUserDocumentFromAuth( user, { displayName });
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use.')
            }
            else console.error(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields( {...formFields, [name]:value} )
    };

    return (
        <SignUpContainer>
            <H2>Don't have an account?</H2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />
                <FormInput 
                    label="Email"
                    type="email" required 
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
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;