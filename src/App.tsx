
import React from 'react';
import WeeklyProgram from './components/WeeklyProgram';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Program Manager</h1>
        <WeeklyProgram />
      </div>
    </div>
  );
}

export default App;
