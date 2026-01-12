import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const SignupButton = styled.button`
    background-color: #13293D;
    color: #E8F1F2;
    font-size: 1.5em;
    font-weight: 500;
    border: 1px solid transparent;
    border-radius: 1rem;
    padding: 3px;
    width: 250px;
    height: 40px;
    text-decoration: none;
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover {
        background-color: #E8F1F2;
        color: #13293D;
        border: 1px solid;
        border-color: #13293D;
    }

    &:active {
        background-color: #E8F1F2;
        color: #13293D;
        border: 1px solid;
        border-color: #13293D;
    }
`;

const LoginLink = styled(Link)`
    color: #006494;
`;

const InputBoxes = styled.input`
    background-color: #1b98e033;
    color: #13293D;
    width: 325px;
    padding: 12px;
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid transparent;

    &::placeholder {
        color: #13293D;
        font-style: italic;
        opacity: 0.50;
    }
`;

const SignUpLabels = styled.label`
    display: block;
    text-align: left;
`;

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/login");
        })
        .catch((error) => {
            // TODO: error handling for password/email problems
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    return (
        <main >        
        <section>
            <div>
                <div>                  
                    <h1> Sign Up </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <SignUpLabels htmlFor="email-address">
                                Email
                            </SignUpLabels>
                            <InputBoxes
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email"                                
                            />
                        </div>

                        <div>
                            <SignUpLabels htmlFor="password">
                                Password
                            </SignUpLabels>
                            <InputBoxes
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             

                        <SignupButton
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign Up                                
                        </SignupButton>

                    </form>

                    <p>
                        <LoginLink to="/login">Already have an account?</LoginLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
    )
}

export default Signup