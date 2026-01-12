import { Link } from "react-router-dom";
import styled from 'styled-components';

const SignupButton = styled(Link)`
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
    margin-bottom: 15px;

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


const Home = () => {
  return (
    <div>
      <h1>Project Title</h1>
      <SignupButton to="/signup">Sign Up</SignupButton>
      <br />
      <LoginLink to="/login">Already have an account?</LoginLink>
    </div>
  );
};

export default Home;
