import { useState , useEffect } from "react";
import { Transaction } from "../core/types";
import TransactionForm from "../core/TransactionForm";
import TransactionList from "../core/TransactionList"
import axios from "axios";
import toast from "react-hot-toast";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AllTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const res:any = await axios.get(`${baseUrl}/api/transactions/`);
    setTransactions(res.data.data);
  };

  const addOrUpdate = async (tx: Transaction) => {
    if (tx._id) {
      const res:any = await axios.put(`${baseUrl}/api/transactions/update`, tx);
      if(res.status == 200) toast.success("Transaction Updated")
      else toast.error("Fail to update")
    } else {
        const res:any = await axios.post(`${baseUrl}/api/transactions/` , tx);
        if(res.status == 200) toast.success("Entry Created")
        else toast.error("Transaction Not created")
    }
    fetchTransactions();
  };

  const handleDelete = async (id: string) => {
    const res:any =  await axios.delete(`${baseUrl}/api/transactions/delete/${id}`);
    if(res.status == 200) toast.success("Transaction Deleted")
    else toast.error("Transaction not deleted")
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return(
     <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold ">ADD NEW TRANSACTIONS</h1>
        <TransactionForm onSubmit={addOrUpdate} editing={editing} clearEdit={() => setEditing(null)} />
        <TransactionList transactions={transactions} onEdit={setEditing} onDelete={handleDelete}  description={"All Transactions"} editDeleteButton={true} />
    </div>
  )
}