import { getAuth, getRedirectResult } from 'firebase/auth';
import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);
    
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        //confirm password matches
        if (password !== confirmPassword ) {
            alert("Passwords do not match.");
            return;
        };

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            await createUserDocumentFromAuth( user, { displayName });
            setCurrentUser(user);
            alert('Account created');
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.')
            }
            else console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields( {...formFields, [name]:value} )
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
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
        </div>
    );
};

export default SignUpForm;