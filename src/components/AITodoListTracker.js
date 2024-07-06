import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash2, Brain, Clock, Flag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Alert = ({ children }) => (
  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
    {children}
  </div>
);

const AITodoListTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('normal');
  const [aiSuggestion, setAiSuggestion] = useState('');

  useEffect(() => {
    const generateAiSuggestion = () => {
      const suggestions = [
        "Consider adding a high-priority task for your most important goal",
        "Don't forget to allocate time for breaks between tasks",
        "How about adding a task for personal development? Allocate at least 30 minutes",
        "Remember to include a low-priority task for relaxation",
      ];
      setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    };

    generateAiSuggestion();
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: newTaskPriority,
        timeAllotted: newTaskTime
      }]);
      setNewTask('');
      setNewTaskTime('');
      setNewTaskPriority('normal');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getCompletionData = () => {
    const completed = tasks.filter(task => task.completed).length;
    const remaining = tasks.length - completed;
    return [
      { name: 'Completed', value: completed },
      { name: 'Remaining', value: remaining },
    ];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100';
      case 'medium': return 'bg-yellow-100';
      case 'low': return 'bg-green-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Enhanced AI-Powered Todo List Tracker</h1>
      
      <div className="mb-6 space-y-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="w-full p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            placeholder="Time (e.g., 30m, 1h)"
            className="flex-1 p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="flex-1 p-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <button
          onClick={addTask}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300 flex items-center justify-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Task
        </button>
      </div>

      <Alert>
        <div className="flex items-center">
          <Brain className="h-4 w-4 mr-2" />
          <span>AI Suggestion: {aiSuggestion}</span>
        </div>
      </Alert>

      <div className="space-y-4 mb-6">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded ${
              task.completed ? 'bg-gray-100' : getPriorityColor(task.priority)
            }`}
          >
            <div className="flex items-center flex-1">
              {task.completed ? (
                <CheckCircle
                  className="text-green-500 cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                />
              ) : (
                <Circle
                  className="text-gray-500 cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                />
              )}
              <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" size={16} />
              <span className="text-sm text-gray-600">{task.timeAllotted}</span>
              <Flag className={`${
                task.priority === 'high' ? 'text-red-500' :
                task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
              }`} size={16} />
              <Trash2
                className="text-red-500 cursor-pointer"
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getCompletionData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AITodoListTracker;