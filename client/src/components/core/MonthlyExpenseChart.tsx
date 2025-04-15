import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from './types';

interface Props {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: Props) {
  const monthlyTotals: Record<string, number> = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const label = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    monthlyTotals[label] = (monthlyTotals[label] || 0) + tx.amount;
  });

  const data = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
