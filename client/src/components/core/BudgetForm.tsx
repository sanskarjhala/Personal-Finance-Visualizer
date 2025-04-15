import { useForm } from "react-hook-form";
import { Budget } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { categories } from "./types";

interface BudgetFormProps {
  onSubmit: (data: Budget) => void;
}

export const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Budget>({
    defaultValues: {
      category: "",
      amount: 0,
      month: new Date().toISOString().slice(0, 7), // YYYY-MM
    },
  });

  const handleFormSubmit = (data: Budget) => {
    console.log("BUDGET FORM DATA  " ,   data)
    onSubmit(data);
    reset(); // clear the form after submit
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Month Picker */}
      <div>
        <Label htmlFor="month">Month</Label>
        <Input type="month" {...register("month", { required: true })} />
        {errors.month && <p className="text-sm text-red-500">Month is required</p>}
      </div>

      {/* Category Dropdown */}
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          {...register("category", { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-500">Category is required</p>
        )}
      </div>

      {/* Amount Input */}
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          {...register("amount", { required: true,valueAsNumber: true, min: 0 })}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">Enter a valid amount</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Save Budget
      </Button>
    </form>
  );
};
