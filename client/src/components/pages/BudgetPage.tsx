import { useState, useEffect } from "react";
import { Budget, Transaction } from "../core/types";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BudgetForm } from "../core/BudgetForm";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [month, setMonth] = useState<string>(() =>
    new Date().toISOString().slice(0, 7)
  );

  const fetchBudgets = async () => {
    const res: any = await axios.get(`${baseUrl}/api/budget?month=` + month);
    console.log("Budget fetched", res.data.budgets);
    setBudgets(res.data.budgets);
  };

  const fetchTransactions = async () => {
    const res: any = await axios.get(
      `${baseUrl}/api/transactions?month=` + month
    );
    console.log("Transactions fetched");
    setTransactions(res.data.data);
  };

  const generateInsights = () => {
    if (!Array.isArray(budgets)) return;
    const data: any[] = [];
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((tx) => {
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + tx.amount;
    });

    const newInsights: string[] = [];

    budgets.forEach((b) => {
      const actual = categoryTotals[b.category] || 0;
      if (actual > b.amount) {
        newInsights.push(
          `You overspent ₹${actual - b.amount} in ${b.category}.`
        );
      } else {
        newInsights.push(`You're within the budget for ${b.category}.`);
      }

      data.push({
        category: b.category,
        budget: b.amount,
        actual,
      });
    });

    setInsights(newInsights);
    setComparisonData(data);
  };

  const handleBudgetSubmit = async (data: Budget) => {
    await axios.post(`${baseUrl}/api/budget/create-budget`, data);
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, [month]);

  useEffect(() => {
    generateInsights();
  }, [budgets, transactions]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Budgeting</h1>

      {/* Month Picker */}
      <div className="mb-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Trigger Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Set Budget
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Monthly Category Budget</DialogTitle>
          </DialogHeader>
          <BudgetForm onSubmit={handleBudgetSubmit} />
        </DialogContent>
      </Dialog>

      {/* Comparison Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Budget vs Actual Comparison</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" />
                <Bar dataKey="actual" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4">Spending Insights</h2>
          <ul className="list-disc pl-4">
            {insights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
