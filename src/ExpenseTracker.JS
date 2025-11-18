import React, { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Expense");
  const [total, setTotal] = useState(0);

  // 🧠 Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) setExpenses(savedExpenses);
  }, []);

  // 💾 Save data to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    const totalAmount = expenses.reduce(
      (acc, curr) => (curr.type === "Income" ? acc + curr.amount : acc - curr.amount),
      0
    );
    setTotal(totalAmount);
  }, [expenses]);

  const addExpense = () => {
    if (!amount || !desc) return alert("Please fill all fields!");
    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      desc,
      type,
    };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDesc("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">💰 Expense Tracker</h1>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description..."
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount..."
            className="border rounded-lg p-2"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <button
            onClick={addExpense}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Add Entry
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-6 text-center">
          Total Balance:{" "}
          <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
            ₹{total}
          </span>
        </h2>

        <ul className="mt-4 max-h-60 overflow-y-auto">
          {expenses.map((e) => (
            <li
              key={e.id}
              className={`flex justify-between items-center border-b p-2 ${
                e.type === "Income" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>
                {e.desc} — ₹{e.amount}
              </span>
              <button
                onClick={() => deleteExpense(e.id)}
                className="text-gray-500 hover:text-black"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
