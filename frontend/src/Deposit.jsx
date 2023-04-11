import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import getCookie from "./getCookie";

const Deposit = () => {

    const [done, setDone] = useState(false);
    const [message, setMessage] = useState('');
    const amountRef = useRef(null);
    const navigate = useNavigate();
    const { resetTrigger } = useOutletContext();

    const reset = () => {

        setDone(false);
        setMessage('')

    }

    useEffect(() => {
        reset();
    }, [resetTrigger])

    const deposit = async () => {

        let amount = parseInt(amountRef.current.value);

        if (amount < 0) amount = -amount;

        const token = getCookie('gylin-bank-jwt');

        const response = await fetch('http://localhost:5000/me/deposits', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ amount }),
        });



        if (response.ok) {

            const data = await response.json();
            setDone(true);
            setMessage(`Your new account ballance is $${data.balance}`);

        } else {

            console.log("error");
        }
    };

    useEffect(() => {
        if (!done) return
        const redirect = setTimeout(() => {
            reset();
            navigate('/home');
        }, 5000);
        return () => clearTimeout(redirect);
    }, [message])



    return (

        <div className="flex flex-col justify-center items-center w-full h-full">

            {done && <h2 className="text-3xl">{message}</h2>}
            {!done &&
                <div className="flex flex-col border  bg-white shadow-lg rounded-lg gap-3 p-4 w-5/6 my-6">
                    <h2 className="text-3xl">Deposit</h2>
                    <label htmlFor="amountInput">Amount</label>
                    <input
                        placeholder="0"
                        className="w-full border border-pink-500 rounded-lg px-2 py-1"
                        id='amountInput'
                        name='amountInput'
                        type="number"
                        ref={amountRef}
                    />
                    <Button title="Deposit" callback={deposit} />
                    <Button title="Cancel" callback={() => {
                        reset();
                        navigate('/home');
                    }} />

                </div>
            }
        </div>
    )

}

export default Deposit;