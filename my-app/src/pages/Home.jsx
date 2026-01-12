import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/signup">Sign up</Link>
      <br />
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default Home;
