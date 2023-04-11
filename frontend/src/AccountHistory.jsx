import { useEffect, useState } from "react";
import getAccount from "./getAccount";

const AccountHistory = () => {

    const [account, setAccount] = useState(null);

    useEffect(() => {
        getAccount((acc) => setAccount(acc))
    }, [])

    if (!account) {

        return <div></div>

    }

    return (

        <div className="w-full m-4">
            <ul className="flex flex-col border  bg-white shadow-lg rounded p-4 w-full">
                <li className="grid grid-cols-4 gap-0 border-b border-pink-100 bg-pink-100 font-semibold" key={`AccountHistoryTitles`}>
                    <div className="flex justify-start items-center p-2 col-span-1 border-r border-pink-200 h-full">Time</div>
                    <div className="flex justify-start items-center p-2 col-span-1 border-r border-pink-200 h-full">Note</div>
                    <div className="flex justify-end items-center p-2 border-r border-pink-200 h-full">Amount</div>
                    <div className="flex justify-end items-center p-2 border-r border-pink-200 h-full">Account Balance</div>
                </li>
                {account.transactions.map((transaction, index) => {

                    const date = new Date(transaction.time);

                    return (

                        <li className="grid grid-cols-4 gap-0 odd:bg-pink-50" key={`transaction${index}`}>
                            <div className="flex justify-start items-center p-2 col-span-1 border-r border-pink-200 h-full">{date.toLocaleString()}</div>
                            <div className="flex justify-start items-center p-2 col-span-1 border-r border-pink-200 h-full">{transaction.note}</div>
                            <div className="flex justify-end items-center p-2 border-r border-pink-200 h-full">{transaction.amount}</div>
                            <div className="flex justify-end items-center p-2 border-r border-pink-200 h-full">{transaction.balance}</div>
                        </li>

                    )
                })}
            </ul>
        </div>

    )

}

export default AccountHistory;