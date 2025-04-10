
import { useState } from 'react';
import { Check, Clock, X } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate?: string;
  assignee?: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (id: string) => void;
}

const TaskList = ({ tasks, onTaskToggle }: TaskListProps) => {
  const [newTask, setNewTask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call a function passed as a prop to add the task
    console.log("Adding task:", newTask);
    setNewTask('');
    setIsAdding(false);
  };

  const cancelAdd = () => {
    setNewTask('');
    setIsAdding(false);
  };

  return (
    <div className="card-paper p-5">
      <h3 className="font-semibold text-lg text-neutral-gray mb-4">Tasks</h3>
      
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              task.isCompleted 
                ? 'border-cool-gray/20 bg-gray-50' 
                : 'border-cool-gray/30 bg-white'
            }`}
          >
            <button
              onClick={() => onTaskToggle(task.id)}
              className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                task.isCompleted
                  ? 'bg-primary-purple text-white'
                  : 'border border-cool-gray/40 hover:bg-gray-100'
              }`}
              aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.isCompleted && <Check size={14} />}
            </button>
            
            <span 
              className={`flex-grow text-sm ${
                task.isCompleted ? 'text-neutral-gray/60 line-through' : 'text-neutral-gray'
              }`}
            >
              {task.title}
            </span>
            
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-neutral-gray/70">
                <Clock size={12} className="text-primary-purple" />
                {task.dueDate}
              </span>
            )}
            
            {task.assignee && (
              <div className="w-6 h-6 rounded-full bg-light-purple flex items-center justify-center">
                <span className="text-xs font-medium text-secondary-purple">
                  {task.assignee.substring(0, 1)}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {isAdding ? (
        <form onSubmit={handleAddTask} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="input-field flex-grow"
              autoFocus
            />
            <button 
              type="submit"
              className="btn-primary"
              aria-label="Save task"
            >
              <Check size={18} />
            </button>
            <button 
              type="button"
              onClick={cancelAdd}
              className="btn-secondary"
              aria-label="Cancel adding task"
            >
              <X size={18} />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 w-full py-2 px-3 text-sm border border-dashed border-cool-gray/40 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors"
        >
          + Add a new task
        </button>
      )}
    </div>
  );
};

export default TaskList;
