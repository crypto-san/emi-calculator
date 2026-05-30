import React, { useState } from "react";
import axios from "axios";

function App() {
const [amount, setAmount] = useState("");
const [rate, setRate] = useState("");
const [tenure, setTenure] = useState("");
const [emi, setEmi] = useState("");
const [schedule, setSchedule] = useState([]);

const calculateEMI = async () => {
try {
const response = await axios.post(
"https://emi-calculator-g26o.onrender.com/loan/calculate",
{
amount,
rate,
tenure,
}
);


  console.log(response.data);

  setEmi(response.data.emi);
  setSchedule(response.data.schedule);
} catch (error) {
  console.log(error);
  alert("Error connecting backend");
}


};

return (
<div style={{ textAlign: "center", padding: "20px" }}> <h1>Loan EMI Calculator</h1>


  <input
    type="number"
    placeholder="Loan Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />

  <br /><br />

  <input
    type="number"
    placeholder="Interest Rate"
    value={rate}
    onChange={(e) => setRate(e.target.value)}
  />

  <br /><br />

  <input
    type="number"
    placeholder="Tenure (Months)"
    value={tenure}
    onChange={(e) => setTenure(e.target.value)}
  />

  <br /><br />

  <button onClick={calculateEMI}>
    Calculate
  </button>

  <br /><br />

  {emi && (
    <div>
      <h2>Monthly EMI: ₹ {emi}</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          margin: "auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.principal}</td>
              <td>{item.interest}</td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

);
}

export default App;
