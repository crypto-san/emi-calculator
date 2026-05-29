import React, { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = async () => {
    const res = await axios.post("https://emi-calculator-g26o.onrender.com", {
      amount,
      rate,
      tenure,
    });

    setEmi(res.data.emi);
    setSchedule(res.data.schedule);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Loan EMI Calculator</h1>

      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <br /><br />

      <input placeholder="Rate" onChange={(e) => setRate(e.target.value)} />
      <br /><br />

      <input placeholder="Tenure" onChange={(e) => setTenure(e.target.value)} />
      <br /><br />

      <button onClick={calculateEMI}>Calculate</button>

      {emi && <h2>EMI: ₹{emi}</h2>}

      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.principal}</td>
              <td>{row.interest}</td>
              <td>{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;