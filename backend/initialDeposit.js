import { connection } from "./server.js";

const initialDeposit = (id, amount) => {

    amount = parseInt(amount);

    let note = 'Initial Deposit';

    connection.query('SELECT id, balance FROM accounts WHERE user_id = ?', [id], (err, results) => {

        if (err) {

            console.log(err);

        } else {

            const newBalance = results[0].balance + amount;

            connection.query('UPDATE accounts SET balance = ? WHERE id = ?', [newBalance, results[0].id], (err) => {

                if (err) {

                    console.log(err);

                } else {

                    connection.query('INSERT INTO transactions (account_id, amount, balance, note) VALUES (?, ?, ?, ?)', [results[0].id, amount, newBalance, note], (err, results) => {

                        if (err) {

                            console.log(err);

                        }
                    })
                }
            })
        }
    })
}

export default initialDeposit;