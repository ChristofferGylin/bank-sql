import { connection } from "./server.js";

const deposit = (req, res) => {

    const amount = parseInt(req.body.amount);

    let note = '';

    if (amount < 0) {

        note = 'Withdraw';

    } else {

        note = 'Deposit';

    }

    connection.query('SELECT id, balance FROM accounts WHERE user_id = ?', [req.id], (err, results) => {

        if (err) {

            console.log(err);
            res.sendStatus(500);

        } else {

            const newBalance = results[0].balance + amount;

            connection.query('UPDATE accounts SET balance = ? WHERE id = ?', [newBalance, results[0].id], (err) => {

                if (err) {

                    console.log(err);
                    res.sendStatus(500);

                } else {

                    connection.query('INSERT INTO transactions (account_id, amount, balance, note) VALUES (?, ?, ?, ?)', [results[0].id, amount, newBalance, note], (err, results) => {

                        if (err) {

                            console.log(err);
                            res.sendStatus(500);

                        } else {

                            res.send({ balance: newBalance })

                        }
                    })
                }
            })
        }
    })
}

export default deposit;