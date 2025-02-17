
import { useState } from "react";
import { PlusCircle, DollarSign, Trash2 } from "lucide-react";
import { toast } from "./ui/use-toast";

interface Expense {
  id: number;
  item: string;
  amount: number;
}

interface ExpenseCardProps {
  programId: number;
  expenses: Expense[];
  onUpdate: (expenses: Expense[]) => void;
}

const ExpenseCard = ({ programId, expenses, onUpdate }: ExpenseCardProps) => {
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const addExpense = () => {
    if (newItem && newAmount && parseFloat(newAmount) > 0) {
      const updatedExpenses = [
        ...expenses,
        {
          id: Date.now(),
          item: newItem,
          amount: parseFloat(newAmount),
        },
      ];
      onUpdate(updatedExpenses);
      setNewItem("");
      setNewAmount("");
      toast({
        title: "Expense Added",
        description: `Added ${newItem} with amount $${parseFloat(newAmount).toFixed(2)}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter valid item name and amount",
        variant: "destructive",
      });
    }
  };

  const removeExpense = (id: number) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    onUpdate(updatedExpenses);
    toast({
      title: "Expense Removed",
      description: "The expense has been removed successfully.",
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Expenses</h3>
        <DollarSign className="text-sage-600 w-5 h-5" />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Item name"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Amount"
            min="0"
            step="0.01"
            className="w-24 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
          <button
            onClick={addExpense}
            className="p-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-60 overflow-auto">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
          >
            <span className="text-gray-700 break-words flex-1 mr-2">{expense.item}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 whitespace-nowrap">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => removeExpense(expense.id)}
                className="p-1 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCard;
