const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Backend is running");
});

app.post("/loan/calculate", (req, res) => {
const amount = Number(req.body.amount);
const rate = Number(req.body.rate);
const tenure = Number(req.body.tenure);

if (!amount || !rate || !tenure) {
return res.status(400).json({
message: "Please enter all values",
});
}

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

```
schedule.push({
  month: i,
  principal: principal.toFixed(2),
  interest: interest.toFixed(2),
  balance: balance.toFixed(2),
});
```

}

res.json({
emi: emi.toFixed(2),
schedule,
});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
