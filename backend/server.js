const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/loan/calculate", (req, res) => {
    const { amount, rate, tenure } = req.body;

    const monthlyRate = rate / 12 / 100;

    const emi =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);

    let balance = amount;
    let schedule = [];

    for (let i = 1; i <= tenure; i++) {
        let interest = balance * monthlyRate;
        let principal = emi - interest;
        balance -= principal;

        schedule.push({
            month: i,
            principal: principal.toFixed(2),
            interest: interest.toFixed(2),
            balance: balance.toFixed(2),
        });
    }

    res.json({ emi: emi.toFixed(2), schedule });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});