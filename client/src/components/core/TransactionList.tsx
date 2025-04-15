import { Transaction } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
  limit?: number;
  description: string;
  editDeleteButton: boolean;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  limit,
  description,
  editDeleteButton,
}: Props) {
  let sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  sorted = sorted.slice(0, limit);
  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold mb-4">{description}</h2>
      {transactions.length != 0 ? 
      sorted.map((tx) => (
        <Card key={tx._id} className="shadow-md border border-gray-200">
          <CardContent className="flex justify-between items-center p-4">
            {/* Left section: Description and Date */}
            <div className="flex flex-col">
              <p className="font-medium text-lg">{tx.description}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(tx.date).toLocaleDateString()}
              </p>
            </div>

            {/* Right section: Amount, Category, and Action Buttons */}
            <div className="flex flex-col items-end gap-2">
              <p className="font-bold text-green-600">₹{tx.amount}</p>

              {/* Category Label */}
              <span className="text-sm text-gray-600 font-semibold">
                {tx.category}
              </span>

              {/* Edit and Delete buttons */}
              {editDeleteButton ? (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        onEdit(tx)
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => tx._id && onDelete(tx._id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </CardContent>
        </Card>
      )) 
      : 
      <div>
        <h2 className="text-lg font-semibold mb-4">"No transactions</h2>
      </div>
    
    }
    </div>
  );
}
