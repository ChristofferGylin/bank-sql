import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import getCookie from "./getCookie";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [name, setName] = useState({ firstName: '', lastName: '' })
  const navigate = useNavigate();

  const authorize = async (token) => {

    const response = await fetch('http://localhost:5000/me/auth', {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });



    if (response.ok) {
      console.log(response)
      const data = await response.json();
      console.log(data);
      setName({ firstName: data.firstName, lastName: data.lastName, });
      setIsLoggedIn(true);
      navigate('/home');

    } else {

      console.log("error");
    }
  };

  useEffect(() => {

    const cookie = getCookie('gylin-bank-jwt');

    if (cookie) {

      authorize(cookie);

    }

  }, [])

  return (
    <div className="App flex flex-col justify-between w-5/6 max-w-[1024px] mx-auto bg-pink-50 text-pink-900 h-full min-h-screen  shadow-lg shadow-pink-950/20">
      <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setResetTrigger={setResetTrigger} name={name} setName={setName} />
      <div className="flex justify-center items-center pb-8 w-full h-full">
        <Outlet context={{ setIsLoggedIn, resetTrigger, setResetTrigger, name, setName }} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
