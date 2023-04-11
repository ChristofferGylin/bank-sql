import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import BigButton from "./BigButton";

const CreateUser = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const initialDepositRef = useRef(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setName } = useOutletContext();

  const createUser = async () => {
    const user = {
      username: userNameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };

    const initialDeposit = parseInt(initialDepositRef.current.value);

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, initialDeposit }),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `gylin-bank-jwt=${data.token}`;
      setIsLoggedIn(true);
      setName({
        firstName: data.firstName,
        lastName: data.lastName,
      })
      navigate('/home');
    } else {
      console.log("error");
    }
  };

  return (
    <div className="w-5/6 my-6">
      <div className="flex flex-col border  bg-white shadow-lg rounded-lg gap-3 p-4 w-full">
        <h1 className="text-5xl mb-4">New Account</h1>
        <input
          placeholder="First Name"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="text"
          ref={firstNameRef}
        />
        <input
          placeholder="Last Name"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="text"
          ref={lastNameRef}
        />
        <input
          placeholder="Email"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="text"
          ref={emailRef}
        />
        <input
          placeholder="User Name"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="text"
          ref={userNameRef}
        />
        <input
          placeholder="Password"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="password"
          ref={passwordRef}
        />
        <input
          placeholder="Initial Deposit"
          className="w-full border border-pink-500 rounded-lg px-2 py-1"
          type="text"
          ref={initialDepositRef}
          defaultValue={0}
        />
        <div className="flex gap-3">
          <BigButton title="Register" callback={createUser}></BigButton>
          <BigButton title="Cancel" link="/"></BigButton>

        </div>
      </div>
    </div>
  );
};

export default CreateUser;
