
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Settings, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import AddButton from '@/components/AddButton';
import TaskList, { Task } from '@/components/TaskList';
import MessageBoard, { Message } from '@/components/MessageBoard';
import FileStorage, { FileItem } from '@/components/FileStorage';
import TeamMembers, { TeamMember } from '@/components/TeamMembers';

const Project = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, this would be fetched from an API
  const [project] = useState({
    id: id || '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with a modern look and improved UX.',
    dueDate: 'Oct 15, 2025',
    status: 'on-track' as const,
  });

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Create wireframes', isCompleted: true, dueDate: 'Sep 20', assignee: 'Emily' },
    { id: '2', title: 'Design homepage', isCompleted: false, dueDate: 'Sep 30', assignee: 'James' },
    { id: '3', title: 'Implement responsive navigation', isCompleted: false, dueDate: 'Oct 5', assignee: 'Alex' },
    { id: '4', title: 'Content migration', isCompleted: false, dueDate: 'Oct 10', assignee: 'Sarah' },
  ]);

  const messages: Message[] = [
    {
      id: '1',
      author: 'Emily Thompson',
      avatar: 'ET',
      content: 'I\'ve finished the wireframes. Can everyone review them and provide feedback?',
      timestamp: 'Yesterday at 10:23 AM',
      replies: 3,
    },
    {
      id: '2',
      author: 'James Wilson',
      avatar: 'JW',
      content: 'The client wants to add a testimonials section. Where should we place it on the homepage?',
      timestamp: 'Today at 9:45 AM',
    },
  ];

  const files: FileItem[] = [
    {
      id: '1',
      name: 'Wireframes.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadedBy: 'Emily',
      uploadDate: 'Sep 18',
    },
    {
      id: '2',
      name: 'Homepage_Draft.png',
      type: 'image',
      size: '4.1 MB',
      uploadedBy: 'James',
      uploadDate: 'Sep 25',
    },
    {
      id: '3',
      name: 'Content_Inventory.xlsx',
      type: 'other',
      size: '1.2 MB',
      uploadedBy: 'Sarah',
      uploadDate: 'Sep 27',
    },
  ];

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Emily Thompson', initials: 'ET', role: 'Project Manager', email: 'emily@example.com' },
    { id: '2', name: 'James Wilson', initials: 'JW', role: 'Designer', email: 'james@example.com' },
    { id: '3', name: 'Alex Rodriguez', initials: 'AR', role: 'Developer', email: 'alex@example.com' },
    { id: '4', name: 'Sarah Johnson', initials: 'SJ', role: 'Content Writer', email: 'sarah@example.com' },
  ];

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  const getStatusIcon = () => {
    switch (project.status) {
      case 'on-track':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'at-risk':
        return <AlertCircle size={16} className="text-amber-500" />;
      case 'behind':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  const getStatusText = () => {
    switch (project.status) {
      case 'on-track':
        return 'On Track';
      case 'at-risk':
        return 'At Risk';
      case 'behind':
        return 'Behind';
      default:
        return 'On Track';
    }
  };

  const getStatusColor = () => {
    switch (project.status) {
      case 'on-track':
        return 'bg-green-100 text-green-700';
      case 'at-risk':
        return 'bg-amber-100 text-amber-700';
      case 'behind':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-neutral-gray hover:text-primary-purple transition-colors mb-4">
          <ChevronLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-neutral-gray">{project.name}</h1>
            <p className="text-neutral-gray/80 mt-1">{project.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor()}`}
            >
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </span>

            <div className="flex items-center gap-1 text-sm text-neutral-gray">
              <Calendar size={16} className="text-primary-purple" />
              <span>Due {project.dueDate}</span>
            </div>

            <button
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-neutral-gray"
              aria-label="Project settings"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <AddButton onClick={() => console.log('Add task clicked')} label="Add Task" />
          <AddButton onClick={() => console.log('Add message clicked')} label="Add Message" />
          <AddButton onClick={() => console.log('Add file clicked')} label="Add File" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
        <MessageBoard messages={messages} />
        <FileStorage files={files} />
        <TeamMembers members={teamMembers} />
      </div>
    </div>
  );
};

export default Project;
