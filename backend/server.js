import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import deposit from "./deposit.js";
import mysql from 'mysql';
import initialDeposit from "./initialDeposit.js";

const authenticate = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1].replace(';', '');
  jwt.verify(token, SECRET, (err, id) => {

    if (err) {

      res.sendStatus(403);
      return;
    }

    req.id = id;
    next();

  })

}

const PORT = 5000;
export const SECRET = "iu1sdfhnfvxl576nhbiofhdx367sdfjoixfvhn2252xuy";
const dbLogin = 'root';
const dbPassword = '';
const app = express();

export const connection = mysql.createConnection({
  host: 'localhost',
  user: dbLogin,
  password: dbPassword,
  database: 'piggydb'
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/users", (req, res) => {
  const { username, password, email, firstname, lastname } = req.body.user;

  connection.query('INSERT INTO users (username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)',
    [username, password, email, firstname, lastname], (err, results) => {

      if (err) {

        console.log(err);
        res.sendStatus(500);
      } else {

        const userId = results.insertId;

        connection.query('INSERT INTO accounts (user_id) VALUES (?)',
          [userId], (err, results) => {

            if (err) {

              console.log(err);
              res.sendStatus(500);

            } else {

              const token = jwt.sign(userId, SECRET);
              res.json({ token, firstName: firstname, lastName: lastname, });
              initialDeposit(userId, req.body.amount)
            }

          })
      }
    })
});

app.post("/sessions", (req, res) => {
  const user = req.body;

  connection.query('SELECT password, id, firstname, lastname FROM users WHERE username = ?', [user.username], (err, results) => {

    if (err) {

      console.log(err);
      res.sendStatus(500);

    } else {

      const dbUser = results[0];

      if (dbUser) {

        if (dbUser.password === user.password) {
          const token = jwt.sign(dbUser.id, SECRET);
          res.json({ token, firstName: dbUser.firstname, lastName: dbUser.lastname });
        } else {
          res.sendStatus(403);
        }

      } else {

        res.sendStatus(403);

      }
    }
  })
});

app.get("/me/accounts", authenticate, (req, res) => {

  connection.query('SELECT id FROM accounts WHERE user_id = ?', [req.id], (err, results) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {

      connection.query('SELECT * from transactions WHERE account_id = ?', [results[0].id], (err, results) => {

        if (err) {

          console.log(err);
          res.sendStatus(500);

        } else {

          const sorted = results.sort((a, b) => {

            if (a.created < b.created) {

              return 1;

            } else if (a.created > b.created) {

              return -1;

            } else {

              return 0;

            }

          });

          res.send({ transactions: sorted })

        }
      })
    }
  })
});

app.get("/me/balance", authenticate, (req, res) => {

  connection.query('SELECT balance FROM accounts WHERE user_id = ?', [req.id], (err, results) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {

      res.json({ balance: results[0].balance });

    }

  })

});

app.get("/me/auth", authenticate, (req, res) => {

  connection.query('SELECT id, firstname, lastname FROM users WHERE id = ?', [req.id], (err, results) => {

    if (err) {

      console.log(err);
      res.sendStatus(500);

    } else {

      res.json({ firstName: results[0].firstname, lastName: results[0].lastname, });

    }
  })
});

app.post('/me/deposits', authenticate, (req, res) => {

  deposit(req, res);

})

connection.connect((err) => {
  if (err) {

    console.log(err);

  } else {

    console.log('db connected');
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  }
})


