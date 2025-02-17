
import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { toast } from "./ui/use-toast";

interface StudentCounterProps {
  programId: number;
  initialCount: number;
  onUpdate: (count: number) => void;
}

const StudentCounter = ({ programId, initialCount, onUpdate }: StudentCounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const updateCount = (newCount: number) => {
    if (newCount >= 0) {
      setCount(newCount);
      onUpdate(newCount);
      toast({
        title: "Updated Student Count",
        description: `Student count is now ${newCount}`,
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Student Count</h3>
        <Users className="text-sage-600 w-5 h-5" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-semibold text-gray-900">{count}</span>
        <div className="space-x-2">
          <button
            onClick={() => updateCount(Math.max(0, count - 1))}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            -
          </button>
          <button
            onClick={() => updateCount(count + 1)}
            className="px-3 py-1 text-sm bg-sage-500 text-white hover:bg-sage-600 rounded-md transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCounter;
