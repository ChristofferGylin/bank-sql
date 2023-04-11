
import { users, accounts } from "./server.js";

const getAccount = (userName) => {

    const user = users.find((userElement) => userElement.username === userName);
    const account = accounts.find((acc) => acc.id === user.id);

    return account;

}

export default getAccount;