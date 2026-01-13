import { Link } from "react-router-dom";
import styled from 'styled-components';

const SignupButton = styled(Link)`
    background-color: #DAD7CD;
    color: #344E41;
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
        background-color: #344E41;
        color: #DAD7CD;
        border: 1px solid;
        border-color: #344E41;
    }

    &:active {
        background-color: #344E41;
        color: #DAD7CD;
        border: 1px solid;
        border-color: #344E41;
    }
`;

const LoginLink = styled(Link)`
    color: #A3B18A;
`;


const Home = () => {
  return (
    <div>
      <h1>Peas In Pods</h1>
      <SignupButton to="/signup">Sign Up</SignupButton>
      <br />
      <LoginLink to="/login">Already have an account?</LoginLink>
    </div>
  );
};

export default Home;
