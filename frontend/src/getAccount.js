import getCookie from "./getCookie";

const getAccount = async (callback) => {

    const token = getCookie('gylin-bank-jwt');

    const response = await fetch('http://localhost:5000/me/accounts', {
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
        const data = await response.json()

        callback(data);

    }

}

export default getAccount;