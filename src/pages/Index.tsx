
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProjectCard, { ProjectCardProps } from '@/components/ProjectCard';
import AddButton from '@/components/AddButton';
import { Search, Plus } from 'lucide-react';

const Index = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website with a modern look and improved UX.',
      dueDate: 'Oct 15, 2025',
      tasksCompleted: 3,
      tasksTotal: 12,
      messagesCount: 8,
      status: 'on-track',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Create a native mobile app for both iOS and Android platforms.',
      dueDate: 'Nov 20, 2025',
      tasksCompleted: 2,
      tasksTotal: 15,
      messagesCount: 5,
      status: 'at-risk',
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Plan and execute Q4 marketing campaign across digital channels.',
      dueDate: 'Dec 5, 2025',
      tasksCompleted: 0,
      tasksTotal: 10,
      messagesCount: 2,
      status: 'behind',
    },
    {
      id: '4',
      name: 'Product Launch',
      description: 'Coordinate the launch of the new product line including PR and events.',
      dueDate: 'Jan 10, 2025',
      tasksCompleted: 5,
      tasksTotal: 20,
      messagesCount: 12,
      status: 'on-track',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = searchQuery
    ? projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;

  const handleAddProject = () => {
    console.log('Add project clicked');
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-gray">Dashboard</h1>
          <AddButton onClick={handleAddProject} label="Add Project" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-gray/60" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="input-field w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
          
          <button 
            onClick={handleAddProject}
            className="border-2 border-dashed border-cool-gray/30 rounded-lg flex flex-col items-center justify-center p-5 text-neutral-gray/70 hover:bg-white hover:border-primary-purple/40 transition-colors min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-soft-gray flex items-center justify-center mb-2">
              <Plus size={24} className="text-primary-purple" />
            </div>
            <span className="font-medium">Add New Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
