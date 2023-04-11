import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Button from "./Button";
import { FaUserCircle } from 'react-icons/fa';

const Menu = ({ isLoggedIn, setIsLoggedIn, setResetTrigger, name, setName }) => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const logIn = async () => {
    const user = {
      username: userNameRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await fetch("http://localhost:5000/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `gylin-bank-jwt=${data.token}`;
      setName({ firstName: data.firstName, lastName: data.lastName, });
      setIsLoggedIn(true);
      navigate('/home');

    } else {
      console.log("error");
    }
  };

  const logOut = () => {
    document.cookie = "gylin-bank-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate('/');
  };

  let menuItems;

  if (isLoggedIn) {
    menuItems = (

      <div className="flex flex-col justify-between items-end h-full">
        <div className="flex items-center gap-1">
          {name.firstName} {name.lastName} <FaUserCircle className="text-lg" />
        </div>
        <div className="flex gap-5 text-md font-semibold items-end">
          <Link className="hover:underline" to="/home">
            Home
          </Link>
          <Link className="hover:underline" to="/account">
            Account History
          </Link>
          <Link className="hover:underline" to="/deposit" onClick={() => setResetTrigger(trigger => trigger + 1)}>
            Deposit
          </Link>
          <Link className="hover:underline" to="/withdraw" onClick={() => setResetTrigger(trigger => trigger + 1)}>
            Withdraw
          </Link>
          <button className="hover:underline" onClick={() => { logOut(setIsLoggedIn) }}>Log out</button>
        </div>
      </div>
    );
  } else {
    menuItems = (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <input
            placeholder="User Name"
            className="w-full border border-pink-500 rounded-lg px-2 py-1 text-pink-800"
            type="text"
            ref={userNameRef}
          />
          <input
            placeholder="Password"
            className="w-full border border-pink-500 rounded-lg px-2 py-1 text-pink-800"
            type="password"
            ref={passwordRef}
          />
        </div>
        <ul className="grid grid-cols-2 gap-2 font-semibold">
          <Button title="Log in" callback={logIn} />
          <Button title="New account" link="/register" />
        </ul>
      </div>
    );
  }

  return (
    <header className="flex justify-between items-center w-full h-36 bg-pink-400 text-pink-100 p-4">
      <Link to="/">
        <h1 className="text-6xl drop-shadow-xl">Piggy Bank</h1>
      </Link>

      {menuItems}
    </header>
  );
};

export default Menu;
