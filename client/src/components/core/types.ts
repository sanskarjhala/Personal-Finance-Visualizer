export interface Transaction {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export interface Budget {
  category: string;
  amount: number;
  month: string;
}

export const categories = [
  "Food",
  "Rent",
  "Shopping",
  "Travel",
  "Health",
  "Bills",
  "Other",
];
