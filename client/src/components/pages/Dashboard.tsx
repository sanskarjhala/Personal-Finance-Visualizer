import { useState, useEffect } from "react";
import { Transaction } from "../core/types";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // For Pie Chart
import { Button } from "@/components/ui/button";
import TransactionList from "../core/TransactionList";
import { Link } from "react-router-dom";
import MonthlyExpensesChart from "../core/MonthlyExpenseChart";


export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const response: any = await axios.get(`${baseUrl}/api/transactions`);
      const fetchedTransactions = response.data.data;

      if (!Array.isArray(fetchedTransactions)) {
        throw new Error("Expected an array of transactions");
      }

      // Calculate total expenses
      setTotalExpenses(fetchedTransactions.reduce((acc: number, tx: Transaction) => acc + tx.amount, 0));

      // Sort transactions and get the latest 5
      const sorted = [...fetchedTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setLatestTransactions(sorted.slice(0, 5)); // Get the 5 most recent transactions

      // Category Breakdown for Pie Chart
      const categoryBreakdown: { [key: string]: number } = {};
      fetchedTransactions.forEach((tx) => {
        categoryBreakdown[tx.category] = (categoryBreakdown[tx.category] || 0) + tx.amount;
      });

      setCategoryData(
        Object.entries(categoryBreakdown).map(([name, value]) => ({
          name,
          value,
        }))
      );

      // Set all transactions
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl text-center font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="flex flex-col mb-6 ">
        {/* Total Expenses Card */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Most Recent Transactions */}
        <Card className="shadow-md my-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold"></h3>
            <TransactionList transactions={latestTransactions} onEdit={() => {}} onDelete={() => {}} limit={5} description="" editDeleteButton={false}/>
          </CardContent>
        </Card>

        {/* All Transactions Button */}
      <div className="mx-auto my-4 ">
        <Link to={"/all-transactions"}>
        <Button className="p-4">
          View All Transactions
        </Button>
        </Link>
      </div>

         {/* Monthly expense Chart */}
         <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Most Recent Transactions</h3>
             <MonthlyExpensesChart transactions={transactions} />
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart Card */}
        <Card className="shadow-md my-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Category Breakdown</h3>
            <div className="flex items-center justify-center h-80 w-full">
              <PieChart width={400} height={400}>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 60%)`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </CardContent>
        </Card>

       
      </div>

      
    </div>
  );
}
