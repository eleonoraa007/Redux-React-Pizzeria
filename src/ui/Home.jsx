import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

// mb-10 mt-8 => bottom and top
//or just 'my-10, 10px to the top and the bottom'

function Home() {
  const username = useSelector(state => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? <CreateUser /> : <Button to='/menu' type="primary">
        Continue ordering, {username}
      </Button> }
    </div>
  );
}

export default Home;
