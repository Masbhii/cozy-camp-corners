
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  tasksCompleted: number;
  tasksTotal: number;
  messagesCount: number;
  status: 'on-track' | 'at-risk' | 'behind';
}

const ProjectCard = ({
  id,
  name,
  description,
  dueDate,
  tasksCompleted,
  tasksTotal,
  messagesCount,
  status,
}: ProjectCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
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
    switch (status) {
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
    switch (status) {
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
    <Link to={`/project/${id}`} className="card-paper p-5 block">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-neutral-gray">{name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor()}`}
        >
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </span>
      </div>
      
      <p className="text-sm text-neutral-gray/80 mt-2 line-clamp-2">{description}</p>
      
      <div className="mt-4 pt-4 border-t border-cool-gray/20 flex justify-between items-center">
        <div className="flex items-center text-xs text-neutral-gray gap-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-primary-purple" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} className="text-primary-purple" />
            <span>{messagesCount}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-purple"
              style={{ width: `${(tasksCompleted / tasksTotal) * 100}%` }}
            />
          </div>
          <span className="text-xs text-neutral-gray">{tasksCompleted}/{tasksTotal}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
