import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import getAccount from "./getAccount.js";
import deposit from "./deposit.js";

const authenticate = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1].replace(';', '');
  jwt.verify(token, SECRET, (err, userName) => {

    if (err) {

      res.sendStatus(403);
      return;
    }

    req.userName = userName;
    next();

  })

}

const PORT = 5000;
export const SECRET = "iu1sdfhnfvxl576nhbiofhdx367sdfjoixfvhn2252xuy";
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

export const users = [{
  username: 'chris',
  password: '123',
  email: 'christoffer@christoffergylin.com',
  firstName: 'Christoffer',
  lastName: 'Gylin',
  id: 0
}];
export const accounts = [{ id: 0, userId: 0, balance: 1000, transactions: [] }];
let userIdCount = 1;
let accountIdCount = 1;

app.post("/users", (req, res) => {
  const user = req.body.user;
  user.id = userIdCount++;

  users.push(user);

  const account = {
    id: accountIdCount++,
    userId: user.id,
    balance: 0,
    transactions: [],
  };

  deposit(account, req.body.initialDeposit, true);

  accounts.push(account);
  console.log("users:", users);
  console.log("accounts:", accounts);
  const token = jwt.sign(user.username, SECRET);
  res.json({ token, firstName: user.firstName, lastName: user.lastName, });

});

app.post("/sessions", (req, res) => {
  const user = req.body;
  const dbUser = users.find(
    (userElement) => userElement.username === user.username
  );

  if (dbUser.password === user.password) {
    const token = jwt.sign(dbUser.username, SECRET);
    res.json({ token, firstName: dbUser.firstName, lastName: dbUser.lastName });
  } else {
    res.send("error");
  }
});

app.get("/me/accounts", authenticate, (req, res) => {


  const account = getAccount(req.userName);

  if (account) {

    res.send(account);

  } else {

    res.sendStatus(500);

  }

});

app.get("/me/auth", authenticate, (req, res) => {

  const user = users.find((userElement) => userElement.username === req.userName);

  if (user) {

    res.json({ firstName: user.firstName, lastName: user.lastName, });

  } else {

    res.sendStatus(500);

  }

});

app.post('/me/deposits', authenticate, (req, res) => {

  const account = getAccount(req.userName);

  if (account) {

    deposit(account, req.body.amount);
    console.log(account);
    res.send({ balance: account.balance });

  } else {

    res.sendStatus(500);

  }


})

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
