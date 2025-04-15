import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "./types";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "./types";

interface Props {
  onSubmit: (tx: Transaction) => void;
  editing?: Transaction | null;
  clearEdit?: () => void;

}

export default function TransactionForm({ onSubmit, editing, clearEdit }: Props) {
  const { register, handleSubmit, reset,setValue, formState: { errors },watch  } = useForm<Transaction>();

  useEffect(() => {
    if (editing) {
      const formattedDate = editing.date
        ? new Date(editing.date).toISOString().split("T")[0]
        : "";
  
      reset({
        ...editing,
        date: formattedDate, 
      });
    }
  }, [editing]);

  const submit = (data: Transaction) => {
    onSubmit({ ...data, _id: editing?._id });
    reset();
    clearEdit?.();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-3">
      <Input {...register("amount", { required: true, valueAsNumber: true })} placeholder="Amount (₹)" type="number" />
      {errors.amount && <p className="text-sm text-red-500">Amount is required</p>}

      <Input {...register("date", { required: true })} type="date" />
      {errors.date && <p className="text-sm text-red-500">Date is required</p>}

      <Input {...register("description", { required: true })} placeholder="Description" />
      {errors.description && <p className="text-sm text-red-500">Description is required</p>}

      {/* Category Dropdown */}
      <div>
        <Select
          value={watch("category")}
          onValueChange={(val) => setValue("category", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-500">Category is required</p>}
      </div>


      <div className="flex gap-2">
        <Button type="submit">{editing ? "Update" : "Add"} Transaction</Button>
        {editing && <Button variant="outline" type="button" onClick={clearEdit}>Cancel</Button>}
      </div>
    </form>
  );
}
