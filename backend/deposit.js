const deposit = (account, amount, initial) => {

    account.balance += parseInt(amount);

    let note;

    if (initial) {

        note = 'Initial Deposit';

    } else if (amount > 0) {

        note = 'Deposited';

    } else {

        note = 'Withdrawn';

    }

    const log = {
        time: Date.now(),
        note,
        amount,
        balance: account.balance

    };

    account.transactions.unshift(log);

}

export default deposit;