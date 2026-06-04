"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [payee, setPayee] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
const [paymentMethod, setPaymentMethod] = useState("Cash");
const [searchTerm, setSearchTerm] = useState("");
const [category, setCategory] = useState("Food");
const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [expenses, setExpenses] = useState<
  {
    date: string;
    payee: string;
    description: string;
    amount: number;
    paymentMethod: string;
    category: string;
  }[]
>([]);
useEffect(() => {
  const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses) {
    setExpenses(JSON.parse(savedExpenses));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );
}, [expenses]);


  const addExpense = () => {
    if (!payee || !description || !amount) {
      alert("Please fill all fields");
      return;
    }

   const newExpense = {
  date,
  payee,
  description,
  amount: Number(amount),
  paymentMethod,
  category,
};

    if (editingIndex !== null) {
  const updatedExpenses = [...expenses];
  updatedExpenses[editingIndex] = newExpense;
  setExpenses(updatedExpenses);
  setEditingIndex(null);
} else {
  setExpenses([...expenses, newExpense]);
}

    setPayee("");
    setDescription("");
    setAmount("");
    setDate("");
setPaymentMethod("Cash");
setCategory("Food");
  };
   const deleteExpense = (indexToDelete: number) => {
  const updatedExpenses = expenses.filter(
    (_, index) => index !== indexToDelete
  );

  setExpenses(updatedExpenses);
};
const editExpense = (index: number) => {
  const expense = expenses[index];

  setDate(expense.date);
  setPayee(expense.payee);
  setDescription(expense.description);
  setAmount(expense.amount.toString());
  setPaymentMethod(expense.paymentMethod);
  setCategory(expense.category);

  setEditingIndex(index);
};
  const filteredExpenses = expenses.filter((expense) =>
  expense.payee
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map((expense) => expense.amount))
    : 0;

const averageExpense =
  expenses.length > 0
    ? (totalExpenses / expenses.length).toFixed(2)
    : 0;
    const chartData = expenses.map((expense) => ({
  name: expense.payee,
  amount: expense.amount,
}));

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        💸 Smart Expense Tracker
      </h1>

      {/* Total Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-purple-600 p-6 rounded-xl">
    <h2 className="text-sm font-semibold">
      Total Expenses
    </h2>

    <p className="text-3xl font-bold mt-2">
      ₹ {totalExpenses}
    </p>
  </div>

  <div className="bg-blue-600 p-6 rounded-xl">
    <h2 className="text-sm font-semibold">
      Transactions
    </h2>

    <p className="text-3xl font-bold mt-2">
      {expenses.length}
    </p>
  </div>

  <div className="bg-green-600 p-6 rounded-xl">
    <h2 className="text-sm font-semibold">
      Highest Expense
    </h2>

    <p className="text-3xl font-bold mt-2">
      ₹ {highestExpense}
    </p>
  </div>

  <div className="bg-orange-600 p-6 rounded-xl">
    <h2 className="text-sm font-semibold">
      Average Expense
    </h2>

    <p className="text-3xl font-bold mt-2">
      ₹ {averageExpense}
    </p>
  </div>

</div>

      {/* Form */}
      <div className="bg-slate-800 p-6 rounded-xl max-w-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Add Expense
          
        </h2>

        <div className="space-y-4">

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full p-3 rounded bg-slate-700"
  />

  <input
    type="text"
    placeholder="Payee"
    value={payee}
    onChange={(e) => setPayee(e.target.value)}
    className="w-full p-3 rounded bg-slate-700"
  />

  <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full p-3 rounded bg-slate-700"
  />

  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="w-full p-3 rounded bg-slate-700"
  />
  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-3 rounded bg-slate-700"
>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Bills</option>
  <option>Entertainment</option>
  <option>Health</option>
  <option>Education</option>
</select>
  <select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
  className="w-full p-3 rounded bg-slate-700"
>
  <option>Cash</option>
  <option>UPI</option>
  <option>Google Pay</option>
  <option>PhonePe</option>
  <option>Debit Card</option>
  <option>Credit Card</option>
</select>
          <button
            onClick={addExpense}
            className="bg-blue-600 px-6 py-3 rounded font-semibold hover:bg-blue-700"
          >
            {editingIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Expense History
        </h2>
        <input
  type="text"
  placeholder="🔍 Search Payee"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-4 p-3 rounded bg-slate-700"
/>

        <div className="overflow-x-auto">
  <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left p-2">Date</th>
<th className="text-left p-2">Payee</th>
<th className="text-left p-2">Category</th>
<th className="text-left p-2">Description</th>
<th className="text-left p-2">Amount</th>
<th className="text-left p-2">Payment</th>
<th className="text-left p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map ((expense, index) =>  (
              <tr key={index}>
                <td className="p-2">{expense.date}</td>
<td className="p-2">{expense.payee}</td>
<td className="p-2">{expense.category}</td>
<td className="p-2">{expense.description}</td>
<td className="p-2">₹ {expense.amount}</td>
<td className="p-2">{expense.paymentMethod}</td>

  <td className="p-2 flex gap-2">
  <button
    onClick={() => editExpense(index)}
    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
  >
    Edit
  </button>

  <button
    onClick={() => deleteExpense(index)}
    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
  >
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-800 rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Expense Analytics
  </h2>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="amount"
          fill="#7c3aed"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
    <footer className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-400">
  <p>
    Built by Gagan Jain using Next.js, TypeScript, Tailwind CSS,
    Recharts & Local Storage
  </p>

  <p className="mt-2 text-sm">
    © 2026 Smart Expense Tracker
  </p>
</footer>
    </main>
  );
}