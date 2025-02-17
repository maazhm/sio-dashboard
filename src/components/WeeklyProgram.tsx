
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import StudentCounter from "./StudentCounter";
import ExpenseCard from "./ExpenseCard";
import { Calendar, Mic, BookOpen, Users, DollarSign, BarChart, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "./ui/use-toast";

interface DailyProgram {
  id: number;
  date: string;
  topic: string;
  speaker: string;
  studentCount: number;
  expenses: { id: number; item: string; amount: number }[];
  isExpanded: boolean;
}

const WeeklyProgram = () => {
  const [programs, setPrograms] = useState<DailyProgram[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newSpeaker, setNewSpeaker] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const students = programs.reduce((sum, program) => sum + program.studentCount, 0);
    const expenses = programs.reduce((sum, program) => 
      sum + program.expenses.reduce((expSum, exp) => expSum + exp.amount, 0), 0
    );
    setTotalStudents(students);
    setTotalExpenses(expenses);
  }, [programs]);

  const addProgram = () => {
    if (newDate && newTopic && newSpeaker) {
      setPrograms([
        ...programs,
        {
          id: Date.now(),
          date: newDate,
          topic: newTopic,
          speaker: newSpeaker,
          studentCount: 0,
          expenses: [],
          isExpanded: false,
        },
      ]);
      setNewDate("");
      setNewTopic("");
      setNewSpeaker("");
      toast({
        title: "Program Added",
        description: "New program has been successfully created.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  const toggleExpand = (id: number) => {
    setPrograms(programs.map(program => 
      program.id === id 
        ? { ...program, isExpanded: !program.isExpanded }
        : program
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-up">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-sage-600" />
            <h3 className="text-lg font-medium text-gray-800">Overall Analysis</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-sage-600" />
                <p className="text-sm text-gray-600">Total Programs</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{programs.length}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-sage-600" />
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{totalStudents}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-sage-600" />
                <p className="text-sm text-gray-600">Total Expenses</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-up">
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-800">Add New Program</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-sage-600" />
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="Select date"
              />
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-sage-600" />
              <Input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter topic"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-sage-600" />
              <Input
                type="text"
                value={newSpeaker}
                onChange={(e) => setNewSpeaker(e.target.value)}
                placeholder="Enter speaker name"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={addProgram}
              className="px-4 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
            >
              Add Program
            </button>
          </div>
        </CardContent>
      </Card>

      {programs.map((program) => (
        <Card key={program.id} className="animate-fade-up">
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleExpand(program.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {new Date(program.date).toLocaleDateString()}
                </h3>
                <span className="text-gray-600">|</span>
                <p className="text-gray-600">{program.topic}</p>
                <span className="text-gray-600">|</span>
                <p className="text-gray-600">{program.speaker}</p>
              </div>
              {program.isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sage-600" />
                <span className="text-sm text-gray-600">
                  Students: {program.studentCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-sage-600" />
                <span className="text-sm text-gray-600">
                  Total: ${program.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardHeader>
          {program.isExpanded && (
            <CardContent className="space-y-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Topic</p>
                  <p className="font-medium text-gray-900">{program.topic}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Speaker</p>
                  <p className="font-medium text-gray-900">{program.speaker}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StudentCounter 
                  programId={program.id}
                  initialCount={program.studentCount}
                  onUpdate={(count) => {
                    setPrograms(programs.map(p => 
                      p.id === program.id ? { ...p, studentCount: count } : p
                    ));
                  }}
                />
                <ExpenseCard 
                  programId={program.id}
                  expenses={program.expenses}
                  onUpdate={(expenses) => {
                    setPrograms(programs.map(p => 
                      p.id === program.id ? { ...p, expenses } : p
                    ));
                  }}
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {programs.length === 0 && (
        <Card className="animate-fade-up">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-800">No Programs Added Yet</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Add a program to start tracking details and analysis.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeeklyProgram;
