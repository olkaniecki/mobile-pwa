import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const LoginButton = styled.button`
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

const SignUpLink = styled(Link)`
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

const LoginLabels = styled.label`
    display: block;
    text-align: left;
`;


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    return(
        <>
            <main >        
                <section>
                    <div>                                            
                        <h1> Log In </h1>                     

                        <form>                                              
                            <div>
                                <LoginLabels htmlFor="email-address">
                                    Email
                                </LoginLabels>
                                <InputBoxes
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <LoginLabels htmlFor="password">
                                    Password
                                </LoginLabels>
                                <InputBoxes
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <LoginButton                                    
                                    onClick={onLogin}                                        
                                >      
                                    Log In                                                                  
                                </LoginButton>
                            </div>                               
                        </form>

                        <p>
                            <SignUpLink to="/signup">Don't have an account?</SignUpLink>
                        </p> 

                    </div>
                </section>
            </main>
        </>
    )
}
export default Login;
