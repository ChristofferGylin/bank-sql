import BigButton from "./BigButton";
import getAccount from "./getAccount";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const UserHome = () => {

    const { name } = useOutletContext();
    const [message, setMessage] = useState(`Welcome ${name.firstName}, what do you wish to do today?`)
    const navigate = useNavigate();
    const { setIsLoggedIn } = useOutletContext();


    useEffect(() => {

        setMessage(`Welcome ${name.firstName}, what do you wish to do today?`);

    }, [name])

    const quickBalance = () => {

        getAccount((account) => {
            setMessage(`You have $${account.balance} in your account`)
        })

    }

    const logOut = () => {
        document.cookie = "gylin-bank-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        navigate('/');
    };

    return (

        <div className="flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-3xl">{message}</h2>

            <div className="flex flex-col border  bg-white shadow-lg rounded-lg gap-3 p-4 w-5/6 my-6">


                <BigButton title="Quick Balance Check" callback={quickBalance} />
                <BigButton title="Account History" link='/account' />
                <BigButton title="Deposit" link='/deposit' />
                <BigButton title="Withdraw" link='/withdraw' />
                <BigButton title="Log Out" callback={logOut} />

            </div>

        </div>

    )

}

export default UserHome;